import React from "react";
import { cn } from "@/shared/src/lib/utils";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { useSupabaseImages } from "@/shared/src/lib/supabase/useSupabase";
import { TemplateFormData } from "../../types";
import { PhoneStatusBar } from "./PhoneStatusBar";
import { ChatHeader } from "./ChatHeader";
import { TodayPill } from "./TodayPill";
import { MessageBubble } from "./MessageBubble";
import { ButtonsList } from "./ButtonsList";

interface PhoneFrameProps {
  formData: TemplateFormData;
  contentScale?: number;
  isThumbnail?: boolean;
}

export function PhoneFrame({
  formData,
  contentScale = 1,
  isThumbnail = false,
}: PhoneFrameProps) {
  const images = useSupabaseImages();
  const hasContent =
    formData.message || formData.hasAttachment || formData.hasFooter;

  return (
    <>
      <div className="absolute inset-0 z-20 pointer-events-none">
        <ImageComponent
          src={images.phoneFrame}
          alt="phone"
          width={1920}
          height={1080}
          className="object-contain"
        />
      </div>

      <div className="absolute inset-[0.8rem] top-[0.8rem] bottom-[0.8rem] bg-primary rounded-[3rem] lg:rounded-[3rem] overflow-hidden z-10 flex flex-col">
        <div
          style={{
            width: `${(100 / contentScale).toFixed(4)}%`,
            height: `${(100 / contentScale).toFixed(4)}%`,
            transform: `scale(${contentScale})`,
            transformOrigin: "top left",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PhoneStatusBar isThumbnail={isThumbnail} />
          <ChatHeader beeImg={images.beeImg} isThumbnail={isThumbnail} />

          <div
            className={cn(
              "flex-1 relative overflow-hidden px-[2.4rem] flex flex-col items-center rounded-b-[3.2rem]",
              isThumbnail ? "py-[0.6rem]" : "py-[1.2rem]",
            )}
          >
            <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[3.2rem]">
              <ImageComponent
                src={images.whatsappLayer}
                alt="whatsapp-bg"
                width={400}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-[1] w-full flex flex-col items-center">
              <TodayPill isThumbnail={isThumbnail} />

              {hasContent && (
                <MessageBubble formData={formData} isThumbnail={isThumbnail} />
              )}

              {formData.hasButton && formData.buttons.length > 0 && (
                <ButtonsList
                  buttons={formData.buttons}
                  isThumbnail={isThumbnail}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
