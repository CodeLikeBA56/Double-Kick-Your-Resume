"use client";
import React from 'react';
import template from "./Template1.module.css"
import { useCV } from '@/contexts/CVProvider';
import { useUserProfile } from '@/contexts/UserProfileProvider';

const DisplayPersonalInformation = () => {
    const { selectedTheme } = useCV();
    const { userInfo } = useUserProfile();

    return (
        <div className='gap-5 grid grid-cols-2 justify-between border-b-2 px-8 py-6 pl-13 pt-8'>
            <div className='
                flex flex-col relative
                before:flex before:h-[30%] before:w-9 before:bg-secondary-bg-color
                before:absolute before:right-[calc(100%+18px)] before:top-[3%]
            '>
                <h1 className='text-3xl font-extrabold text-primary-text-color'>{userInfo.username}</h1>
                <h3 className='text-1xl font-bold text-primary-main-color'>{userInfo.title}</h3>
                <p className='text-primary-text-color font-light text-[13.5px] mt-3'>{userInfo.summary}</p>

            </div>

            {/* <img /> */}

            <div className='gap-2 flex flex-col items-end'>
                <div className={`${template.userInfo}`}>
                    <span className={`${template.info}`}>{userInfo.email}</span>
                    <i className="bi bi-envelope-fill"></i>
                </div>
                <div className={`${template.userInfo}`}>
                    <span className={`${template.info}`}>{userInfo.phone}</span>
                    <i className="bi bi-phone-fill"></i>
                </div>
                <div className={`${template.userInfo}`}>
                    <span className={`${template.info}`}>{`${userInfo.city}, ${userInfo.country}`}</span>
                    <i className="bi bi-geo-alt-fill"></i>
                </div>
                <div className={`${template.userInfo}`}>
                    <span className={`${template.info}`}>{userInfo?.socialLinks?.linkedIn}</span>
                    <i className="bi bi-linkedin"></i>
                </div>
                <div className={`${template.userInfo}`}>
                    <a href={`https://${userInfo.socialLinks.github}`} className={`${template.info}`}>{userInfo?.socialLinks?.github}</a>
                    <i className="bi bi-github"></i>
                </div>
            </div>
        </div>
    )
}

export default DisplayPersonalInformation