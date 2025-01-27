import React from 'react'
import { Category } from '../../../types'
import { Card, Col, Form, InputNumber, Row, Space, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { getCategory } from '../../../http/api'

type PricingProps={
    selectedCategory:string
}

const Pricing = ({selectedCategory}:PricingProps) => {
    // const category: Category | null = selectedCategory? JSON.parse(selectedCategory) : null
    const { data: category } = useQuery<Category>({
        queryKey: ['category', selectedCategory],
        queryFn: () => {
            return getCategory(selectedCategory).then((res) => res.data);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
  return (
    <Card title={<Typography.Text>Product price</Typography.Text>} bordered={false}>
        {
            category && Object.entries(category.priceConfiguration).map(([configurationKey, configurationValue])=>{
                return <div key={configurationKey}>
                    <Space direction='vertical' size='large' style={{width: '100%'}}>
                        <Typography.Text>
                            {`${configurationKey}(${configurationValue.priceType})`}
                        </Typography.Text>
                        <Row gutter={20}>
                             {
                                configurationValue.availableOptions.map((option: string)=>{
                                    return <Col span={8} key={option}>
                                        <Form.Item label={option} name={['priceConfiguration',JSON.stringify({
                                            configurationKey:configurationKey,
                                            priceType: configurationValue.priceType
                                        }), option]}>
                                            <InputNumber addonAfter='₹'/>
                                        </Form.Item>
                                    </Col>
                                })
                             }
                        </Row>
                    </Space>
                </div>
            })
        }
    </Card>
  )
}

export default Pricing
