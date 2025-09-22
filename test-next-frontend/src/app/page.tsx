import HomePage from "@/components/layout/homepage";
import { Button, Form } from "antd";
import { signIn } from "@/auth"

export default function Home() {
    return (
        <div>
            <HomePage />
        </div>
    );
}
