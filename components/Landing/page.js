'use client'
import React from "react";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center h-[calc(100vh-80px)] pb-12 border-b">
      <h1 className="py-12 text-6xl text-main-color font-extrabold">Double Kick your Resume</h1>
      <button type='button' className="w-max px-9 py-7 mt-auto rounded-full text-[1.2rem] font-bold text-white-color bg-main-color">Get Started</button>
    </div>
  );
};

export default Welcome;