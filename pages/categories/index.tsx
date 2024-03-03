import React from "react";
import { List, ShowButton, EditButton, useTable, DeleteButton, Create, CreateButton } from "@refinedev/antd";
import { Avatar, Card, Input, Space, Table } from "antd";
import { BaseRecord } from "@refinedev/core";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CardGrid from "@components/CardGrid";
import D2 from "@components/D2";

export default function CategoryList() {
  const { tableProps } = useTable();

  return (
    <Card>
      <List>
    <Card >
     
    <CardGrid/>
    
    </Card>
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
          destination: `${redirectTo}?to=${encodeURIComponent("/categories")}`,
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
  