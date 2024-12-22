import { useQuery } from "@tanstack/react-query";
import { Card, Col, Form, Input, Row, Select, Space } from "antd"
import { getTenants } from "../../../http/api";
import { Tenant } from "../../../types";

const UserForm = () => {
  const {
      data: tenants,
  } = useQuery({
      queryKey: ['tenants'],
      queryFn: () => {
          return getTenants().then((res) => res.data);
      },
  });


  return (
    <Row>
      <Col span={24}>
        <Space style={{width:'100%'}} direction="vertical" size={"large"}>
          <Card title="User data">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="First Name" name="firstName" rules={[
                  {
                    required: true,
                    message: 'First name is required'
                  }
                ]}>
                  <Input placeholder="first name"size="middle"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="LastName" rules={[
                  {
                    required: true,
                    message: 'Last name is required'
                  }
                ]}>
                  <Input placeholder="last name"size="middle"/>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Email" name="email" rules={[
                  {
                    required: true,
                    message: 'Email is required'
                  },
                  {
                    type: "email",
                    message: 'email is not valid'
                  }
                ]}>
                  <Input placeholder="email" size="middle"/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Security Info">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Password" name="password" rules={[
                  {
                    required: true,
                    message: 'Password is required'
                  }
                ]}>
                  <Input type="password" placeholder="Enter password" size="middle"/>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Auth Info">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Role" name="role"  rules={[
                  {
                    required: true,
                    message: 'Role is required'
                  }
                ]}>
                  <Select size="middle" style={{width: '100%'}} allowClear={true} placeholder="Select role">
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="manager">Manager</Select.Option>
                    <Select.Option value="customer">Customer</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Restaurant" name="tenantId"  rules={[
                  {
                    required: true,
                    message: 'Restaurant is required'
                  }
                ]}>
                  <Select size="middle" style={{width: '100%'}} allowClear={true} placeholder="Select restaurant">
                    {
                      tenants?.map((tenant:Tenant)=>(
                        <Select.Option value="tenant.id">{tenant.name}</Select.Option>
                      ))
                    }
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Space>
      </Col>
    </Row>
  )
}

export default UserForm