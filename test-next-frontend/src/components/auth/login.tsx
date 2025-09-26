"use client"
import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { authenticate } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { useAppNotification } from '@/utils/notification';
import ModalReactive from '@/components/auth/modal.reactive'

const Login = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const { contextHolder, openNotificationWithIcon } = useAppNotification()
    const [emailProp, setPropEmail] = useState("")
    
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

        const { email, password } = values
        //  trigger sign-in
        const res = await authenticate(email, password)
        
        if (res?.error) {
            if (res?.code === 2) {
                setTimeout(() => {
                    // sau 3s tu dong chuyen huong
                    // router.push('/verify')
                    setPropEmail(email)
                    setIsModalOpen(true)
                }, 3000)
            }
            openNotificationWithIcon("Error Login", res?.error, 'error')
            
        } else {
            openNotificationWithIcon("Success", "Đăng nhập thành công, chờ 1 chút ...", "success")
            router.push('/dashboard')
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    
    return (
        <>
            {contextHolder}
            <Row>
                <Col xs={24}>
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
                </Col>
            </Row>
            <ModalReactive 
                emailUser={emailProp}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    )
}

export default Login