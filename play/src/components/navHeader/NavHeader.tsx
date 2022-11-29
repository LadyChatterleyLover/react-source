import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

interface Props {
  collapsed: boolean
  setCollapsed: (val: boolean) => void
}

const NavHeader = (props: Props) => {
  const { collapsed, setCollapsed } = props

  return (
    <div className="px-5">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        onClick: () => setCollapsed(!collapsed),
      })}
    </div>
  )
}

export default NavHeader
