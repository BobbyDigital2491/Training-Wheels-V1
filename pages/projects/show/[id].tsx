import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { DateField, ImageField, Show, TextField } from "@refinedev/antd";
import { Card, Divider, Space, Typography } from "antd";
import { useShow } from "@refinedev/core";


const { Title } = Typography;

export default function ProjectsShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Card>
      <Title level={5}>Title</Title>
      <TextField value={record?.projects ?? ""} />
      <Divider/>
      <Title level={5}>Content</Title>
      <TextField value={record?.content} />
      <Divider/>
      <Title level={5}>Created By</Title>
      <ImageField
          value={record?.avatar_url}
          title="Created By"
          width={150}
          />
          <br/>
      <TextField value={record?.created_by} />
      <Divider/>
      <Title level={5}>Created At</Title>
      <DateField
          value={record?.created_at}
          title="Created At"
        />
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
        destination: `${redirectTo}?to=${encodeURIComponent("/projects")}`,
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
