"use client"
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { authenticate } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { openNotificationWithIcon, contextHolder } from '@/utils/notification';

const Login: React.FC = () => {
    type FieldType = {
        email?: string;
        password?: string;
        remember?: string;
    };
    const router = useRouter()
    // Primitive = kiểu dữ liệu cơ bản (string, number, …).
    // Union = nhiều kiểu kết hợp (string | number).
    // Tuple = mảng cố định số lượng và kiểu phần tử ([string, number]).

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {

        const { email, password, remember } = values
        //  trigger sign-in
        const res = await authenticate(email, password)



        if (res?.error) {
            openNotificationWithIcon("Error Login", res?.error, 'error')
            if (res?.code === 2) {
                setTimeout(() => {
                    // sau 3s tu dong chuyen huong
                    router.push('/verify')
                }, 3000)
            }
        } else {
            router.push('/dashboard')
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <div className="flex flex-col w-full h-screen justify-center items-center">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="email"
                        rules={[{ required: true, message: 'Please input yreturn { "error": "Incorrect username or password" }our username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <span>
                    Bạn chưa có tài khoản? <a href="/auth/register" className="italic text-blue-400">Đăng kí tại đây</a>
                </span>
            </div>
        </>
    )
}

export default Login