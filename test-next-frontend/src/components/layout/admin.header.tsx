'use client'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Layout, MenuProps, Space } from 'antd';
import { signOut } from 'next-auth/react';
import React from 'react';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <span className='w-full block text-center'>
                Settings
            </span>
        ),
    },
    {
        key: '2',
        danger: true,
        label: <span className='w-full block text-center' onClick={() => signOut()}>Đăng xuất</span>,
    },
];

const AdminHeader: React.FC<AdminHeaderProps> = ({ colorBackground, session }) => {
    const { Header } = Layout;
    return (
        <>
            <Header style={{ padding: 0, background: colorBackground }}>
                <div className='w-full justify-end flex items-center'>
                    <div className='mr-3'>
                        <Dropdown menu={{ items }}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <h1>Welcome {session?.user.email} <DownOutlined /></h1>
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        </>
    )
}

export default AdminHeader