import React, { useState, useEffect } from "react";
import { Typography, Form, Input, Select, Avatar, DatePicker, Upload } from "antd";
import { Create, useForm } from "@refinedev/antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";
import { PostgrestError, PostgrestResponse } from "@supabase/supabase-js";
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";

const { Title } = Typography;
const { TextArea } = Input;

interface Profile {
  id: number;
  avatar_url: string;
  full_name: string;
}

const NotesCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();
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

  const normalizeFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleUpload = async (file: RcFile | string, imageName: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file as Blob);
      formData.append('name', imageName);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data);
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps} >
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
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Image Name"
          name="image_name" // Update field name to "name"
          rules={[
            {
              required: true,
              message: 'Please input the image name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image">
          <Form.Item
            name="image"
            valuePropName="fileList"
            normalize={normalizeFile}
            noStyle
          >
            <Upload.Dragger
              name="file"
              listType="picture"
              multiple
              customRequest={async ({ file, onError, onSuccess }) => {
                try {
                  const rcFile = file as RcFile;
                  await supabaseClient.storage
                    .from("images")
                    .upload(`public/${rcFile.name}`, file, {
                      cacheControl: "3600",
                      upsert: true,
                    });

                  const { data } = await supabaseClient.storage
                    .from("images")
                    .getPublicUrl(`public/${rcFile.name}`);

                  const xhr = new XMLHttpRequest();
                  onSuccess?.({ url: data?.publicUrl }, xhr);
                } catch (error) {
                  onError?.(new Error("Upload Error"));
                }
              }}
            >
              <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Accepted file types: JPG, PNG, MP4.
      </p>
            </Upload.Dragger>
          </Form.Item>
          </Form.Item>
        <br/>
        <Form.Item
          label="Name"
          name="avatar_url"
          rules={[
            {
              required: true,
              message: 'Please select a user!',
            },
          ]}
        >
          <Select showSearch placeholder="Select a user">
            {profiles.map((profile) => (
              <Select.Option key={profile.id} value={profile.avatar_url}>
                <Avatar shape="circle" src={profile.avatar_url} icon={<UserOutlined />} />&nbsp;
                <Typography.Text>{profile.full_name}</Typography.Text>
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
          <DatePicker showTime/>
        </Form.Item>
      </Form>
    </Create>
  );
};

export default NotesCreate;

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
