import { Breadcrumb, Button, Flex, Form, Space } from 'antd'
import React from 'react'
import { RightOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductsFilter from './ProductsFilter';

const Products = () => {
    const [filterForm]= Form.useForm()

  return (
    <Space size={'large'} direction='vertical' style={{width: '100%'}}>
      <Flex justify='space-between'>
        <Breadcrumb separator={<RightOutlined />} items={[{ title: <Link to='/'>Dashboard</Link> }, { title: 'Products' }]} />
      </Flex>
      <Form form={filterForm} onFieldsChange={()=>{}}>
        <ProductsFilter >
          <Button type="primary" icon={<PlusOutlined />} onClick={()=>{}}>
              Add Product</Button>
        </ProductsFilter>
      </Form>
    </Space>
  )
}

export default Products