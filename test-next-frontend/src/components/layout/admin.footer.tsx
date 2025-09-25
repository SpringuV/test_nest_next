'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;
    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                Thich hoc tieng trung ©{new Date().getFullYear()} Created by Spring uV
            </Footer>
        </>
    )
}

export default AdminFooter