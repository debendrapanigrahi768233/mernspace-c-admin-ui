import { NavLink, Navigate, Outlet } from "react-router-dom"
import { userAuthStore } from "../store"
import { Avatar, Badge, Dropdown, Flex, Layout,Menu, Space, theme } from "antd"

import Icon,{BellFilled} from '@ant-design/icons'
import { useState } from "react"
import Logo from "../components/icons/Logo"
import Home from "../components/icons/Home"
import UserIcon from "../components/icons/UserIcon"
import { foodIcon } from "../components/icons/FoodIcon"
import BasketIcon from "../components/icons/BasketIcon"
import GiftIcon from "../components/icons/GiftIcon"
import { useMutation } from '@tanstack/react-query'
import { logout } from "../http/api"

const {Sider,Header,Content,Footer } = Layout

const getMenuItems = (role: string)=>{
  const baseItems = [
    {
      key: '/',
      icon: <Icon component={Home}/>,
      label: <NavLink to='/'>Home</NavLink>
    },
    {
      key: '/restaurants',
      icon: <Icon component={foodIcon}/>,
      label: <NavLink to='/restaurants'>Restaurants</NavLink>
    },
    {
      key: '/products',
      icon: <Icon component={BasketIcon}/>,
      label: <NavLink to='/products'>Products</NavLink>
    },
    {
      key: '/promos',
      icon: <Icon component={GiftIcon}/>,
      label: <NavLink to='/promos'>Promos</NavLink>
    }
  ]
  if(role === 'admin'){
    const menu =  [...baseItems]
    menu.splice(1, 0, {
        key: '/users',
        icon: <Icon component={UserIcon}/>,
        label: <NavLink to='/users'>Users</NavLink>
      },
    )
    return menu
  }
  return baseItems
}


const Dashboard = () => {
    const {user} =userAuthStore()
    const [collapsed, setCollapsed] = useState(false)
    const {logout: logoutFromStore}= userAuthStore()
    const items =getMenuItems(user?.role as string)


    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const {mutate: logoutMutate}= useMutation({
      mutationKey: ['logout'],
      mutationFn: logout,
      onSuccess: ()=>{
        logoutFromStore()
        return;
      }
    })

    if(user === null){
        return <Navigate to='/auth/login' replace={true}/>
    }

    

  return (
    <div>
        {/* <Link to='/auth/login'>Log In</Link> */}
        <Layout style={{ minHeight: '100vh' }}>
          <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="logo">
              <Logo/>
            </div>
            <Menu theme="light" defaultSelectedKeys={['/']} mode="inline" items={items} />
          </Sider>
          <Layout>
            <Header style={{ paddingLeft: '16px',paddingRight:'16px', background: colorBgContainer}} >
              <Flex gap="middle" align="start" justify="space-between">
                <Badge text={user?.role == 'admin'?"You are an admin":user?.tenant?.name}  status="success" />
                <Space size={16}>
                  <Badge dot={true}>
                    <BellFilled/>
                  </Badge>
                  <Dropdown menu={{ items: [
                      {
                        key: 'logout',
                        label: 'Logout',
                        onClick: ()=>{logoutMutate()}
                      }
                    ] }} placement="bottomRight" arrow>
                      <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
                    </Dropdown>
                </Space>
              </Flex>
            </Header>
            <Content style={{ margin: '24px' }}>
              {/* Main content of all page */}
              <Outlet/>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              @ Mern space pizza app
            </Footer>
          </Layout>
        </Layout>
        
    </div>
  )
}

export default Dashboard