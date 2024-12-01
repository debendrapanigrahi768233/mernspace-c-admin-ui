import { Button, Card, Col, List, Row, Skeleton, Space, Statistic, Tag, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { userAuthStore } from "../store"
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;
import { BarChartIcon } from '../components/icons/BarChart';
import BasketIcon from '../components/icons/BasketIcon';
import { ComponentType } from 'react';

const list = [
  {
      OrderSummary: 'Peperoni, Margarita ...',
      address: 'Bandra, Mumbai',
      amount: 1200,
      status: 'preparing',
      loading: false,
  },
  {
      OrderSummary: 'Paneer, Chicken BBQ ...',
      address: 'Balurghat, West bengal',
      amount: 2000,
      status: 'on the way',
      loading: false,
  },
  {
      OrderSummary: 'Paneer, Chicken BBQ ...',
      address: 'Balurghat, West bengal',
      amount: 2000,
      status: 'on the way',
      loading: false,
  },
  {
      OrderSummary: 'Paneer, Chicken BBQ ...',
      address: 'Balurghat, West bengal',
      amount: 2000,
      status: 'on the way',
      loading: false,
  },
  {
      OrderSummary: 'Paneer, Chicken BBQ ...',
      address: 'Balurghat, West bengal',
      amount: 2000,
      status: 'on the way',
      loading: false,
  },
  {
      OrderSummary: 'Paneer, Chicken BBQ ...',
      address: 'Balurghat, West bengal',
      amount: 2000,
      status: 'on the way',
      loading: false,
  },
];

interface CardTitleProps {
  title: string;
  PrefixIcon: ComponentType<unknown>;
}

const CardTitle = ({ title, PrefixIcon }: CardTitleProps) => {
  return (
      <Space>
          <Icon component={PrefixIcon} />
          {title}
      </Space>
  );
};

function Homepage() {
  const {user} = userAuthStore()
  return (
    <div>
            <Title level={4}>Welcome, {user?.firstName} 😀</Title>
            <Row className="mt-4" gutter={16}>
                <Col span={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic title="Total orders" value={52} />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                    title="Total sale"
                                    value={70000}
                                    precision={2}
                                    prefix="₹"
                                />
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title={<CardTitle title="Sales" PrefixIcon={BarChartIcon} />}
                                bordered={false}></Card>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Card
                        bordered={false}
                        title={<CardTitle title="Recent orders" PrefixIcon={BasketIcon} />}>
                        <List
                            className="demo-loadmore-list"
                            loading={false}
                            itemLayout="horizontal"
                            loadMore={true}
                            dataSource={list}
                            renderItem={(item) => (
                              <List.Item>
                                  <Skeleton avatar title={false} loading={item.loading} active>
                                      <List.Item.Meta
                                          title={
                                              <a href="https://ant.design">{item.OrderSummary}</a>
                                          }
                                          description={item.address}
                                      />
                                      <Row style={{ flex: 1 }} justify="space-between">
                                          <Col>
                                              <Text strong>₹{item.amount}</Text>
                                          </Col>
                                          <Col>
                                              <Tag color="volcano">{item.status}</Tag>
                                          </Col>
                                      </Row>
                                  </Skeleton>
                              </List.Item>
                          )}
                        />
                        <div style={{ marginTop: 20 }}>
                            <Button type="link">
                                <Link to="/orders">See all orders</Link>
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    
  )
}

export default Homepage





// import { Flex } from 'antd';
// <div style={{ width: '100%', height: '100%' }}>
//         <Title level={4}>
//           Good Morning!
//           <br />
//           {user?.firstName} 🙂
//         </Title>
//         <Flex
//           gap="middle"
//           flex="auto"
//           align="start"
//           justify="center"
//           style={{ width: '100%', height: '100%' }}
//         >
//           <Flex style={{ width: '100%' }}>
//             <Flex
//               gap="middle"
//               flex="auto"
//               align="center"
//               justify="center"
//               vertical
//               style={{ width: '100%' }}
//             >
//               <Flex
//                 gap="middle"
//                 flex="auto"
//                 align="center"
//                 justify="center"
//                 style={{ width: '100%' }}
//               >
//                 <Card size="small" style={{ flex: 1 }}>
//                   <p>Total Orders</p>
//                   <Title level={4}>52</Title>
//                 </Card>
//                 <Card size="small" style={{ flex: 1 }}>
//                   <p>Total Sales</p>
//                   <Title level={4}>$700000</Title>
//                 </Card>
//               </Flex>
//               <Card size="small" title="Sales" style={{ width: '100%' }}>
//                 <p>Figure</p>
//               </Card>
//             </Flex>
//           </Flex>
//           <Flex style={{ width: '100%' }}>
//             <Card size="small" title="Recent orders" style={{ flex: 1, height:"30rem" }}>
//               <p>Total Orders</p>
//             </Card>
//           </Flex>
//         </Flex>
//       </div>