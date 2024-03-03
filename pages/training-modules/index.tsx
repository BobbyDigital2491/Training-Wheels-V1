import React from "react";
import { List, ShowButton, EditButton, useTable, DeleteButton } from "@refinedev/antd";
import { Card, Divider, Space, Table, Typography } from "antd";
import { BaseRecord } from "@refinedev/core";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TrainingModal from "@components/TrainingModal";

export default function TrainingList() {
  const { tableProps } = useTable();
  const { Title, Paragraph, Text, Link } = Typography;
  
  return (
    <Card>
      <Title level={3} >Training Modules</Title>
      <Divider/>
      <TrainingModal/>
      
    
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
          destination: `${redirectTo}?to=${encodeURIComponent("/Training-Modules")}`,
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
  