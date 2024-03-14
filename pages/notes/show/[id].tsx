import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { DateField, ImageField, Show, TextField } from "@refinedev/antd";
import { Card, Col, Divider, Row, Space, Typography } from "antd";
import { useShow } from "@refinedev/core";


const { Title } = Typography;

export default function NotesShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Card>
      <Title level={1}>{record?.title ?? ""}</Title>
      <Divider/>
      <TextField value={record?.content} />
      <br/><br/><br/><br/>
      <Row gutter={16}>
      <Col span={6} offset={18}>
      <Title level={5}>Created At:&nbsp;<DateField
          value={record?.created_at}
          title="Created At"
        /> <Title level={5}>Created By:&nbsp;<ImageField
        value={record?.avatar_url}
        title="Created By"
        width={75}
        />
        </Title>
        </Title>
        </Col>
        </Row>
        
      </Card>
    </Show>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const { authenticated, redirectTo } = await authProvider.check(context);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!authenticated) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `${redirectTo}?to=${encodeURIComponent("/notes")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
