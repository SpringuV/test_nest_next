'use client'
import { Layout } from 'antd';

const AdminHeader = (props: any) => {
    const { colorBackground } = props
    const { Header } = Layout;
    return (
        <>
            <Header style={{ padding: 0, background: colorBackground }} />
        </>
    )
}

export default AdminHeader