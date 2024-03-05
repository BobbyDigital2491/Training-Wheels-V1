import { AntdEditInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Typography, Form, Input, InputNumber } from "antd";
import { DateField, Edit, useForm } from "@refinedev/antd";


const { Title } = Typography;
const { TextArea } = Input;

export default function TaskEdit() {
  const { formProps, saveButtonProps, formLoading } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
          <Form.Item
              label="Task"
              name="task"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              label="Status"
              name="status"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea />
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
              <TextArea  />
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
              <Input />
          </Form.Item>
      </Form>
  </Edit>
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
        destination: `${redirectTo}?to=${encodeURIComponent("/tasks")}`,
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
