"use client"
import React from 'react';
import style from "./fill-resume.module.css";
import { useUserProfile } from '@/contexts/UserProfileProvider';
import FillResumeNavbar from '@/components/Navbar/FillResumeNavbar';
import UpdateDocumentName from '@/components/UpdateDocumentName/UpdateDocumentName';
import UpdatePersonalInformation from '@/components/UpdatePersonalInformation/UpdatePersonalInformation';
import Accordion from '@/components/Accordion/Accordion';
import Template1 from '@/components/CVTemplates/Template-1/Template1';
import { useTemplate } from '@/contexts/CVTemplateProvider';
import { useCV } from '@/contexts/CVProvider';

const sectionComponents = {
  "Personal Info": <UpdatePersonalInformation />,
  "Skills": <div />,
  "Technical Skills": <div type="technical" />,
  "Soft Skills": <div type="soft" />,
  "Education": <div />,
  "Work Experience": <div />,
  "Projects": <div />,
  "Certificates": <div />,
  "Interests": <div />,
};

const FillResume = () => {
  const { templates } = useTemplate();
  const { selectedTemplate, targetContent } = useCV();
  const { includedSections } = useUserProfile();

  return (
    <div className='w-screen h-screen'>
      <FillResumeNavbar />

      <main className='lg:h-[calc(100vh-80px)] gap-3 grid grid-cols-1 lg:gap-0 xl:gap-10 lg:grid-cols-[1fr_630px] xl:grid-cols-[1fr_830px] px-5'>
        {/* Left Column - Editor */}
        <div className='h-fit lg:h-[calc(100vh-80px)] gap-3 lg:gap-5 grid grid-cols-1 auto-rows-min md:py-3 lg:pr-5 md:overflow-y-auto'>
          <UpdateDocumentName />
          {includedSections.map((section, index) => (
            <Accordion
              key={index}
              id={section}
              title={section}
              children={sectionComponents[section] || <p>Section not found</p>}
            />
          ))}
        </div>

        {/* Right Column - Preview */}
        <div className='max-h-fit lg:h-[calc(100vh-80px)] xl:w-[804px] gap-3 grid grid-cols-1 overflow-y-auto py-5 sm:py-0 lg:py-5 sm:mb-5'>
          <h1 className='sm:px-0 text-2xl font-extrabold'>Preview (A4 Size Paper)</h1>
          <div
            ref={targetContent}
            id='cv-preview'
            className='
              h-[296.8mm] w-[210mm] bg-white border border-shadow-color shadow-md 
              gap-5 flex flex-col
            '
              // scale-40 sm:scale-75 md:scale-70 lg:scale-70 xl:scale-100 origin-top-left
          >
            { selectedTemplate }
          </div>
        </div>
      </main>
    </div>
  );
}

export default FillResume;