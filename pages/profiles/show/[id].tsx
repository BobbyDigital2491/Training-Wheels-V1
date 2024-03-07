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
        <Title level={5}>Name:&nbsp;<TextField value={record?.full_name} /></Title>
        <Title level={5}>Role:&nbsp;<TextField value={record?.role} /></Title>
        <Title level={5}>Team:&nbsp;<TextField value={record?.team} /></Title>
        <Title level={5}>Skills:&nbsp;<TextField value={record?.skills} /></Title>
        <Title level={5}>Contact:&nbsp;<TextField value={record?.phone_number} /></Title>
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
