import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'

import {
  UnorderedListOutlined,
  SendOutlined,
  HomeOutlined,
} from '@ant-design/icons'

const NavSider = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const clickItem = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      items={[
        {
          key: '/',
          icon: <HomeOutlined />,
          label: '首页',
        },
        {
          key: '/virtual-list',
          icon: <UnorderedListOutlined />,
          label: '虚拟列表',
        },
        {
          key: '/transition',
          icon: <SendOutlined />,
          label: '动画',
        },
      ]}
      onClick={clickItem}
    />
  )
}

export default NavSider
