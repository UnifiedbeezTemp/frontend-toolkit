"use client";

import React from "react";
import CheckBox from "@/shared/src/components/ui/CheckBox";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import WhatsAppTemplateIcon from "@/shared/src/assets/icons/WhatsAppTemplateIcon";
import { WhatsAppTemplate } from "../types";
import { cn } from "@/shared/src/lib/utils";

interface WhatsAppTemplatesRowProps {
  template: WhatsAppTemplate;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onDelete: () => void;
}

export default function WhatsAppTemplatesRow({
  template,
  isSelected,
  onToggle,
  onDelete,
}: WhatsAppTemplatesRowProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-[auto_2fr_1fr_1fr_auto] items-start sm:items-center gap-[1.2rem] sm:gap-[1.6rem] px-[1.6rem] sm:px-[2.4rem] py-[1.6rem] border-t border-border hover:bg-gray-50 transition-colors rounded-[1.2rem] sm:rounded-none lg:mx-0 mx-[1.6rem] sm:mx-0 border sm:border-0 sm:border-t mt-[1.2rem] sm:mt-0 shadow-sm sm:shadow-none">
      <div className="flex items-center gap-[1.2rem] w-full sm:contents">
        <CheckBox checked={isSelected} onChange={() => onToggle(template.id)} />

        <div className="flex-1 flex items-center gap-[1.2rem] min-w-0 sm:contents">
          <div className="flex items-start gap-[1.2rem]">
            <div className="w-[3.2rem] h-[3.2rem] bg-gray-100 rounded-[0.6rem] flex items-center justify-center shrink-0">
              <WhatsAppTemplateIcon size={18} className="text-gray-500" />
            </div>
            <div className="flex flex-col gap-[0.2rem]">
              <span className="text-[1.4rem] text-gray-900 font-medium truncate">
                {template.name}
              </span>
              <span className="text-[1.2rem] text-gray-500">
                {template.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full pl-[3.2rem] sm:contents">
        <div className="text-[1.3rem] sm:text-[1.4rem] text-gray-500 sm:text-gray-600 font-medium">
          {template.language}
        </div>

        <div className="flex items-center gap-[0.6rem]">
          <div
            className={cn(
              "w-[0.6rem] h-[0.6rem] rounded-full",
              template.status === "Approved"
                ? "bg-green-500"
                : template.status === "Pending"
                  ? "bg-yellow-500"
                  : "bg-red-500",
            )}
          />
          <span
            className={cn(
              "text-[1.3rem] font-medium",
              template.status === "Approved"
                ? "text-green-600"
                : template.status === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600",
            )}
          >
            {template.status}
          </span>
        </div>

        <div className="flex items-center gap-[0.8rem] ml-auto sm:ml-0">
          <button className="p-[0.8rem] text-gray-400 hover:text-gray-600 transition-colors">
            <ImageComponent
              src={icons.editPen}
              alt="edit"
              width={16}
              height={16}
            />
          </button>
          <button
            className="p-[0.8rem] text-gray-400 hover:text-destructive transition-colors"
            onClick={onDelete}
          >
            <ImageComponent
              src={icons.trashRed}
              alt="delete"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
