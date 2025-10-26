"use client";
import React from 'react';
import styles from './Notification.module.css';

const Notification = React.memo(({ id, type = "info", message = "", onClickFn = () => {} }) => {
  
  const messageTypeStyling = {
    success: { icon: 'check_circle', className: 'notification--success' },
    error: { icon: 'cancel', className: 'notification--failure' },
    warning: { icon: 'warning', className: 'notification--warning' },
    info: { icon: 'info', className: 'notification--info' },
  };

  const { icon, className } = messageTypeStyling[type] || {};

  return (
    <div className={`${styles['alert-container']} ${styles[className]}`}>
      <div className={`${styles['notification-content']}`}>
        <span className="material-symbols-outlined">{icon}</span>
        <p>{message}</p>
        <button className={`w-[20px] ${styles["close-notification-btn"]}`} onClick={() => onClickFn(id)}>
          <span className='material-symbols-outlined'>close</span>
        </button>
      </div>
      <div className={`${styles['notification-progress']} ${styles[className]}`}></div>
    </div>
  );
});

export default Notification;