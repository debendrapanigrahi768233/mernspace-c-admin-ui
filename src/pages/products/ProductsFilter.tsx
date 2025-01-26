import { useQuery } from '@tanstack/react-query'
import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from 'antd'
import React from 'react'
import { getCategories, getTenants } from '../../http/api'
import { Category, Tenant } from '../../types'

type ProductsFilterProp = {
    children : React.ReactNode,
    // onFilterChange : (filterName : string, filterValue : string)=>void
  }

const ProductsFilter = ({children}: ProductsFilterProp) => {

    const {data: restaurants} = useQuery({
        queryKey: ['restaurants'],
        queryFn: ()=>{
            return getTenants(`perPage=100&currentPage=1`).then((res) => res.data);
        },
        initialData: []
    })

    const {data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: ()=>{
            return getCategories().then((res) => res.data);
        }
    })

    console.log({restaurants, categories})

  return (
    <Card>
      <Row justify={"space-between"} align={"middle"}>
        <Col span={16}>
          <Row justify={"start"} gutter={20} align={"middle"}>
            <Col span={6} >
              <Form.Item name='q' style={{ marginBottom: 0 }}>
                <Input.Search style={{width: '100%'}} allowClear={true} placeholder="search" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='categoryId' style={{ marginBottom: 0 }}>
                <Select style={{width: '100%'}} allowClear={true} placeholder="Select Category" >
                    {
                        categories && categories?.map((category : Category)=>{
                            return <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>
                        })
                    }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='tenantId' style={{ marginBottom: 0 }}>
                <Select style={{width: '100%'}} allowClear={true} placeholder="Select Restaurant" >
                    {
                        restaurants && restaurants?.map((restaurant : Tenant)=>{
                            return <Select.Option key={restaurant?.id} value={restaurant?.id}>{restaurant?.name}</Select.Option>
                        })
                    }
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
                <Space>
                    <Form.Item name='isPublish' style={{ marginBottom: 0 }}>
                        <Switch defaultChecked={false} onChange={()=>{}}/>
                    </Form.Item>
                    <Typography.Text>Show only publish</Typography.Text>
                </Space>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{display:'flex', justifyContent:'end'}}>
          {children}
          
        </Col>
      </Row>
    </Card>
  )
}

export default ProductsFilter