"use client";
import { v4 as uuidv4 } from "uuid";
import { createContext, useCallback, useContext, useState } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = useCallback(id => { // Removes a notification by id
        setNotifications((prev) => prev.filter(n => n.id !== id));
    }, []);

  // Triggers a new notification
    const pushNotification = useCallback((type, message, duration = 4000) => {
        const id = uuidv4();
        const newNotification = { id, type, message };

        setNotifications((prev) => [...prev, newNotification]);

        // Auto remove after `duration`
        setTimeout(() => removeNotification(id), duration);
    }, [removeNotification]);

    return (
        <NotificationContext.Provider
            value={{ notifications, pushNotification }}
        >
        {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);

export default NotificationProvider;