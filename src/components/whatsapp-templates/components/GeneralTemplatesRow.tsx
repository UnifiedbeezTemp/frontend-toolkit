import React from "react";
import CheckBox from "../../ui/CheckBox";
import FileIcon from "../../../assets/icons/FileIcon";
import { cn } from "../../../lib/utils";
import MoreHorizontalIcon from "../../../assets/icons/MoreHorizontalIcon";

interface GeneralTemplate {
  id: string;
  name: string;
  category: string;
  language: string;
  status: "Approved" | "Pending" | "Rejected";
}

interface GeneralTemplatesRowProps {
  template: GeneralTemplate;
  isSelected: boolean;
  onToggle: (id: string) => void;
  onDelete: () => void;
}

export default function GeneralTemplatesRow({
  template,
  isSelected,
  onToggle,
}: GeneralTemplatesRowProps) {
  return (
    <div className="grid grid-cols-[auto_2fr_1fr_1fr_auto] items-center gap-[1.6rem] px-[2.4rem] py-[1.2rem] border-b border-border hover:bg-black-5 transition-colors">
      <CheckBox checked={isSelected} onChange={() => onToggle(template.id)} />

      <div className="flex items-center gap-[1.2rem]">
        <div className="w-[3.2rem] h-[3.2rem] flex items-center justify-center rounded-[0.6rem] bg-black-5 text-gray-400">
          <FileIcon size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-[1.4rem] font-bold text-text-secondary">
            {template.name}
          </span>
          <span className="text-[1.1rem] text-gray-500">
            {template.category}
          </span>
        </div>
      </div>

      <div className="text-[1.3rem] text-text-primary">{template.language}</div>

      <div className="flex items-center gap-[0.6rem]">
        <div
          className={cn(
            "w-[0.8rem] h-[0.8rem] rounded-full",
            template.status === "Approved"
              ? "bg-green-500"
              : template.status === "Pending"
                ? "bg-orange-400"
                : "bg-red-500",
          )}
        />
        <span
          className={cn(
            "text-[1.3rem] font-medium",
            template.status === "Approved"
              ? "text-green-600"
              : template.status === "Pending"
                ? "text-orange-600"
                : "text-red-600",
          )}
        >
          {template.status}
        </span>
      </div>

      <div className="flex justify-center w-[6rem]">
        <button className="p-[0.8rem] text-gray-400 hover:text-text-primary hover:bg-black-5 rounded-[0.6rem]">
          <MoreHorizontalIcon size={18} />
        </button>
      </div>
    </div>
  );
}
