import AdminLayoutClient from "@/components/layout/admin.layout.client";
import { auth } from "@/auth";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = async ({ children }) => {
    const session = await auth();
    return <AdminLayoutClient session={session}>{children}</AdminLayoutClient>;
};

export default AdminLayout