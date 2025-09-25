"use client"

import { useAppNotification } from "@/utils/notification";
import { Button, Divider, Form, FormProps, Input } from "antd";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type VerifyProps = {
    codeId: string
}

const Verify = (props: VerifyProps) => {
    const { codeId } = props
    const { contextHolder, openNotificationWithIcon } = useAppNotification()
    const router = useRouter()
    // Primitive = kiểu dữ liệu cơ bản (string, number, …).
    // Union = nhiều kiểu kết hợp (string | number).
    // Tuple = mảng cố định số lượng và kiểu phần tử ([string, number]).


    const onFinish: FormProps['onFinish'] = async (values) => {
        const { _id, code_id } = values
        // console.log('>>>> value input Verify: ', values, "code_id_prop: ", code_id);
        // {_id: '68d58a2071a62c70d962aa1f', code_id: 'b1a02c3a-a96d-42a1-bd30-32492153364a'}
        // code_id_prop:  b1a02c3a-a96d-42a1-bd30-32492153364a
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/check-code`, {
                _id: _id,
                codeId: code_id
            })
            // console.log(">>> chech res Verify: ", res.data)
            // >>> chech res Verify:  true
            if (res?.data) {
                openNotificationWithIcon("Success", "Xác thực thành công, đang chuyển hướng tới trang đăng nhập", "success" )
                setTimeout(() => {
                    router.push('/auth/login')
                }, 5000)
            } else {
                openNotificationWithIcon("Error", "Xác thực không thành công, vui lòng kiểm tra lại", "error")
            }
        } catch (error) {
            // Ép kiểu lỗi AxiosError
            const err = error as AxiosError<any>;

            // Nếu server có trả     const [api, contextHolder] = notification.useNotification()về message
            if (err.response?.data) {
                const msg = err.response.data.message || 'Register failed';
                openNotificationWithIcon("Error Verify", msg, 'error');
            } else {
                openNotificationWithIcon("Error Verify", err.message, 'error');
            }
        }
    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            {contextHolder}
            <div className="flex w-full flex-col h-screen justify-center items-center">
                <legend>Kích hoạt tài khoản</legend>
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
                    <Form.Item
                        label="Id"
                        name="_id"
                        initialValue={codeId}
                        hidden
                    >
                        <Input disabled />
                    </Form.Item>
                    <div>
                        Mã code đã được gửi tới email, vui lòng kiểm tra email
                    </div>
                    <Form.Item
                        label="Code"
                        name="code_id"
                        rules={[{ required: true, message: 'Please input your code!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Divider />
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

export default Verify