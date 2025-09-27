"use client";
import React from 'react';
import style from './update-personal-information.module.css';
import { useUserProfile } from '@/contexts/UserProfileProvider';

const UpdatePersonalInformation = () => {
    const { userInfo, setUserInfo } = useUserProfile();
    const updateUserInfo = (key, value) =>
        setUserInfo(prev => ({ ...prev, [key]: value }));

    return (
        <form className={style.formContainer}>
            {/* Full Name */}
            <div className={style.inputGroup}>
                <label>Full Name</label>
                <input
                    type="text"
                    name="username"
                    value={userInfo.username}
                    onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
                />
            </div>

            {/* Title */}
            <div className={style.inputGroup}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={userInfo.title}
                    onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
                />
            </div>

            {/* Email */}
            <div className={style.inputGroup}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
                />
            </div>

            {/* Phone */}
            <div className={style.inputGroup}>
                <label>Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={userInfo.phone}
                    onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
                />
            </div>

            {/* City */}
            <div className={style.inputGroup}>
                <label>City</label>
                <input
                    type="text"
                    name="city"
                    value={userInfo.city}
                    onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
                />
            </div>

            {/* Country */}
            <div className={style.inputGroup}>
                <label>Country</label>
                <input
                    type="text"
                    name="country"
                    value={userInfo.country}
                    onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
                />
            </div>

            {/* Address */}
            <div className={style.inputGroup}>
                <label>Address</label>
                <textarea
                    id='address'
                    name="address"
                    value={userInfo.address}
                    onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
                ></textarea>
            </div>

            {/* Summary */}
            <div className={style.inputGroup}>
                <label>Summary</label>
                <textarea
                    id='summary'
                    name="summary"
                    value={userInfo.summary}
                    onChange={(e) => updateUserInfo(e.target.name, e.target.value)}
                ></textarea>
            </div>
        </form>
    );
};

export default UpdatePersonalInformation;