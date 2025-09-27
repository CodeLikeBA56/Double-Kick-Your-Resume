"use client";
import { useTemplate } from "./CVTemplateProvider";
import { createContext, useContext, useState, useEffect, useRef } from "react";

const CVContext = createContext();

const CVProvider = ({ children }) => {
  const targetContent = useRef(null);
  const { templates } = useTemplate();

  const [selectedTheme, setSelectedTheme] = useState(templates[0].themes[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].component);

  useEffect(() => {
    if (selectedTheme) {
      Object.entries(selectedTheme).forEach(([key, value]) => {
        const variableName = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        document.documentElement.style.setProperty(variableName, value);
      });
  
      // Debug
      console.log("Current variables:", getComputedStyle(document.documentElement).cssText);
    }
  }, [selectedTheme]);
   

  return (
    <CVContext.Provider
      value={{
        setSelectedTemplate,
        selectedTemplate,
        setSelectedTheme,
        selectedTheme,
        targetContent,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => useContext(CVContext);

export default CVProvider;