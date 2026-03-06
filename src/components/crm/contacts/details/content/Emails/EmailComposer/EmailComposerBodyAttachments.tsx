"use client";

import React, { useEffect } from "react";
import { EmailDraft } from "../../types";

interface EmailComposerBodyAttachmentsProps {
  body: string;
  attachments: string[];
  editorRef: React.RefObject<HTMLDivElement | null>;
  handleEditorChange: () => void;
  onUpdate: (updates: Partial<EmailDraft>) => void;
  onRemoveAttachment: (name: string) => void;
  triggerFileSelect: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileIcon: string;
  closeIcon: string;
  currentLinkUrl: string | null;
  handleEditorClick: (e: React.MouseEvent) => void;
}

export default function EmailComposerBodyAttachments({
  body,
  editorRef,
  handleEditorChange,
  currentLinkUrl,
  handleEditorClick,
}: EmailComposerBodyAttachmentsProps) {
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && body) {
      editorRef.current.innerHTML = body;
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0 relative">
      <div
        contentEditable
        ref={editorRef}
        onInput={handleEditorChange}
        onClick={handleEditorClick}
        className="flex-1 outline-none text-[1.4rem] sm:text-[1.5rem] leading-relaxed text-dark-base-70 px-[1.6rem] py-[2.4rem] sm:p-[2.4rem] min-h-[20rem] sm:min-h-[30rem] bg-transparent no-scrollbar overflow-y-auto focus:outline-none [&_a]:text-blue-500 [&_a]:underline"
      />

      {currentLinkUrl && (
        <div className="absolute bottom-[2rem] left-[2.4rem] bg-dark-base-100 text-primary rounded-[1rem] shadow-xl px-[1.2rem] py-[0.6rem] text-[1.2rem] flex items-center gap-[0.8rem] animate-in fade-in slide-in-from-bottom-2 z-50">
          <span className="opacity-60">Link:</span>
          <a
            href={currentLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-blue-50 hover:underline font-medium"
          >
            {currentLinkUrl}
          </a>
        </div>
      )}
    </div>
  );
}
