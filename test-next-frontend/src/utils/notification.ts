import { notification } from "antd";

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

const [api, contextHolder] = notification.useNotification();
export { contextHolder };
export const openNotificationWithIcon = (text: string, description: string, type: NotificationType) => {
    api[type]({
        message: text,
        description: description
    })
}