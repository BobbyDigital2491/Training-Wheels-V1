import React from "react";
import { useTable } from "@refinedev/antd";
import { Card, Col, Row, Space, Statistic, Table, Timeline, Calendar, Checkbox, Form, Progress, Carousel, Tooltip, Flex } from "antd";
import { authProvider } from "src/authProvider";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AimOutlined, ArrowDownOutlined, ArrowUpOutlined, DashboardOutlined, FallOutlined, LikeOutlined, Loading3QuartersOutlined, ProjectOutlined, RiseOutlined, UserOutlined } from "@ant-design/icons";
import type { Dayjs } from 'dayjs';
import TimelineItem from "antd/lib/timeline/TimelineItem";
import { useState } from "react";
import { Gauge, Line } from "@ant-design/charts";
import LineGraph from "@components/LineGraph";
import MobileGraph from "@components/MobileGraph";


export default function Dashboard() {
  const { tableProps } = useTable();

  const onPanelChange = (value: Dayjs, mode: any) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#000000',
  };

  

  return (
    <>
    {/*Top of Card*/}
    <Card title="Dashboard">
        {/*Team Card*/}
        <Card title="General">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Statistic title="Active Users" value={3} prefix={<UserOutlined />} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Statistic title="Active Projects" value={5} prefix={<AimOutlined />} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Statistic title="Pending Projects" value={20} prefix={<ProjectOutlined />} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Statistic title="Partnerships" value={112} prefix={<LikeOutlined />} />
            </Col>
          </Row>
        </Card>
        <br />
        <Card style={{ width: '100%' }}>
          <Flex>
          <MobileGraph/>
          
          </Flex>
          
        </Card>
        {/*Stat Cards*/}
        <Card title="Stats">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Statistic
                title="Completed Projects"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<RiseOutlined />}
                suffix="%" />
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Statistic
                title="Pending Projects"
                value={11.28}
                precision={2}
                valueStyle={{ color: 'red' }}
                prefix={<FallOutlined />}
                suffix="%" />
            </Col>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Statistic
                title="Sales"
                value={50}
                precision={2}
                valueStyle={{ color: 'red' }}
                prefix={<ArrowDownOutlined />}
                suffix="%" />
            </Col>


            {/*End of Stats*/}
          </Row>
        </Card>
        <br />
        {/*End of Stats*/}

        {/*Calendar Card*/}
        <Card title="Calendar">
          <Calendar onPanelChange={onPanelChange} />
        </Card>
        <br />


        {/*Timeline Card*/}
        <Card title="Timeline">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <h1>Past</h1>
              <Timeline>
                <TimelineItem>Investfest</TimelineItem>
                <TimelineItem>Magazine V1</TimelineItem>
                <TimelineItem>I-Phone App test</TimelineItem>
              </Timeline>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <h1>Upcoming</h1>
              <Timeline>
                <TimelineItem>Mercedez Meeting - Feb 15 2024</TimelineItem>
                <TimelineItem>Augmentique Meeting - Feb 14 2024</TimelineItem>
                <TimelineItem>Bell Meeting - Feb 27 2024</TimelineItem>
              </Timeline>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <h1>Next Month</h1>
              <Timeline>
                <TimelineItem>Mercedez Meeting - Feb 15 2024 4pm est</TimelineItem>
                <TimelineItem>Augmentique Meeting - Feb 15 2024 12pm est</TimelineItem>
                <TimelineItem>Bell Meeting - Feb 27 2024</TimelineItem>
                <TimelineItem>Augmentique Test Flight</TimelineItem>
              </Timeline>
            </Col>
          </Row>
        </Card>
        <br />

        {/*To Do List*/}

        <Card title="To Do List">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item name="fieldA" valuePropName="checked">
                <Checkbox name="" /> Bell Event Flyer
              </Form.Item>
              <Form.Item name="fieldA" valuePropName="checked">
                <Checkbox name="" /> V2 Magazine
              </Form.Item>
              <Form.Item name="fieldA" valuePropName="checked">
                <Checkbox name="" /> Budget Planning
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item name="fieldA" valuePropName="checked">
                <Checkbox name="" /> Augmentique Test Flight
              </Form.Item>
              <Form.Item name="fieldA" valuePropName="checked">
                <Checkbox name="" /> V2 Magazine
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={8}>
              <Form.Item name="fieldA" valuePropName="checked">
                <Checkbox name="" /> Budget Planning
              </Form.Item>
              <Form.Item name="fieldA" valuePropName="checked">
                <Checkbox name="" /> Budget Planning
              </Form.Item>
            </Col>

          </Row>
        </Card>


      </Card></>
  );
}

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
        destination: `${redirectTo}?to=${encodeURIComponent("/dashboard")}`,
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
