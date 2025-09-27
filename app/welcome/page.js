'use client'
import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import Navigation from '../../components/Navigation';

const About = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDummyUsers = async () => {
      const data = await (await fetch('https://dummyjson.com/users')).json();
      setUsers(data.users);
    }

    fetchDummyUsers();
  }, []);
  return (
    <div>
      <Navigation />
      <h1>AI-Powered SkillSwap Network</h1>
      <button type='button'>Get Started</button>

      {
        users.map(user => <span key={user.id}>{user.firstName}</span>)
      }
    </div>
  );
};

export default About;