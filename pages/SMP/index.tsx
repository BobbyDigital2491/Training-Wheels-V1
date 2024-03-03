import React from "react";
import { List, ShowButton, EditButton, useTable, DeleteButton } from "@refinedev/antd";
import { Card, Space, Table } from "antd";
import { BaseRecord } from "@refinedev/core";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SMPList() {
  const { tableProps } = useTable();

  return (
    <Card>
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="no" title="No" />
        <Table.Column dataIndex="work_element" title="Work Element" />
        <Table.Column dataIndex="plan_no" title="Plan_No" />
        <Table.Column dataIndex="element_time" title="Element Time" />
        <Table.Column dataIndex="mv" title="MV[%]" />
        <Table.Column dataIndex="mod" title="Mod" />
        <Table.Column dataIndex="model_type" title="Model Type" />
        <Table.Column dataIndex="st" title="ST" />
        <Table.Column dataIndex="code" title="Code" />
        <Table.Column dataIndex="symbol" title="Symbol" />
        <Table.Column dataIndex="vp" title="VP" />
        <Table.Column dataIndex="tps" title="TPS" />
        <Table.Column dataIndex="jes" title="JES" />
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
  