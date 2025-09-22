"use client"
import { signIn } from "next-auth/react"
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { authenticate } from "@/utils/actions";



const Login: React.FC = () => {
    type FieldType = {
        email?: string;
        password?: string;
        remember?: string;
    };

    // Primitive = kiểu dữ liệu cơ bản (string, number, …).

    // Union = nhiều kiểu kết hợp (string | number).

    // Tuple = mảng cố định số lượng và kiểu phần tử ([string, number]).

    const onFinish: FormProps<FieldType>['onFinish'] = async (values: any) => {

        const { email, password, remember } = values
        //  trigger sign-in
        const res = await authenticate(email, password)
        console.log('>> check res:', res);
        // const data = await signIn("credentials", { email, password, remember, redirect: false }) // redirectTo: "/dashboard"
        // console.log('Success:', data);

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <div className="flex w-full h-screen justify-center items-center">
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
            </div>
        </>
    )
}

export default Login