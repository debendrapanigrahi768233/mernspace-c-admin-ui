import { Card, Layout, Space, Form, Input, Checkbox, Button, Flex, Alert } from 'antd'
import {LockFilled, UserOutlined, LockOutlined} from '@ant-design/icons'
import {Logo} from '../../components/icons/logo'

// import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Credentials } from '../../types'
import { login, self, logout } from '../../http/api'
import { userAuthStore } from '../../store'
import { usePermission } from '../../hooks/usePermission';

const loginUser=async (credentials: Credentials)=>{
  //server call logic
  const {data}=await login(credentials)
  return data
}

const getSelf=async()=>{
  //server call logic
  const {data}=await self()
  return data
}

const LoginPage = () => {
  const {isAllowed} = usePermission()
  //ctrl + space inside the object to see what all available
  const {setUser, logout: logoutFromStore}= userAuthStore()
  const {refetch}=useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false             //This is bydefault not run the query when the component render
  })

  const {mutate, isPending, isError, error}= useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async ()=>{
      //get self
      const selfDataPromise= await refetch();
      console.log(selfDataPromise)

      //logout or redirect to client ui if user not admin    for redirect ---> window.location.href="http://client-Ui-URL"
      //selfDataPromise.data.role = ['customer','admin']
      if(!isAllowed(selfDataPromise.data)){
        await logout()
        logoutFromStore()
        return;
      }
      setUser(selfDataPromise.data);
    }
  })
  return (
    <>
      <Layout style={{height: '100vh', display:'grid', placeItems:'center'}}>
        <Space direction='vertical' align='center' size='large'>
          <Layout.Content  style={{display:"flex", justifyContent:'center'}}>
            <Logo/>
          </Layout.Content>
          <Card 
          bordered={false}
          style={{width: '300px'}}
          title={
            <Space style={{width:"100%", justifyContent:"center", fontSize: 16}}>
              <LockFilled/>
              Sign in
            </Space>
          }>
            <Form initialValues={{remember: true}} onFinish={(values)=>{
              mutate({email: values.username, password: values.password})
              console.log(values)
            }}> 
            {isError && <Alert style={{marginBottom: '24px'}} type='error' message={error.message}/>}
              <Form.Item name="username" rules={
                [
                  {
                    required: true,
                    message: 'please provide your username'
                  },
                  {
                    type:'email',
                    message:'Username is not valid email'
                  }
                ]
              }>
                <Input prefix={<UserOutlined/>} placeholder='Username'/>
              </Form.Item>
              <Form.Item name="password" rules={
                [
                  {
                    required: true,
                    message: 'Password field is required'
                  }
                ]
              }>
                <Input.Password prefix={<LockOutlined />} placeholder='Password'/>
              </Form.Item>
              <Flex justify='space-between' align='center'>
                <Form.Item name="remember" valuePropName='checked'>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="#" id="login-form-forgot">Forgot password</a>
              </Flex>
              <Form.Item name="button">
                <Button type='primary' htmlType='submit' style={{width: '100%'}} loading={isPending}>Log in</Button>
              </Form.Item>
            </Form>

          </Card>
        </Space>
      </Layout>
    </>
  )
}

export default LoginPage