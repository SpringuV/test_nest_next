"use client";
import AdminContent from "@/components/layout/admin.content";
import AdminFooter from "@/components/layout/admin.footer";
import AdminHeader from "@/components/layout/admin.header";
import AdminSideBar from "@/components/layout/admin.sidebar";
import { Layout, theme } from "antd"
import React from "react"
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];


interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <AdminSideBar items={items} />
                <Layout>
                    <AdminHeader colorBackground={colorBgContainer} />
                    <AdminContent colorBackground={colorBgContainer} borderRadiusLG={borderRadiusLG}>
                        {children}
                    </AdminContent>
                    <AdminFooter />
                </Layout>
            </Layout>
        </>
    )
}
export default AdminLayout


// layout.tsx - Layout component tự động wrap các page con
// page.tsx - Page component chính
// loading.tsx - Loading UI
// error.tsx - Error UI
// not-found.tsx - 404 page
// template.tsx - Tương tự layout nhưng re-mount khi navigate