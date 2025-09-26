'use client'
import { Breadcrumb, Layout } from 'antd';

interface AdminContentProps {
    children?: React.ReactNode;
    colorBackground: string;
    borderRadiusLG: number;
}

const AdminContent: React.FC<AdminContentProps> = ({ children, colorBackground, borderRadiusLG }) => {
    const { Content } = Layout;
    // THÊM LOG ĐỂ DEBUG
    // console.log('AdminContent render - có children:', !!children);
    return (
        <>
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[{ title: 'User' }, { title: 'Bill' }]}
                />
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBackground,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </div>
            </Content>
        </>
    )
}

export default AdminContent