import HomePage from "@/components/layout/homepage";
import { Button, Form } from "antd";
import { auth, signIn } from "@/auth"

export default async function Home() {
    const session = await auth()

    return (
        <div>
            <HomePage />
        </div>
    );
}
