"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {

  const handleToggleTheme = () => {
    document.body.classList.toggle("dark-mode")
  }

  return (
    <nav className="w-full h-20 flex items-center px-10 border-b border-border-color">
      <div className='gap-2 flex items-center text-main-color' title='Double Kick Your Resume'>
        <span className="material-symbols-outlined logo">sports_gymnastics</span>
        <span className="text-2xl font-bold">Resume</span>
      </div>

      <ul className="flex gap-5 ml-auto">
        <li><ActiveLink href="/">Welcome</ActiveLink></li>
        <li><ActiveLink href="/sign-in">Sign-in</ActiveLink></li>
        <li><ActiveLink href="/sign-up">Sign-up</ActiveLink></li>
      </ul>

      <button type="button" className='ml-5 rounded-full'>
        <span className="material-symbols-outlined" onClick={handleToggleTheme}>dark_mode</span>
      </button>
    </nav>
  );
};

function ActiveLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={isActive ? "underline font-bold" : ""}
    >
      {children}
    </Link>
  );
}

export default Navigation;