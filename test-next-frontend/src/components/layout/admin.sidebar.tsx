'use client'
import { Layout, Menu } from "antd";
import { useState } from "react";


const AdminSideBar = (props: any) => {
    const {items} = props
    const [collapsed, setCollapsed] = useState(false);
    const { Sider } = Layout;

    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
        </>
    )
}

export default AdminSideBar