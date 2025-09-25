import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppNotification } from '@/utils/notification';

interface I_RegisterResponse {
    _id: string,
    email: string
}

type FieldType = {
    email?: string;
    password?: string;
    name?: string;
};

const Register: React.FC = () => {
    const {contextHolder, openNotificationWithIcon} = useAppNotification()
    const router = useRouter()
    // Primitive = kiểu dữ liệu cơ bản (string, number, …).
    // Union = nhiều kiểu kết hợp (string | number).
    // Tuple = mảng cố định số lượng và kiểu phần tử ([string, number]).


    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('>>>> value input register: ', values);
        const { email, password, name } = values
        try {
            const res = await axios.post<I_RegisterResponse>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
                email: email,
                password: password,
                name: name
            })
            console.log(">>> chech res register: ", res.data)
            if (res?.data) {
                router.push(`/verify/${res.data._id}`)
            }
        } catch (error) {
            // Ép kiểu lỗi AxiosError
            const err = error as AxiosError<any>;

            // Nếu server có trả     const [api, contextHolder] = notification.useNotification()về message
            if (err.response?.data) {
                const msg = err.response.data.message || 'Register failed';
                openNotificationWithIcon("Error Register", msg, 'error');
            } else {
                openNotificationWithIcon("Error Register", err.message, 'error');
            }
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <div className="flex w-full flex-col h-screen justify-center items-center">
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
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
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

                    <Form.Item<FieldType>
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <span>
                    Bạn đã có tài khoản ? <a href="/auth/login" className="italic text-blue-400 hover:text-blue-600">Quay lại trang đăng nhập</a>
                </span>
            </div>
        </>
    )
}

export default Register