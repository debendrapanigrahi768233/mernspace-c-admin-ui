import { Breadcrumb } from 'antd'
import {RightOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const UserPage = () => {
  return (
  <>
    <Breadcrumb separator={<RightOutlined />} items={[{ title: <Link to='/'>Dashboard</Link> }, { title: 'Users' }]} />
  </>
  )
}

export default UserPage