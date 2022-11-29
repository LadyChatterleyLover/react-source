import React, { useState } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router'
import NavHeader from '@/components/navHeader/NavHeader'
import NavSider from '@/components/navSider/NavSider'

const { Header, Sider, Content } = Layout

const Layouts = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <NavSider />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: '#fff' }}>
          <NavHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content
          style={{
            padding: 20,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Layouts
