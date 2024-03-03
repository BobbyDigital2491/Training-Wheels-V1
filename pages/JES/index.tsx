import React from "react";
import { List, ShowButton, EditButton, useTable, DeleteButton } from "@refinedev/antd";
import { Card, Space, Table } from "antd";
import { BaseRecord } from "@refinedev/core";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function JESList() {
  const { tableProps } = useTable();

  return (
    <Card>
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="no" title="No" />
        <Table.Column dataIndex="major_step" title="Major Step(What)" />
        <Table.Column dataIndex="key_point" title="Key Point(How)" />
        <Table.Column dataIndex="reason" title="Reason(Why)" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
    </Card>
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
          destination: `${redirectTo}?to=${encodeURIComponent("/JES)")}`,
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
  