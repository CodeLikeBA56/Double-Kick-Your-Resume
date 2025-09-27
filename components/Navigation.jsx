"use client"
import React from 'react';
import Link from 'next/link';

const Navigation = () => {

  const handleToggleTheme = () => {
    document.body.classList.toggle("dark-mode")
  }

  return (
    <nav className="w-full h-20 flex items-center px-10 border-b border-text-color">
      <div className='gap-2 flex items-center text-main-color' title='Double Kick Your Resume'>
        <span className="material-symbols-outlined logo">sports_gymnastics</span>
        <span className="text-2xl font-bold">Resume</span>
      </div>

      <ul className="flex gap-5 ml-auto">
        <li><Link href="/">Welcome</Link></li>
        <li><Link href="/sign-in">Sign-in</Link></li>
        <li><Link href="/sign-up">Sign-up</Link></li>
      </ul>

      <button type="button" className='ml-5 rounded-full'>
        <span className="material-symbols-outlined" onClick={handleToggleTheme}>dark_mode</span>
      </button>
    </nav>
  );
};

export default Navigation;