import { NavLink, Navigate, Outlet } from "react-router-dom"
import { userAuthStore } from "../store"
import { Layout,Menu, theme } from "antd"

import Icon from '@ant-design/icons'
import { useState } from "react"
import Logo from "../components/icons/Logo"
import Home from "../components/icons/Home"
import UserIcon from "../components/icons/UserIcon"
import { foodIcon } from "../components/icons/FoodIcon"
import BasketIcon from "../components/icons/BasketIcon"
import GiftIcon from "../components/icons/GiftIcon"

const {Sider,Header,Content,Footer } = Layout

const items =[
  {
    key: '/',
    icon: <Icon component={Home}/>,
    label: <NavLink to='/'>Home</NavLink>
  },
  {
    key: '/users',
    icon: <Icon component={UserIcon}/>,
    label: <NavLink to='/users'>Users</NavLink>
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

const Dashboard = () => {
    const {user} =userAuthStore()
    const [collapsed, setCollapsed] = useState(false)
    const {
      token: { colorBgContainer },
    } = theme.useToken();

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
            <Header style={{ padding: 0, background: colorBgContainer}} />
            <Content style={{ margin: '0 16px' }}>
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