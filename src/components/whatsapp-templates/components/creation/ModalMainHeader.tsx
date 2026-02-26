import React from "react";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";

export function ModalMainHeader() {
  const icons = useSupabaseIcons();
  return (
    <div className="flex items-center gap-[1.6rem] p-[2.4rem] pb-[1.6rem] border-b border-border bg-primary z-[21]">
      <div className="w-[4.8rem] h-[4.8rem] rounded-[1rem] border border-solid-green flex items-center justify-center shrink-0">
        <ImageComponent
          src={icons.whatsappIcon}
          alt="WhatsApp"
          width={24}
          height={24}
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-[2rem] lg:text-[2.4rem] font-bold text-text-secondary leading-tight">
          WhatsApp templates
        </h2>
        <p className="text-[1.4rem] text-text-primary">
          Create a custom Webchat for a website of your choice.{" "}
          <span className="underline text-brand-primary font-medium cursor-pointer">
            Learn more
          </span>
        </p>
      </div>
    </div>
  );
}
