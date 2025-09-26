'use client'

import { Button, Form, Input, Modal, Steps } from "antd"
import type { InputRef } from "antd"
import { useHasMounted } from "@/utils/customHook"
import { SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useAppNotification } from "@/utils/notification"
import { useRouter } from "next/navigation"

type PropsType = {
    emailUser: string
    isModalOpen: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalReactive = ({ emailUser, isModalOpen, setIsModalOpen }: PropsType) => {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm()
    const router = useRouter()
    const { contextHolder, openNotificationWithIcon } = useAppNotification()
    // Fix: Sử dụng InputRef từ Ant Design
    const inputRef = useRef<InputRef>(null)
    
    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    
    useEffect(() => {
        if (emailUser) {
            form.setFieldsValue({ email: emailUser })
        }
    }, [emailUser, form])
    
    const hasMounted = useHasMounted()
    if (!hasMounted) return <></>

    const onFinishStep0 = async (values: any) => {
        const { email } = values
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/retry-active`, {
                email
            })

            if (res?.data) {
                openNotificationWithIcon("Success", "Bạn vui lòng kiểm tra email!", "success")
                setCurrent(current + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Fix: Sửa function để handle form submission
    const handleSubmitConfirmCode = async (values?: any) => {
        // Lấy giá trị từ form values hoặc từ ref
        let inputValue = "";
        
        if (values?.code) {
            inputValue = values.code.trim();
        } else if (inputRef.current) {
            inputValue = inputRef.current.input?.value?.trim() || "";
        }
        
        if (!inputValue) {
            openNotificationWithIcon("Error", "Bạn vui lòng nhập lại mã!", "error")
            return
        }
        
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/confirm-active`, {
                email: emailUser,
                codeId: inputValue
            })
            
            if(res.data){
                setCurrent(current + 1)
                openNotificationWithIcon("Success", "Xác thực thành công, bạn vui lòng đăng nhập lại", "success")
                setIsModalOpen(false)
            }
        } catch (error) {
            console.log(">>>> error: ", error)
            openNotificationWithIcon("Error Post", "Lỗi khi thực hiện xác thực codeId", "error")
        }
    }

    return (
        <>
            {contextHolder}
            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen && hasMounted}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
                footer={null}
            >
                <Steps
                    current={current}
                    items={[
                        {
                            title: 'Login',
                            icon: <UserOutlined />,
                        },
                        {
                            title: 'Verification',
                            icon: <SolutionOutlined />,
                        },
                        {
                            title: 'Done',
                            icon: <SmileOutlined />,
                        },
                    ]}
                />
                
                {current == 0 && (
                    <>
                        <div>
                            <span>Tài khoản của bạn chưa được kích hoạt</span>
                        </div>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ margin: "20px 0" }}
                            autoComplete="off"
                            layout="vertical"
                            form={form}
                            onFinish={onFinishStep0}
                        >
                            <Form.Item
                                name="email"
                                initialValue={emailUser}
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Resend
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
                
                {current === 1 && (
                    <>
                        <Form
                            name="verification"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ margin: "20px 0" }}
                            autoComplete="off"
                            layout="vertical"
                            onFinish={handleSubmitConfirmCode}
                        >
                            <Form.Item
                                name="code"
                                rules={[{ required: true, message: 'Please input your code!' }]}
                            >
                                <Input 
                                    ref={inputRef} 
                                    placeholder="Nhập mã code của bạn"
                                />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button htmlType="submit" type="primary">
                                    Xác nhận
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Modal>
        </>
    )
}

export default ModalReactive