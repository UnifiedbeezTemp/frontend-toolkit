import ImageComponent from "next/image";
import React from "react";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

interface ModalSubHeaderProps {
  onBack: () => void;
}

export function ModalSubHeader({ onBack }: ModalSubHeaderProps) {
  const icons = useSupabaseIcons();
  return (
    <div className="px-[2.4rem] pt-[2.4rem] bg-primary">
      <div className="flex items-center gap-[1.2rem] mb-[2.4rem]">
        <button
          onClick={onBack}
          className="w-[3.2rem] h-[3.2rem] flex items-center justify-center rounded-[0.8rem] border border-border hover:bg-black-5 shrink-0"
        >
          <ImageComponent
            src={icons.arrowLeft}
            alt="back"
            width={16}
            height={16}
          />
        </button>
        <div className="flex flex-col">
          <h3 className="text-[1.6rem] font-bold text-text-secondary leading-tight">
            Create WhatsApp template
          </h3>
          <p className="text-[1.4rem] text-text-primary">
            Create personalized and interactive WhatsApp templates now.
          </p>
        </div>
      </div>
    </div>
  );
}
