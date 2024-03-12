import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Typography, Form, Input, InputNumber, Upload } from "antd";
import { Edit, useForm } from "@refinedev/antd";


const { Title } = Typography;
const { TextArea } = Input;

export default function SMPEdit() {
  const { formProps, saveButtonProps, formLoading } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
          <Form.Item
              label="Number"
              name="no"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              label="Work Element"
              name="work_element"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea rows={4} />
          </Form.Item>
          <Form.Item
              label="Plan No."
              name="plan_no"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
          </Form.Item>
          <Form.Item
              label="Element Time"
              name="element_time"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
          </Form.Item>
          <Form.Item
              label="MV[%]"
              name="mv"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
          </Form.Item>
          <Form.Item
              label="Mod"
              name="mod"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
          </Form.Item>
          <Form.Item
              label="Model Type"
              name="model_type"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
          </Form.Item>
          <Form.Item
              label="ST"
              name="st"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
          </Form.Item>
          <Form.Item
              label="Code"
              name="code"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
          </Form.Item>
          <Form.Item
              label="Symbol"
              name="symbol"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
          </Form.Item>
          <Form.Item
              label="VP"
              name="vp"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
          </Form.Item>
          <Form.Item
              label="TPS"
              name="tps"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
          </Form.Item>
          <Form.Item
              label="JES"
              name="jes"
              rules={[
                  {
                      required: true,
                  },
              ]}
          >
              <TextArea  />
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
        destination: `${redirectTo}?to=${encodeURIComponent("/Standard Method & Procedure (SMP)")}`,
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
