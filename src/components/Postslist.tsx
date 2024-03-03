// components/PostsList.tsx

import React from 'react';
import { EditButton, ShowButton, DeleteButton, useTable } from '@refinedev/antd';
import { BaseRecord } from '@refinedev/core';
import { Table, Space, List } from 'antd';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { authProvider } from 'src/authProvider';

const PostsList: React.FC = () => {
  const { tableProps } = useTable({
    resource: 'posts', // Specify the Supabase table name
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          title="Production Lines"
          dataIndex="production-lines"
          key="production-lines"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
        <Table.Column title="Sort" dataIndex="sort" key="sort" />
        <Table.Column title="BR" dataIndex="title" key="title" />
        <Table.Column title="AA" dataIndex="aa" key="aa" />
        <Table.Column title="Plan no." dataIndex="planNo" key="planNo" />
        <Table.Column title="PEM From" dataIndex="pemFrom" key="pemFrom" />
        <Table.Column title="Name (DE)" dataIndex="nameDE" key="nameDE" />
        <Table.Column title="Name (EN)" dataIndex="nameEN" key="nameEN" />
      </Table>
    </List>
  );
};

export default PostsList;
