import { Typography, Form, Input, InputNumber } from "antd";
import { Create, DateField, useForm } from "@refinedev/antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";

const { Title } = Typography;
const { TextArea } = Input;

export default function NotesCreate() {
  const { formProps, saveButtonProps, formLoading } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
            label="Title"
            name="title"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Content"
            name="content"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <TextArea rows={4} />
        </Form.Item>
        <Form.Item
            label="Created By"
            name="created_by"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Created At"
            name="created_at"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Input/>
        </Form.Item>
      </Form>
    </Create>
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
