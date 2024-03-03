import React from "react";
import { List, ShowButton, EditButton, useTable, DeleteButton, Create, CreateButton } from "@refinedev/antd";
import { Card, Col, Row, Space, Statistic, Table } from "antd";
import { BaseRecord } from "@refinedev/core";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ProjectList() {
  const { tableProps } = useTable();

  return (
    <>
    <Card>
    <List>
    <Table {...tableProps} rowKey="id">
      
      <Table.Column dataIndex="projects" title="Title" />
      <Table.Column dataIndex="content" title="Content" />
      <Table.Column dataIndex="completion_status" title="Progress" />
      <Table.Column dataIndex="full_name" title="On task" />
      <Table.Column
        title="Actions"
        dataIndex="actions"
        render={(_, record: BaseRecord) => (
          <Space>
            <ShowButton hideText size="small" recordItemId={record.id} />
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
  