import React, { useRef } from "react";
import { TemplateFormData, HandleChange } from "../../types";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { SmartDropdown } from "../../../smart-dropdown";

const DUMMY_CATEGORIES = [
  "Marketing",
  "Utility",
  "Authentication",
  "Real Estate",
  "Hospitality",
];

interface CategorySelectionProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
  activeDropdown: string | null;
  toggleDropdown: (name: string) => void;
  setActiveDropdown: (name: string | null) => void;
}

export default function CategorySelection({
  formData,
  handleChange,
  activeDropdown,
  toggleDropdown,
  setActiveDropdown,
}: CategorySelectionProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons() as { gridDropdown: string };

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        Template category
      </label>
      <div className="relative">
        <button
          ref={triggerRef}
          onClick={() => toggleDropdown("category")}
          className="w-full h-[4.2rem] flex items-center justify-between px-[1.2rem] bg-primary border border-input-stroke rounded-[0.8rem] text-left"
        >
          <span className="text-[1.4rem] text-text-secondary font-medium">
            {formData.category || "Real Estate"}
          </span>
          <ImageComponent
            src={icons.gridDropdown}
            alt="v"
            width={16}
            height={16}
          />
        </button>
        <SmartDropdown
          isOpen={activeDropdown === "category"}
          onClose={() => setActiveDropdown(null)}
          triggerRef={triggerRef}
        >
          {DUMMY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                handleChange("category", cat);
                setActiveDropdown(null);
              }}
              className="w-full px-[1.2rem] py-[0.8rem] text-left text-[1.4rem] hover:bg-input-filled/50 font-medium text-text-secondary"
            >
              {cat}
            </button>
          ))}
        </SmartDropdown>
      </div>
      <p className="text-[1.2rem] text-text-primary">
        Need help picking a category? Click{" "}
        <span className="text-brand-primary font-bold underline cursor-pointer">
          here
        </span>
      </p>
    </div>
  );
}
