"use client";
import Link from 'next/link';
import React,{ useState } from 'react';
import { useCV } from '@/contexts/CVProvider';
import { useUserProfile } from '@/contexts/UserProfileProvider';
import EditTemplateLayout from '../EditTemplateLayout/EditTemplateLayout';
import FillResumeNavbarStyle from "@/app/(user)/fill-resume/fill-resume.module.css";

const FillResumeNavbar = () => {
    const { targetContent } = useCV();
    const { documentName } = useUserProfile();
    const [isLayoutModalActive, setIsLayoutModalActive] = useState(true);
    
    const downloadCV = async (e) => {
        e.target.disabled = true;
        try {
            const res = await fetch("/api/pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: "http://localhost:3001/fill-resume" }), // your target URL
            });
            
            if (!res.ok) throw new Error("Failed to generate PDF");
            
            const blob = await res.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${documentName || "resume"}.pdf`;
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (e) {
            console.error("Error downloading PDF:", e);
        }
        e.target.disabled = false;
    };      
    
    return (
        <nav className="w-full h-20 relative flex items-center justify-between px-3 lg:px-5">
            <div className='
                flex items-center rounded-full bg-main-color text-white-color p-2
                md:gap-2 md:px-4 md:py-2
            ' title='Double Kick Your Resume'>
                <span className="material-symbols-outlined">sports_gymnastics</span>
                <span className="hidden md:block text-1xl font-bold">Resume</span>
            </div>

            <div className="gap-0 flex bg-main-color text-white-color px-1 md:gap-5 md:px-5 rounded-full">
                <button type='button'>
                    <span className="material-symbols-outlined">undo</span>
                </button>
                <button type='button'>
                    <span className="material-symbols-outlined">redo</span>
                </button>
                <button 
                    type='button'
                    onClick={() => setIsLayoutModalActive(prev => !prev)}
                >
                    <span className={`material-symbols-outlined ${FillResumeNavbarStyle['navbar-icon']}`}>dashboard_customize</span>
                    <span className="hidden md:block text-1xl font-bold">Layout</span>
                </button>
                <button type='button'>
                    <span className={`material-symbols-outlined ${FillResumeNavbarStyle['navbar-icon']}`}>compare_arrows</span>
                    <span className="hidden md:block text-1xl font-bold">Templates</span>
                </button>
                <button type='button'>
                    <span className={`material-symbols-outlined ${FillResumeNavbarStyle['navbar-icon']}`}>settings</span>
                    <span className="hidden md:block text-1xl font-bold">Format</span>
                </button>
            </div>

            <button 
                type="button" 
                onClick={downloadCV}
                className='w-max bg-main-color text-white-color gap-2 p-2 rounded-full lg:px-5'
            >
                <span className="material-symbols-outlined">download</span>
                <span className="hidden lg:block text-1xl font-bold">Download CV</span>
            </button>

            {
                !isLayoutModalActive && <EditTemplateLayout setIsLayoutModalActive={setIsLayoutModalActive} />
            }
        </nav>
    );
}

export default FillResumeNavbar;