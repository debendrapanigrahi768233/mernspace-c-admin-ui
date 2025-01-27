import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography} from 'antd'
import { Category, Tenant } from '../../../types'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getTenants } from '../../../http/api'
import Pricing from './Pricing'
import Attributes from './Attributes'
import ProductImage from './ProductImage'

const ProductForm = () => {
    const selectedCategory = Form.useWatch('categoryId')
    console.log({selectedCategory})
    const {data: categories} = useQuery({
        queryKey: ['categories'],
        queryFn: ()=>{
            return getCategories().then((res) => res.data);
        }
    })

    const {
        data: tenants,
    } = useQuery({
        queryKey: ['tenants'],
        queryFn: () => {
            return getTenants(`perPage=100&currentPage=1`).then((res) => res.data);
        },
    });
  
    console.log(categories)
  return (
    <Row>
      <Col span={24}>
        <Space style={{width:'100%'}} direction="vertical" size={"large"}>
          <Card title="User data">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Product Name" name="name" rules={[
                  {
                    required: true,
                    message: 'Product name is required'
                  }
                ]}>
                  <Input placeholder="product name"size="middle"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Category" name="categoryId" rules={[
                  {
                    required: true,
                    message: 'Category is required'
                  }
                ]}>
                  <Select id="selectBoxInUserForm" size="middle" style={{width: '100%'}} allowClear={true} placeholder="Select category">
                  {categories?.length ? (
                      categories.map((category: Category) => (
                        <Select.Option value={JSON.stringify(category)} key={category._id}>
                          {category.name}
                        </Select.Option>
                      ))
                    ) : (
                      <Select.Option disabled>No categories available</Select.Option>
                    )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="Description" name="description" rules={[
                  {
                    required: true,
                    message: 'Description is required'
                  },
                ]}>
                  <Input.TextArea rows={2} maxLength={100} style={{resize: 'none'}}></Input.TextArea>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          
          <Card title="Product Image">
            <Row gutter={24}>
              <Col span={12}>
                <ProductImage/>
              </Col>
            </Row>
          </Card>

          <Card title="Tenant info">
            <Col span={12}>
                <Form.Item label="Restaurant" name="tenantId"  rules={[
                  {
                    required: true,
                    message: 'Restaurant is required'
                  }
                ]}>
                  <Select size="middle" style={{width: '100%'}} allowClear={true} placeholder="Select restaurant" >
                    {
                      tenants?.map((tenant:Tenant)=>(
                        <Select.Option value={tenant.id} key={tenant.id}>{tenant.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </Col>
          </Card>

          {
            selectedCategory && <Pricing selectedCategory={selectedCategory}/>
          }
          {
            selectedCategory && <Attributes selectedCategory={selectedCategory}/>
          }


          <Card title="Other info">
            <Col span={6}>
                <Space>
                    <Form.Item name='isPublish' style={{ marginBottom: 0 }}>
                        <Switch defaultChecked={false} onChange={()=>{}} checkedChildren='yes' unCheckedChildren='no'/>
                    </Form.Item>
                    <Typography.Text>publish</Typography.Text>
                </Space>
            </Col>
          </Card>
        </Space>
      </Col>
    </Row>
  )
}

export default ProductForm