"use client"
import React, { useState } from 'react';
import style from "@/app/fill-resume/fill-resume.module.css"
import { useUserProfile } from '@/contexts/UserProfileProvider';

const UpdateDocumentName = () => {
    const { documentName, setDocumentName } = useUserProfile();

    const [isEditingDocName, setIsEditingDocName] = useState(false);
    
    const handleEditDocumentName = () => setIsEditingDocName(true);

    return (
        <div className='gap-1 flex items-center'>
            <span className='font-semibold'>Document:</span>
            {
              !isEditingDocName && 
              <button type='button' className='flex' onClick={handleEditDocumentName}>
                <span>{`${isEditingDocName ? "" : documentName}`}</span>
              </button>
            }
            {
              !isEditingDocName && 
              <button type='button' className='ml-auto' onClick={handleEditDocumentName}>
                <span className={`material-symbols-outlined ${style['edit-document-icon']}`}>edit</span>
                <span className="">Edit</span>
              </button>
            }

            {
              isEditingDocName &&
              <input
                type='text'
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                className=''
              />
            }
            {
              isEditingDocName && <button type='button' className='ml-auto' onClick={() => setIsEditingDocName(false)}>Save</button>
            }
        </div>
    );
}

export default UpdateDocumentName;