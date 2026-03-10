"use client";

import React from "react";
import ImageComponent from "../../../../../../ui/ImageComponent";

interface EmailComposerAttachmentRowProps {
  attachments: string[];
  onRemoveAttachment: (name: string) => void;
  triggerFileSelect: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileIcon: string;
  closeIcon: string;
}

export default function EmailComposerAttachmentRow({
  attachments,
  onRemoveAttachment,
  triggerFileSelect,
  fileInputRef,
  handleFileChange,
  fileIcon,
  closeIcon,
}: EmailComposerAttachmentRowProps) {
  return (
    <div className="flex flex-col gap-[1.2rem] py-[1.2rem] px-[1.6rem] sm:px-[2.4rem] shrink-0 w-full border-input-stroke">
      <div className="flex flex-wrap items-center gap-[1.2rem]">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={triggerFileSelect}
          className="flex items-center gap-[0.8rem] px-[1.2rem] py-[0.8rem] rounded-[1rem] bg-input-filled hover:bg-input-filled transition-colors"
        >
          <ImageComponent src={fileIcon} alt="attach" width={16} height={16} />
          <span className="text-[1.3rem]">Attach a file</span>
        </button>

        {attachments.map((file) => (
          <div
            key={file}
            className="flex items-center gap-[0.8rem] px-[1rem] py-[0.6rem] border border-input-stroke rounded-[1rem] bg-primary shadow-sm"
          >
            <span className="text-[1.2rem] font-bold text-dark-base-70">
              {file}
            </span>
            <button
              onClick={() => onRemoveAttachment(file)}
              className="p-[0.2rem] hover:opacity-60 transition-opacity"
            >
              <ImageComponent
                src={closeIcon}
                alt="remove"
                width={12}
                height={12}
                className="opacity-40"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
