'use client';

import AdminContent from "@/components/layout/admin.content";
import AdminFooter from "@/components/layout/admin.footer";
import AdminHeader from "@/components/layout/admin.header";
import AdminSideBar from "@/components/layout/admin.sidebar";
import { Layout, theme } from "antd";
import React from "react";
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
    getItem('Team', 'sub2', <TeamOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8')
    ]),
    getItem('Files', '9', <FileOutlined />),
];

interface AdminLayoutClientProps {
    children: React.ReactNode;
    session: any;
}

const AdminLayoutClient: React.FC<AdminLayoutClientProps> = ({ children, session }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // console.log(">>>>> session: ", session)
    // expires: "2025-10-26T08:11:43.693Z"
    // user: accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inh1YW52dWF1ZGkyMDAyQGdtYWlsLmNvbSIsInN1YiI6IjY4ZDU2ZGRiOTBiOTA0ZDc2ODA1MDJhNSIsImlhdCI6MTc1ODg3NDMwMywiZXhwIjoxNzU4ODc0MzAzfQ.8NYqAqBKW7AaykJJW5y0tMBhJuc8jGUwc-kuGw3rSP4"
    //         email: "xuanvuaudi2002@gmail.com"
    //         id: "cb5e8e86-475b-4d6d-b634-771eee4c4c59"
    //         name: "xvu"
    //         _id: "68d56ddb90b904d7680502a5"
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AdminSideBar items={items} />
            <Layout>
                <AdminHeader session={session} colorBackground={colorBgContainer} />
                <AdminContent colorBackground={colorBgContainer} borderRadiusLG={borderRadiusLG}>
                    {children}
                </AdminContent>
                <AdminFooter />
            </Layout>
        </Layout>
    );
};

export default AdminLayoutClient;