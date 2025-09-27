"use client";

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

const saveUserInfo = async () => {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
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

const UserProfileContext = createContext();

const UserProfileProvider = ({ children }) => {

    const [documentName, setDocumentName] = useState("My Resume");

    const [userInfo, setUserInfo] = useState({
      username: "Sameer Shamshad",
      email: "sameershamshad.42@gmail.com",
      phone: "+92336-1786143",
      city: "Kamoke",
      address: "Muslim Gunj, Street Dr. Shabir near Masjid Usmania, House no 269",
      country: "Pakistan",
      title: "Full Stack MERN Developer",
      summary: "Full Stack MERN Developer passionate about building user-friendly UIs, efficient backend logic, and secure APIs, while continuously exploring new technologies. Always eager to learn, solve problems, and take on challenging projects.",
      socialLinks: {
        github: "github.com/CodeLikeBA56",
        linkedIn: "linkedin.com/in/sameer-shamshad",
      }
    });

    const [education, setEducation] = useState([
      {
        program: "BS Software Engineering",
        institution: "Gift University",
        location: "Gujranwala, Pakistan",
        startDate: { month: "01", year: "2022" },
        endDate: { month: "09", year: "2025" },
        isActive: false,
        Courses: ""
      },
      {
        program: "Intermediate FS.C Pre Engineering",
        institution: "Aspire Group of Colleges",
        location: "Kamoke, Pakistan",
        startDate: { month: "07", year: "2019" },
        endDate: { month: "07", year: "2021" },
        isActive: false,
        Courses: ""
      }
    ]);

    const [excludedSections, setExcludedSections] = useState(["Projects", "Certificates", "Interests"]);
    const [includedSections, setIncludedSections] = useState([
      "Personal Info", "Skills", "Technical Skills", "Soft Skills", "Education", "Work Experience",
    ]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cv-data");
    if (saved) {
      const parsed = JSON.parse(saved);
      setIncludedSections(parsed.includedSections || includedSections);
      setExcludedSections(parsed.excludedSections || excludedSections);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cv-data", JSON.stringify({ includedSections, excludedSections }));
  }, [includedSections, excludedSections]);

  return (
    <UserProfileContext.Provider
      value={{ 
        documentName, setDocumentName, userInfo, setUserInfo, education, 
        includedSections, setIncludedSections, excludedSections, setExcludedSections
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserProfileContext);

export default UserProfileProvider;