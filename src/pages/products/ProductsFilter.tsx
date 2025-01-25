import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from 'antd'
import React from 'react'

type ProductsFilterProp = {
    children : React.ReactNode,
    // onFilterChange : (filterName : string, filterValue : string)=>void
  }

const ProductsFilter = ({children}: ProductsFilterProp) => {
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
              <Form.Item name='category' style={{ marginBottom: 0 }}>
                <Select style={{width: '100%'}} allowClear={true} placeholder="Select Category" >
                  <Select.Option value="pizza">Pizza</Select.Option>
                  <Select.Option value="bevereges">Bevereges</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name='tenants' style={{ marginBottom: 0 }}>
                <Select style={{width: '100%'}} allowClear={true} placeholder="Select Restaurant" >
                  <Select.Option value="texmax">Tea max</Select.Option>
                  <Select.Option value="chillout">Chill Out</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
                <Space>
                    <Switch defaultChecked onChange={()=>{}}/>
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