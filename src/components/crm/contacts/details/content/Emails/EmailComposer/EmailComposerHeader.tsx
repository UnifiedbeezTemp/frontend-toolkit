"use client";

import React from "react";
import Text from "../../../../../../ui/Text";
import ImageComponent from "../../../../../../ui/ImageComponent";

interface EmailComposerHeaderProps {
  onCancel: () => void;
  onToggleExpand: () => void;
  expandIcon: string;
  closeIcon: string;
}

export default function EmailComposerHeader({
  onCancel,
  onToggleExpand,
  expandIcon,
  closeIcon,
}: EmailComposerHeaderProps) {
  return (
    <div className="flex items-center justify-between shrink-0 px-0">
      <Text className="text-[2rem] sm:text-[2.2rem] font-bold text-dark-base-100 tracking-tight">
        Create email
      </Text>

      <div className="flex items-center gap-[0.8rem]">
        <button
          onClick={onToggleExpand}
          className="p-[0.6rem] hover:bg-input-filled rounded-[1rem] transition-colors"
        >
          <ImageComponent
            src={expandIcon}
            alt="expand"
            width={18}
            height={18}
          />
        </button>
        <button
          onClick={onCancel}
          className="p-[0.6rem] hover:bg-input-filled rounded-[1rem] transition-colors"
        >
          <ImageComponent
            src={closeIcon}
            alt="close"
            width={18}
            height={18}
          />
        </button>
      </div>
    </div>
  );
}
