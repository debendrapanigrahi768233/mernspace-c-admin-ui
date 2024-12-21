import { Button, Card, Col, Input, Row, Select } from "antd";
import { PlusOutlined } from '@ant-design/icons';


type UsersFilterProp = {
  onFilterChange : (filterName : string, filterValue : string)=>void
}

const UsersFilter = ({onFilterChange}: UsersFilterProp) => {
  return (
    <Card>
      <Row justify={"space-between"}>
        <Col span={16}>
          <Row justify={"start"} gutter={20}>
            <Col span={8}><Input.Search style={{width: '100%'}} allowClear={true} placeholder="search" onChange={(e)=>onFilterChange('searchFilter',e.target.value)}/></Col>
            <Col span={8}>
              <Select style={{width: '100%'}} allowClear={true} placeholder="Select role" onChange={(selectedItem)=>onFilterChange('roleFilter',selectedItem)}>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="manager">Manager</Select.Option>
                <Select.Option value="customer">Customer</Select.Option>
              </Select>
            </Col>
            <Col span={8} >
              <Select style={{width: '100%'}} allowClear={true} placeholder="Status" onChange={(selectedItem)=>onFilterChange('statusFilter',selectedItem)}>
                <Select.Option value="ban">Ban</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{display:'flex', justifyContent:'end'}}>
          <Button type="primary" icon={<PlusOutlined />}>Add User</Button>
        </Col>
      </Row>
    </Card>
  )
}

export default UsersFilter