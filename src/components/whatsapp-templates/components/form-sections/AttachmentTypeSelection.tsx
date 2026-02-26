import React from "react";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import { SelectionCard } from "./FormSubComponents";
import { TemplateFormData, HandleChange } from "../../types";

interface AttachmentTypeSelectionProps {
  formData: TemplateFormData;
  handleChange: HandleChange;
}

export default function AttachmentTypeSelection({
  formData,
  handleChange,
}: AttachmentTypeSelectionProps) {
  const icons = useSupabaseIcons() as {
    camera: string;
    video: string;
    document: string;
  };

  const types = [
    { id: "image", label: "Image", icon: icons.camera },
    { id: "video", label: "Video", icon: icons.video },
    { id: "document", label: "Document", icon: icons.document },
  ];

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <label className="text-[1.4rem] font-bold text-text-secondary">
        Attachment type
      </label>
      <div className="flex items-center gap-[1.2rem]">
        {types.map((type) => (
          <SelectionCard
            key={type.id}
            label={type.label}
            active={formData.attachmentType === type.id}
            onClick={() => handleChange("attachmentType", type.id as any)}
            icon={
              <ImageComponent
                src={type.icon}
                alt={type.label}
                width={20}
                height={20}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
