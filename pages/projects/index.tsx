import React from "react";
import { List, ShowButton, EditButton, useTable, DeleteButton, DateField } from "@refinedev/antd";
import { Avatar, Card, Space, Table } from "antd";
import { BaseRecord } from "@refinedev/core";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserOutlined } from "@ant-design/icons";

export default function ProjectList() {
  const { tableProps } = useTable();

  return (
    <>
    <Card>
    <List>
    <Table {...tableProps} rowKey="id">
    <Table.Column dataIndex="image" title="Icon"
         render={(avatarUrl) => (
          <Avatar shape="square" src={avatarUrl} size={50} icon={<UserOutlined />} />
        )} /> 
      <Table.Column dataIndex="projects" title="Project" />
      <Table.Column dataIndex="content" title="Details"  />
      <Table.Column dataIndex="avatar_url" title="Created By"
         render={(avatarUrl) => (
          <Avatar shape="circle" src={avatarUrl} size={50} icon={<UserOutlined />} />
        )} /> 
      <Table.Column
          dataIndex="created_at"
          title="Created At"
          render={(value) => (
            <DateField value={value} />
          )}
        />
      <Table.Column
        title="Actions"
        dataIndex="actions"
        render={(_, record: BaseRecord) => (
          <Space>
            <ShowButton hideText size="small" resource="projects" recordItemId={record.id} />
            <EditButton hideText size="small" recordItemId={record.id} />
            <DeleteButton hideText size="small" recordItemId={record.id} />
          </Space>
        )} />
    </Table>
    </List>
    </Card>
      </>
  );
};

/**
 * Same check can also be done via `<Authenticated />` component.
 * But we're using a server-side check for a better UX.
 */
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
  