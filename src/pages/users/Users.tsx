import { Breadcrumb, Button, Drawer, Form, Space, Table, theme, Spin, Flex, Typography } from 'antd'

import {RightOutlined} from '@ant-design/icons'
import { Link, Navigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { createUser, getUsers, updateUser } from '../../http/api'
import { CreateUserData, FieldData, User } from '../../types'
import { userAuthStore } from '../../store'
import UsersFilter from './UsersFilter'
import { useEffect, useMemo, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import UserForm from './forms/UserForm'
import { PER_PAGE } from '../../constants';
import { debounce } from 'lodash';


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
  {
    title: 'Restaurant',
    dataIndex : 'tenant',
    key: 'tenant',
    render: (_text: string, record : User)=> {
      return(
        <div>{record.tenant?.name}</div>
      )
    }
  }
]

const Users = () => {

  const [form] = Form.useForm()
  const [filterForm]= Form.useForm()
  const [currentEditingUser, setCurrentEditingUser] = useState<User | null>(null)
  const queryClient = useQueryClient()
  const {
    token: { colorBgLayout },                         //Do ctrl + Space tp see all predefined options
  } = theme.useToken();

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [queryParams, setQueryParams] = useState({
    perPage: PER_PAGE,
    currentPage: 1
  })

  useEffect(()=>{
    if(currentEditingUser){
      setDrawerOpen(true)
      form.setFieldsValue({...currentEditingUser,tenantId: currentEditingUser.tenant?.id})
    }
  },[currentEditingUser, form])
  
  const {data: users, isFetching, isError, error} = useQuery({
    queryKey: ['users',queryParams],
    queryFn:()=>{
      const filterParams = Object.fromEntries(Object.entries(queryParams).filter((item)=>!!item[1]))
      // const queryString = `currentPage=${queryParams?.currentPage}&perPage=${queryParams?.perPage}`
      const queryString = new URLSearchParams(filterParams as unknown as Record<string,string>).toString()
      return getUsers(queryString).then(response=>response.data)
    },
    placeholderData: keepPreviousData
  })

  const {mutate: userMutate}= useMutation({
    mutationKey: ['user'],
    mutationFn: async(data: CreateUserData)=> createUser(data).then(res=>res.data),
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:['users']})
      return;
    }
  })

  const {mutate: updateUserMutation}= useMutation({
    mutationKey: ['update-user'],
    mutationFn: async(data: CreateUserData)=> updateUser(data, currentEditingUser!.id).then(res=>res.data),
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey:['users']})
      return;
    }
  })

  const {user} = userAuthStore()

  const onHandleSubmit = async ()=>{
    const isEditMode=  !!currentEditingUser
    await form.validateFields()

    if(isEditMode){
      console.log("Updating")
      await updateUserMutation(form.getFieldsValue())
    }else{
      console.log("Creating")
      console.log("Test",form.getFieldsValue())
      await userMutate(form.getFieldsValue())
    }
    setDrawerOpen(false)
    setCurrentEditingUser(null)
    form.resetFields()
    
  }

  //It will not call on keystrokes, but as soon we stop typing then it will be called
  const debounceQUpdate = useMemo(()=>{
    return debounce((value: string | undefined)=>{
      setQueryParams((prev)=> ({...prev, q: value, currentPage: 1}))
    },500)
  },[])

  const onFilterChange=(changedFields : FieldData[])=>{
    const changedFilterFields = changedFields.map((item)=>({
        [item.name[0]] : item.value
    })).reduce((acc, item)=>({...acc,...item}),{})
    if('q' in changedFilterFields){
      debounceQUpdate(changedFilterFields.q)
    }else{
      setQueryParams((prev)=> ({...prev, ...changedFilterFields, currentPage: 1}))
    }
  }

  if(user?.role !== 'admin'){
    return <Navigate to='/' replace={true}/>
  }
  
  return (
  <>
    <Space size={'large'} direction='vertical' style={{width: '100%'}}>
      <Flex justify='space-between'>
        <Breadcrumb separator={<RightOutlined />} items={[{ title: <Link to='/'>Dashboard</Link> }, { title: 'Users' }]} />
        {isFetching && <><Spin/></>}
        {isError && <Typography.Text type='danger'>{error?.message}</Typography.Text>}
      </Flex>
      <Form form={filterForm} onFieldsChange={onFilterChange}>
        <UsersFilter >
          <Button type="primary" icon={<PlusOutlined />} onClick={()=>{
            form.resetFields()
            setDrawerOpen(true)}}>
              Add User</Button>
        </UsersFilter>
      </Form>
      <Table 
      dataSource={users?.data} 
      columns={[...columns,{
        title: 'Action',
        dataIndex : 'action',
        key: 'action',
        render: (_:string, record : User)=>{
          console.log(record,_)
          return (
            <Space>
              <Button type="link" onClick={()=>setCurrentEditingUser(record)}>Edit</Button>
            </Space>
          )
        }
      }]} 
      rowKey={(user)=>user.id}
      pagination={{
        total: users?.total,
        pageSize: queryParams.perPage,
        current: queryParams?.currentPage,
        showTotal:(total: number, range: [number, number])=>{
          return `Showing ${range[0]}- ${range[1]} of ${total} records`
        },
        onChange:(page)=>{
          setQueryParams((prev)=>{
            return {
              ...prev,
              currentPage: page
            }
          })
        }
      }}
      />

      <Drawer 
        styles={{body:{background: colorBgLayout} }}
        title={currentEditingUser? "Edit User":"Create User"} 
        width={720} 
        destroyOnClose={true} 
        open={drawerOpen} 
        onClose={()=>{
          setCurrentEditingUser(null)
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
          <UserForm isEditMode={!!currentEditingUser}/>
        </Form>
      </Drawer>
    </Space>
  </>
  )
}

export default Users