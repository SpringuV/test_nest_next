import { notification } from "antd";

export const useAppNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = ( message: string, description: string,  type: 'success' | 'info' | 'warning' | 'error') => {
    api[type]({
      message,
      description,
    });
  };

  return { contextHolder, openNotificationWithIcon };
};