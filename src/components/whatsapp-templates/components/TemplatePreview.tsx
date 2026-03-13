import React from "react";
import { TemplateFormData } from "../types";
import { PhoneFrame } from "./preview/PhoneFrame";
import { useSupabaseImages } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";

interface TemplatePreviewProps {
  formData: TemplateFormData;
}

export default function TemplatePreview({ formData }: TemplatePreviewProps) {
  const images = useSupabaseImages();

  return (
    <div className="flex flex-col w-full h-full overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <ImageComponent
          src={images.bgImage}
          alt="bg"
          width={1920}
          height={1080}
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex items-center justify-center relative z-[1]">
        <div className="relative w-[34rem] h-[68rem] shrink-0">
          <PhoneFrame formData={formData} />
        </div>
      </div>
    </div>
  );
}

export { PhoneFrame };
