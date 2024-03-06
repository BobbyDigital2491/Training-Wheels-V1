import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { DateField, ImageField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { Card, Col, Divider, Row, Space, Typography } from "antd";
import { useShow } from "@refinedev/core";


const { Title } = Typography;

export default function ProfileShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Card>
      <Row gutter={[16, 16]}>
      <Col span={12}>
        <ImageField value={record?.avatar_url ?? ""}
                    width={200}
                    preview={false} />
        <Title level={5}>Name:<TextField value={record?.full_name} /></Title>
        <Title level={5}>Role:<TextField value={record?.role} /></Title>
        <Title level={5}>Team:<TextField value={record?.team} /></Title>
        <Title level={5}>Skills:<TextField value={record?.skills} /></Title>
        </Col>
        <Col span={12}> 
        <Title level={5}>Bio:</Title>
          <MarkdownField value={record?.info} />
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
        destination: `${redirectTo}?to=${encodeURIComponent("/profiles")}`,
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
