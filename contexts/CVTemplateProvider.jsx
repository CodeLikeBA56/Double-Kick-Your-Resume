"use client";
import templateColors from "@/constants/Templates.js";
import { createContext, useContext, useState } from "react";
import Template1 from "@/components/CVTemplates/Template-1/Template1.jsx";

const TemplateContext = createContext();

const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState([
    { _id: 0, name: "Modern Resume Template", 
      themes: templateColors, component: <Template1 /> },
  ]);

  return (
    <TemplateContext.Provider value={{ templates }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => useContext(TemplateContext);

export default TemplateProvider;