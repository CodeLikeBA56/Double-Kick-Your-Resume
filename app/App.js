"use client";
import React from 'react';
import NotificationStack from '@/components/NotificationStack/NotificationStack';

const App = ({ children }) => {
    return (
        <>
            {children}
            { <NotificationStack /> }
        </>
    );
}

export default App;