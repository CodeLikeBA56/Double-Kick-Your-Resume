"use client";
import { db } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { deepEqual } from "@/hooks/deepEqual";
import { DebouncedFn } from "@/hooks/DebouncedFn";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { createContext, useCallback, useContext, useEffect, useState, useRef } from "react";
import axiosInstance from "@/lib/axios";

const saveUserInfo = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    })
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

const saveUserInfoToDB = DebouncedFn(saveUserInfo, 3000);
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const prevState = useRef(null);

    const [userInfo, setUserInfo] = useState(() => {
        try {
            const user = JSON.parse(localStorage.getItem("userInfo") ?? []);
            prevState.current = user.length ? user : null;
            return prevState.current;
        } catch (error) {
            return null;
        }
    });

  useEffect(() => {
    if (userInfo && !deepEqual(prevState, userInfo)) {
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        saveUserInfoToDB(userInfo);
        prevState.current = userInfo;
    }
  }, [userInfo]);

  const logout = async () => {
      try {
        signOut(auth);
        const res = await axiosInstance.post("/api/auth/logout");
        const { type, message } = res.data;
        alert(message);
    } catch (error) {
        const { type, message } = error.res.data;
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        userInfo, setUserInfo, logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;