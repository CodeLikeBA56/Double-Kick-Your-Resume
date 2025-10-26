import React, { memo } from 'react';
import Notification from '../Notification/Notification';
import styles from "../Notification/Notification.module.css";
import { useNotification } from '@/contexts/NotificationProvider';

const NotificationStack = () => {
    const { notifications, removeNotification } = useNotification();

    if (notifications.length < 1) return;

    return (
        <div className={styles["notification-stack"]}>
            {
                notifications.map((notification) => (
                    <Notification
                        key={notification.id}
                        {...notification}
                        onClickFn={removeNotification}
                    />
                ))
            }
        </div>
    )
};

export default NotificationStack
