'use client'
import React, { useState, useEffect } from "react";

const Welcome = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDummyUsers = async () => {
      const data = await (await fetch('https://dummyjson.com/users')).json();
      setUsers(data.users);
    }

    fetchDummyUsers();
  }, []);
  return (
    <div className="flex flex-col items-center h-[calc(100vh-80px)] pb-12 border-b">
      <h1 className="py-12 text-6xl text-main-color font-extrabold">Double Kick your Resume</h1>
      <button type='button' className="w-max px-9 py-7 mt-auto rounded-full text-[1.2rem] font-bold text-white-color bg-main-color">Get Started</button>
      {/* { users.map(user => <span key={user.id}>{user.firstName}</span>) } */}
    </div>
  );
};

export default Welcome;