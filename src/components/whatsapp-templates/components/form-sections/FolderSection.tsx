import React, { useRef } from "react";
import { TemplateFormData, HandleChange } from "../../types";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { SmartDropdown } from "../../../smart-dropdown";

const DUMMY_FOLDERS = ["General", "Sales", "Support", "Marketing"];

interface FolderSectionProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  setActiveDropdown: (name: string | null) => void;
}

export default function FolderSection({
  formData,
  handleChange,
  activeDropdown,
  toggleDropdown,
  setActiveDropdown,
}: FolderSectionProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons() as { gridDropdown: string };

  return (
    <div className="flex flex-col gap-[0.8rem] p-[2.4rem] pb-[2.4rem] bg-input-filled border border-input-stroke rounded-[0.8rem]">
      <div className="flex flex-col gap-[0.4rem]">
        <label className="text-[1.6rem] font-bold text-text-secondary leading-tight">
          Select folder
        </label>
        <p className="text-[1.2rem] text-text-primary font-medium">
          Select folder where template will be saved
        </p>
      </div>
      <div className="relative mt-[0.8rem]">
        <button
          ref={triggerRef}
          onClick={() => toggleDropdown("folder")}
          className="w-full h-[4.2rem] flex items-center justify-between px-[1.2rem] bg-primary border border-input-stroke rounded-[0.8rem] text-left"
        >
          <span className="text-[1.4rem] text-text-secondary font-medium">
            {formData.folder || "General"}
          </span>
          <ImageComponent
            src={icons.gridDropdown}
            alt="v"
            width={16}
            height={16}
          />
        </button>
        <SmartDropdown
          isOpen={activeDropdown === "folder"}
          onClose={() => setActiveDropdown(null)}
          triggerRef={triggerRef}
        >
          {DUMMY_FOLDERS.map((folder) => (
            <button
              key={folder}
              onClick={() => {
                handleChange("folder", folder);
                setActiveDropdown(null);
              }}
              className="w-full px-[1.2rem] py-[0.8rem] text-left text-[1.4rem] hover:bg-input-filled/50 font-medium text-text-secondary"
            >
              {folder}
            </button>
          ))}
        </SmartDropdown>
      </div>
    </div>
  );
}
