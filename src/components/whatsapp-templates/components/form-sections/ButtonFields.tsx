import React from "react";
import { cn } from "@/shared/src/lib/utils";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";

interface ButtonHeaderProps {
  index: number;
  onRemove: () => void;
}

export const ButtonHeader = ({ index, onRemove }: ButtonHeaderProps) => {
  const icons = useSupabaseIcons() as { trashGray: string };
  return (
    <div className="flex items-center justify-between">
      <span className="text-[1.4rem] font-bold text-text-secondary">
        Button {index + 1}
      </span>
      {index > 0 && (
        <button
          onClick={onRemove}
          className="p-[0.4rem] hover:bg-black-5 rounded-[0.4rem] transition-colors"
        >
          <ImageComponent
            src={icons.trashGray}
            alt="remove"
            width={16}
            height={16}
          />
        </button>
      )}
    </div>
  );
};

interface ButtonActionInputProps {
  type: string;
  url?: string;
  phone?: string;
  updateButton: (field: string, value: string) => void;
  InputComponent: React.ComponentType<any>;
}

export const ButtonActionInput = ({
  type,
  url,
  phone,
  updateButton,
  InputComponent,
}: ButtonActionInputProps) => {
  if (type === "Quick reply") return null;

  const isUrl = type === "URL";
  const label = isUrl ? "URL" : "Phone number";
  const placeholder = isUrl ? "https://example.com" : "+1 234 567 890";
  const value = isUrl ? url : phone;
  const field = isUrl ? "url" : "phone";

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.3rem] font-bold text-text-secondary">
        {label}
      </label>
      <InputComponent
        placeholder={placeholder}
        value={value || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          updateButton(field, e.target.value)
        }
        className="rounded-[0.8rem] border-input-stroke h-[4.2rem]"
      />
    </div>
  );
};
