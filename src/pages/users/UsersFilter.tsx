import { Card, Col, Form, Input, Row, Select } from "antd";


type UsersFilterProp = {
  children : React.ReactNode,
  // onFilterChange : (filterName : string, filterValue : string)=>void
}

const UsersFilter = ({children}: UsersFilterProp) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row justify={"start"} gutter={20}>
            <Col span={8}>
              <Form.Item name='q'>
                <Input.Search style={{width: '100%'}} allowClear={true} placeholder="search" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='role'>
                <Select style={{width: '100%'}} allowClear={true} placeholder="Select role" >
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="manager">Manager</Select.Option>
                  <Select.Option value="customer">Customer</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={8} >
              <Select style={{width: '100%'}} allowClear={true} placeholder="Status" onChange={(selectedItem)=>onFilterChange('statusFilter',selectedItem)}>
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col> */}
          </Row>
        </Col>
        <Col span={8} style={{display:'flex', justifyContent:'end'}}>
          {children}
          
        </Col>
      </Row>
    </Card>
  )
}

export default UsersFilter