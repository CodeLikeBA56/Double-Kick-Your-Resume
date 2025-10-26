"use client";
import React, { useState } from 'react';

const EditTemplateLayout = ({ setIsLayoutModalActive }) => {
    const [layoutSelection] = useState("Predefined");

    return (
        <div
            onClick={() => setIsLayoutModalActive(prev => !prev)}
            className='w-screen h-screen fixed top-0 left-0 bg-shadow-color flex justify-center'
        >
            <main 
                className='w-screen max-w-[700px] h-max bg-secondary-bg-color mt-17 p-5 sm:p-10'
            >
                <header>
                    <div className='bg-primary-bg-color flex px-5 rounded-full'>
                        <button>Predefined</button>
                        <button>Custom</button>
                        <span className=''></span>
                    </div>
                </header>
            </main>
        </div>
    )
}

export default EditTemplateLayout
