import { Breadcrumb, Space, Table } from 'antd'
import {RightOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../http/api'
import { User } from '../../types'

const columns = [
  {
    title: 'Id',
    dataIndex : 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex : 'firstName',
    key: 'firstName',
    render: (_text: string, record : User)=> {
      return(
        <div>{record.firstName} {record.lastName}</div>
      )
      }
  },
  {
    title: 'Email',
    dataIndex : 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex : 'role',
    key: 'role',
  },
  // {
  //   title: 'Action',
  //   dataIndex : 'action',
  //   key: 'action',
  //   render: ()=>{
  //     return (
  //       <div>
  //         <Link to={`/users/edit`}>Edit</Link>
  //       </div>
  //     )
  //   }
  // }
]

const UserPage = () => {
  const {data: users, isLoading, isError, error} = useQuery({
    queryKey: ['users'],
    queryFn:()=>{
      return getUsers().then(response=>response.data)
    }
  })
  return (
  <>
    <Space size={'large'} direction='vertical' style={{width: '100%'}}>
      <Breadcrumb separator={<RightOutlined />} items={[{ title: <Link to='/'>Dashboard</Link> }, { title: 'Users' }]} />
      {isLoading && <>Loading...</>}
      {isError && <>{error?.message}</>}
      <Table dataSource={users} columns={columns} />
    </Space>
  </>
  )
}

export default UserPage