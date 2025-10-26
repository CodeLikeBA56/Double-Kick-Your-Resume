"use client";
import React from 'react';
import { useUserProfile } from '@/contexts/UserProfileProvider';

const DisplayEducation = () => {
    const { education } = useUserProfile();
  return (
    <div className='gap-0 flex flex-col px-6 pl-13'>
        <header className='text-3xl text-primary-text-color font-extrabold'>Education</header>
        {
            education?.map((edu, index) => (
                <div key={index} className='
                    relative mb-3
                    before:flex before:h-[calc(100%-12px)] before:w-9 before:bg-primary-main-color
                    before:absolute before:right-[calc(100%+18px)] before:top-[50%] before:translate-y-[-50%]
                '>
                    <h1 className='text-[20px] font-black'>{edu?.program}</h1>
                    <h3 className='text-1xl font-semibold mt-[-5px]'>{edu?.institution}</h3>
                    <div className='flex items-center justify-between text-primary-main-color mt-[0px] font-bold italic'>
                        <span className='text-[12.5px]'>{`${edu?.startDate?.month}/${edu?.startDate?.year} - ${edu?.endDate?.month}/${edu?.endDate?.year}`}</span>
                        <p className='text-[12.5px]'>{edu?.location}</p>
                    </div>
                </div>
            ))
        }
    </div>
  );
}

export default DisplayEducation;