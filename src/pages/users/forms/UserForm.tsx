import { Card, Col, Form, Input, Row } from "antd"

const UserForm = () => {
  return (
    <Row>
      <Col span={24}>
        <Card title="User data">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="First Name" name="firstName">
                <Input placeholder="first name"/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name" name="LastName">
                <Input placeholder="last name"/>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default UserForm