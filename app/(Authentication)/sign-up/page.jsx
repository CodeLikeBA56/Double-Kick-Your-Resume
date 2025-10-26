"use client";
import axios from 'axios';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import React, { useState } from 'react';
import styles from '../auth.module.css';
import Navigation from '../../../components/Navigation';
import { useNotification } from '@/contexts/NotificationProvider';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

const SignUp = () => {
  const { pushNotification } = useNotification();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      pushNotification("warning", "Please fill in all fields.");
      return;
    }
    
    if (password !== confirmPassword) {
      pushNotification("warning", "Passwords do not match.");
      return;
    }

    if (password.length < 7) {
      pushNotification("Password must be at least 7 characters long.");
      return;
    }

    setIsLoading(true);
    const body = { email, username, password };

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      body.uid = user.uid;

      const response = await axios.post('/api/auth/register', body);
      
      if (200 === response.status) {
        await sendEmailVerification(user, { 
          handleCodeInApp: true,
          url: `${process.env.NEXT_PUBLIC_API_URL}sign-in/?email=${encodeURIComponent(user.email)}`, 
        });

        const { type, message } = response.data;

        pushNotification(type, message);
        // pushNotification("info", "Email verification link has been sent to your mail.");
        
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            pushNotification("error", "This email is already in use.");
            break;
          case "auth/invalid-email":
            pushNotification("error", "Please provide a valid email.");
            break;
          case "auth/weak-password":
            pushNotification("error", "The password must be 7 characters long.");
            break;
          case "auth/operation-not-allowed":
            pushNotification("error", "This operation is not allowed.");
            break;
          case "auth/network-request-failed":
            pushNotification("error", "Please check your internet connection.");
            break;
          case "auth/too-many-requests":
            pushNotification("error", "Too many attempts. Please try again later.");
            break;
          default:
            pushNotification("error", "An unexpected error occurred. Please try again later.");
            break;
        }
      } else {
        pushNotification("error", error.response?.data?.message || "An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='w-screen h-screen relative'>
      <Navigation />
      <form className={`${styles.form} mt-20`} onSubmit={handleRegisterUser}>
        <header className={styles.header}>Create an account</header>

        {/* Username */}
        <div className={styles.field}>
          <label>Username</label>

          <div className='icon-field'>
            <input
              required
              type="text"
              value={username}
              placeholder='John Doe'
              className='form-input'
              onChange={e => setUsername(e.target.value)}
            />

            <span className='material-symbols-outlined input-validity-check'>check</span>
          </div>
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label>Email</label>

          <div className='icon-field'>
            <input
              required
              type="email"
              placeholder='123@example.com'
              value={email}
              className='form-input'
              onChange={e => setEmail(e.target.value)}
            />
            <span className='material-symbols-outlined input-validity-check'>check</span>
          </div>
        </div>

        {/* Password */}
        <div className={styles.field}>
          <label>Password</label>
          
          <div className='icon-field'>
            <input
              required
              minLength={7}
              value={password}
              className='form-input'
              type={showPassword ? "text" : "password"}
              onChange={e => setPassword(e.target.value)}
            />

            <button type='button' className={styles['show-pass-btn']} onClick={() => setShowPassword(!showPassword)}>
              <span className="material-symbols-outlined">{showPassword ? "visibility" : "visibility_off"}</span>
            </button>

            <span className='material-symbols-outlined input-validity-check'>check</span>
          </div>

        </div>

        {/* Confirm Password */}
        <div className={styles.field}>
          <label>Confirm Password</label>

          <div className='icon-field'>
            <input
              required
              minLength={7}
              className='form-input'
              value={confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              onChange={e => setConfirmPassword(e.target.value)}
            />


            <button type='button' className={styles['show-pass-btn']} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              <span className="material-symbols-outlined">{showConfirmPassword ? "visibility" : "visibility_off"}</span>
            </button>
            
            {
              password === confirmPassword &&
              <span className='material-symbols-outlined input-validity-check'>check</span>
            }
          </div>

          <p className='show-error'>
            {password && password.length < 7 && "Password must be at least 7 characters long."}
            {password.length > 6 && password.trim() && confirmPassword.trim() && password !== confirmPassword &&
              "Both Password and confirm password should match."}
          </p>
        </div>

        {/* Submit */}
        <button type="submit" className={styles["sign-up-btn"]} disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</button>
        <Link className={styles['sign-in-form-link']} href="/sign-in">Already have an account? Sign-in</Link>
      </form>
    </div>
  );
};

export default SignUp;