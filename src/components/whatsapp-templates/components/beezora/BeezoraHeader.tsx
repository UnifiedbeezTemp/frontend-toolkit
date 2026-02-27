import ImageComponent from "next/image";
import React from "react";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import CloseModalButton from "../../../modal/CloseModalButton";

interface BeezoraHeaderProps {
  onClose: () => void;
}

export function BeezoraHeader({ onClose }: BeezoraHeaderProps) {
  const icons = useSupabaseIcons() as { whatsappIcon: string };

  return (
    <div className="flex items-start justify-between mb-[2.4rem]">
      <div className="flex items-center gap-[1.6rem]">
        <div className="w-[4.8rem] h-[4.8rem] rounded-[1.2rem] border border-solid-green flex items-center justify-center shrink-0">
          <ImageComponent
            src={icons.whatsappIcon}
            alt="WhatsApp"
            width={24}
            height={24}
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[2rem] font-bold text-text-secondary leading-tight">
            Create WhatsApp templates
          </h2>
          <p className="text-[1.4rem] text-text-primary">
            Let Beezora create a template based on your preference.
          </p>
        </div>
      </div>
      <CloseModalButton onClick={onClose} />
    </div>
  );
}
