import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { Typography, Form, Input, Select, Avatar } from "antd";
import { Edit, useForm } from "@refinedev/antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { supabaseClient } from "src/utility";
import { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";

interface Profile {
  id: number;
  avatar_url: string;
  full_name: string;
  created_by: string;
}

const NotesEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const { data, error }: PostgrestResponse<Profile[]> = await supabaseClient.from("profiles").select("*");
        if (error) {
          throw new Error((error as PostgrestError).message);
        }
        if (Array.isArray(data) && data.length > 0) {
          const flattenedData: Profile[] = data.flat();
          setProfiles(flattenedData);
        } else {
          throw new Error("Data is not in the expected format");
        }
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching profiles:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input title!',
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
              message: 'Please input content!',
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Created By"
          name="created_by"
          rules={[
            {
              required: true,
              message: 'Please select a user!',
            },
          ]}
        >
          <Select showSearch placeholder="Select a user">
            {profiles.map((profile) => (
              <Select.Option key={profile.id} value={profile.created_by}>
                <Avatar shape="circle" src={profile.avatar_url} icon={<UserOutlined />} />
                &nbsp;
                <span>{profile.full_name} {profile.created_by}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Created At"
          name="created_at"
          rules={[
            {
              required: true,
              message: 'Please input created at!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};

export default NotesEdit;

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
