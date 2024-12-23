import { Breadcrumb, Button, Drawer, Form, Space, Table, theme } from 'antd'
import {RightOutlined} from '@ant-design/icons'
import { Link, Navigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, getUsers } from '../../http/api'
import { CreateUserData, User } from '../../types'
import { userAuthStore } from '../../store'
import UsersFilter from './UsersFilter'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import UserForm from './forms/UserForm'


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

const Users = () => {

  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const {
    token: { colorBgLayout },                         //Do ctrl + Space tp see all predefined options
  } = theme.useToken();

  const [drawerOpen, setDrawerOpen] = useState(false)
  
  const {data: users, isLoading, isError, error} = useQuery({
    queryKey: ['users'],
    queryFn:()=>{
      return getUsers().then(response=>response.data)
    }
  })

  const {mutate: userMutate}= useMutation({
    mutationKey: ['user'],
    mutationFn: async(data: CreateUserData)=> createUser(data).then(res=>res.data),
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:['users']})
      return;
    }
  })

  const {user} = userAuthStore()

  const onHandleSubmit = async ()=>{
    await form.validateFields()
    await userMutate(form.getFieldsValue())
    console.log("Test",form.getFieldsValue())
    form.resetFields()
    setDrawerOpen(false)
  }
  if(user?.role !== 'admin'){
    return <Navigate to='/' replace={true}/>
  }
  
  return (
  <>
    <Space size={'large'} direction='vertical' style={{width: '100%'}}>
      <Breadcrumb separator={<RightOutlined />} items={[{ title: <Link to='/'>Dashboard</Link> }, { title: 'Users' }]} />
      {isLoading && <>Loading...</>}
      {isError && <>{error?.message}</>}
      <UsersFilter onFilterChange={(filterName : string, filterValue : string)=>{
        console.log(filterName, filterValue)
      }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={()=>setDrawerOpen(true)}>Add User</Button>
      </UsersFilter>
      <Table dataSource={users} columns={columns} rowKey={(user)=>user.id}/>

      <Drawer 
        styles={{body:{background: colorBgLayout} }}
        title="Create User" 
        width={720} 
        destroyOnClose={true} 
        open={drawerOpen} 
        onClose={()=>{
          setDrawerOpen(false)
        }}
        extra={
          <Space>
            <Button onClick={()=>setDrawerOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={onHandleSubmit}>
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout='vertical' form={form}>
          <UserForm/>
        </Form>
      </Drawer>
    </Space>
  </>
  )
}

export default Users