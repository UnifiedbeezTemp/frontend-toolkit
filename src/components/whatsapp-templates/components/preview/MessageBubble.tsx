import React from "react";
import MessageTailIcon from "@/shared/src/assets/icons/MessageTailIcon";
import DoubleCheckIcon from "@/shared/src/assets/icons/DoubleCheckIcon";
import { getCurrentTime } from "@/shared/src/lib/utils";
import { TemplateFormData } from "../../types";
import { renderMessageWithVariables } from "../TemplatePreviewUtils";

interface MessageBubbleProps {
  formData: TemplateFormData;
  isThumbnail?: boolean;
}

import { cn } from "@/shared/src/lib/utils";

export function MessageBubble({
  formData,
  isThumbnail = false,
}: MessageBubbleProps) {
  return (
    <div className="w-full relative">
      <div className="w-full bg-primary rounded-[1.2rem] relative">
        <MessageTailIcon
          className="absolute bottom-0 -left-[.7rem] text-primary z-[100]"
          size={isThumbnail ? 12 : 25}
        />

        <div className={cn(isThumbnail ? "p-[0.6rem]" : "p-[1.4rem]")}>
          {formData.hasAttachment && (
            <div
              className={cn(
                "w-full aspect-video bg-black-5 rounded-[0.6rem] flex items-center justify-center border border-input-stroke",
                isThumbnail ? "mb-[0.6rem]" : "mb-[1rem]",
              )}
            >
              <span
                className={cn(
                  "text-text-primary",
                  isThumbnail ? "text-[0.6rem]" : "text-[1.1rem]",
                )}
              >
                Attachment
              </span>
            </div>
          )}

          {formData.message && (
            <div
              className={cn(
                "text-text-primary whitespace-pre-wrap",
                isThumbnail ? "text-[0.8rem]" : "text-[1.6rem]",
              )}
            >
              {renderMessageWithVariables(formData.message)}
            </div>
          )}

          {formData.hasFooter && (
            <div
              className={cn(
                "text-text-primary",
                isThumbnail
                  ? "mt-[0.3rem] text-[0.6rem]"
                  : "mt-[0.6rem] text-[1.1rem]",
              )}
            >
              {formData.footerText || "Footer text"}
            </div>
          )}

          <div
            className={cn(
              "flex items-center justify-end gap-[0.4rem]",
              isThumbnail ? "mt-[0.3rem]" : "mt-[0.6rem]",
            )}
          >
            <span
              className={cn(
                "text-text-primary",
                isThumbnail ? "text-[0.6rem]" : "text-[1.1rem]",
              )}
            >
              {getCurrentTime()}
            </span>
            <DoubleCheckIcon size={isThumbnail ? 8 : 16} />
          </div>
        </div>
      </div>
    </div>
  );
}
