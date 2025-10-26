"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const handleToggleTheme = () => {
    document.body.classList.toggle("dark-mode")
  }

  return (
    <nav 
      className="w-screen h-15 sm:h-20 relative flex items-center px-4 sm:px-10 border-b border-border-color"
    >
      <div className='gap-2 flex items-center text-main-color' title='Double Kick Your Resume'>
        <span className="material-symbols-outlined logo">sports_gymnastics</span>
        <span className="text-1xl sm:text-2xl font-bold">Resume</span>
      </div>

      <ul className={`absolute ${toggleNavbar ? "flex" : "hidden"} right-0 top-[calc(100%+1px)] border-l border-b border-border-color 
          rounded-bl-2xl p-8 flex flex-col gap-4 bg-background sm:p-0 sm:bg-transparent sm:top-0 
          sm:relative sm:flex sm:flex-row sm:border-none sm:gap-8 sm:ml-auto`
        }
      >
        <li><ActiveLink href="/">Welcome</ActiveLink></li>
        <li><ActiveLink href="/sign-in">Sign-in</ActiveLink></li>
        <li><ActiveLink href="/sign-up">Sign-up</ActiveLink></li>
      </ul>

      <button 
        type="button" 
        onClick={handleToggleTheme}
        className='ml-auto sm:ml-5 rounded-full'
      >
        <span className="material-symbols-outlined">dark_mode</span>
      </button>

      <button
        type='button'
        onClick={() => setToggleNavbar(prev => !prev)}
        className='sm:hidden! rounded-full'
      >
        <span className="material-symbols-outlined">{toggleNavbar ? "menu_open" : "menu"}</span>
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