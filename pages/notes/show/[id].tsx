import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authProvider } from "src/authProvider";
import { DateField, ImageField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { Avatar, Card, Col, CountdownProps, Descriptions, Divider, Row, Space, Statistic, Typography } from "antd";
import { useShow } from "@refinedev/core";
import Comments from "@components/Comments";




const { Title } = Typography;

export default function ProjectsShow() {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const onFinish: CountdownProps['onFinish'] = () => {
  console.log('finished!');
};

const onChange: CountdownProps['onChange'] = (val) => {
  if (typeof val === 'number' && 4.95 * 1000 < val && val < 5 * 1000) {
    console.log('changed!');
  }
};

  return (
    <Show isLoading={isLoading}>
      <Card>
      <Row gutter={8}>
        <Col span={12} flex={2} >
        <Avatar src={record?.image ?? ""}
                    shape="square"
                    size={300}
                    />
        </Col>

        <Col span={12} flex={3}>
          <Typography.Title level={3}>{record?.title}</Typography.Title>
          <Typography.Title level={3}><TextField value={record?.content}/></Typography.Title>
          <Typography.Title level={3}>Created By:&nbsp;<TextField value={record?.created_by}/>&nbsp; &nbsp;
          <Avatar size={50} src={record?.avatar_url}/></Typography.Title>
          <Typography.Title level={3}>Created At:&nbsp;<DateField value={record?.created_at}/></Typography.Title>
        </Col>
        
        
       
      </Row>
      </Card>
    </Show>
  );
};

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
