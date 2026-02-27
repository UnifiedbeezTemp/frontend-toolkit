import React from "react";
import Button from "@/shared/src/components/ui/Button";
import { PhoneFrame } from "./TemplatePreview";
import { TemplateFormData } from "../types";
import { useSupabaseImages } from "@/shared/src/lib/supabase/useSupabase";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";

import CheckMarkIcon from "@/shared/src/assets/icons/CheckMarkIcon";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  formData: TemplateFormData;
  onUse: (formData: TemplateFormData) => void;
}

const FeatureBenefit = ({ text }: { text: string }) => (
  <div className="flex items-start gap-[0.8rem]">
    <div className="w-[1.6rem] h-[1.6rem] rounded-full bg-[#1F4D25] flex items-center justify-center shrink-0 mt-[0.2rem]">
      <CheckMarkIcon size={10} height={8} color="white" />
    </div>
    <span className="text-[1.2rem] text-text-primary leading-tight font-medium">
      {text}
    </span>
  </div>
);

export default function TemplateCard({
  title,
  description,
  category,
  formData,
  onUse,
}: TemplateCardProps) {
  const supabaseImages = useSupabaseImages();

  return (
    <div className="flex flex-col bg-primary rounded-[1.2rem] sm:rounded-[1.6rem] border border-border p-[1.6rem] h-full hover:shadow-sm transition-shadow">
      {/* Top Section: Phone and Main Info */}
      <div className="flex flex-col sm:flex-row lg:flex-col sm:gap-[1.6rem] lg:gap-[2.4rem]">
        {/* Phone Preview Container - Anchored and Clipped */}
        <div
          className="w-full sm:w-[12rem] lg:w-full h-[18rem] sm:h-[14rem] lg:h-[20rem] relative rounded-[0.8rem] sm:rounded-[1.2rem] lg:rounded-[1.6rem] overflow-hidden shrink-0"
          style={{
            background:
              "linear-gradient(155deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)",
          }}
        >
          <div className="absolute inset-0 z-0 text-white/10 flex items-center justify-center">
            <ImageComponent
              src={supabaseImages.bgImage}
              alt="bg"
              width={400}
              height={500}
              className="w-full h-full object-cover opacity-50 mix-blend-overlay"
            />
          </div>

          <div className="absolute top-[0.8rem] left-0 right-0 flex justify-center overflow-hidden z-[1]">
            <div className="origin-top scale-[0.8] sm:scale-[0.65] lg:scale-[1.0] w-[70%] h-[68rem] relative">
              <PhoneFrame
                formData={formData}
                contentScale={0.84}
                isThumbnail={true}
              />
            </div>
          </div>
        </div>

        {/* Content Block */}
        <div className="flex flex-col flex-1 sm:justify-start lg:justify-start lg:pl-0 lg:pr-0 mt-[1.6rem] sm:mt-0 lg:mt-0">
          {/* Category Badge */}
          <div className="mb-[0.8rem] sm:mb-[0.6rem] lg:mb-[1.8rem]">
            <span className="inline-block px-[1.2rem] py-[0.6rem] rounded-full border border-border text-[1rem] text-text-primary font-[700]">
              {category}
            </span>
          </div>

          <h4 className="text-[1.8rem] sm:text-[1.4rem] lg:text-[2rem] font-extrabold text-text-primary leading-tight mb-[0.6rem] sm:mb-[0.4rem] lg:mb-[1.2rem]">
            {title}
          </h4>
          <p className="text-[1.4rem] sm:text-[1.1rem] lg:text-[1.2rem] text-text-primary leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Benefits and Button Section */}
      <div className="flex flex-col gap-[1.6rem] lg:gap-[2.4rem] mt-auto pt-[2.4rem]">
        {/* Benefits Hidden on Desktop per design */}
        <div className="flex flex-col gap-[0.8rem] lg:hidden">
          <FeatureBenefit text="Increase response rates with personalization" />
          <FeatureBenefit text="Save time on routine follow-ups" />
        </div>

        <div className="flex">
          <Button
            variant="secondary"
            className="w-full lg:hidden px-[1.6rem] justify-center border-input-stroke rounded-[1rem] h-[4.2rem] text-[1.4rem] text-text-secondary font-bold hover:bg-black-5"
            onClick={() => onUse(formData)}
          >
            Select template
          </Button>
          <Button
            variant="primary"
            className="hidden lg:flex grad-btn"
            onClick={() => onUse(formData)}
          >
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );
}
