"use client";

import React from "react";
import Text from "../../../../../../ui/Text";
import ImageComponent from "../../../../../../ui/ImageComponent";

interface EmailComposerSubHeaderProps {
  subject: string;
  onCancel?: () => void;
  onToggleExpand?: () => void;
  expandIcon?: string;
  closeIcon?: string;
}

export default function EmailComposerSubHeader({
  subject,
  onCancel,
  onToggleExpand,
  expandIcon,
  closeIcon,
}: EmailComposerSubHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-input-filled py-[1.2rem] px-[1.6rem] sm:px-[2.4rem] shrink-0 border-b border-input-stroke">
      <Text className="text-[1.4rem] font-bold text-dark-base-40">
        {subject}
      </Text>

      {onCancel && onToggleExpand && (
        <div className="hidden lg:flex items-center gap-[0.8rem]">
          <button
            onClick={onToggleExpand}
            className="p-[0.4rem] hover:bg-black/5 rounded-[1rem] transition-colors"
          >
            <ImageComponent
              src={expandIcon!}
              alt="expand"
              width={16}
              height={16}
              className="opacity-40"
            />
          </button>
          <button
            onClick={onCancel}
            className="p-[0.4rem] hover:bg-black/5 rounded-[1rem] transition-colors"
          >
            <ImageComponent
              src={closeIcon!}
              alt="close"
              width={16}
              height={16}
              className="opacity-40"
            />
          </button>
        </div>
      )}
    </div>
  );
}
