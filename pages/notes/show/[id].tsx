import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { MarkdownField, NumberField, Show, TextField } from "@refinedev/antd";
import { Typography } from "antd";
import { useShow } from "@refinedev/core";

const { Title } = Typography;

export default function NotesShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <TextField value={record?.title ?? ""} />
      <Title level={5}>Content</Title>
      <TextField value={record?.content} />
      <Title level={5}>Created By</Title>
      <TextField value={record?.created_by} />
      <Title level={5}>Created At</Title>
      <MarkdownField value={record?.created_at} />
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
