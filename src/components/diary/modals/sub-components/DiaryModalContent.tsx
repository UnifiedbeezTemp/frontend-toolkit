"use client";

import React from "react";
import Textarea from "../../../forms/Textarea";
import Text from "../../../ui/Text";

interface DiaryModalContentProps {
  content: string;
  onContentChange: (content: string) => void;
}

export default function DiaryModalContent({
  content,
  onContentChange,
}: DiaryModalContentProps) {
  return (
    <div className="flex flex-col gap-[1.2rem]">
      <Text
        weight="bold"
        color="muted"
        size="sm"
        className="uppercase tracking-wider"
      >
        Entry Content
      </Text>
      <Textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="p-[2rem] rounded-[1.6rem] bg-input-filled border border-input-stroke min-h-[15rem] text-[1.6rem] leading-[1.6] text-text-primary/80"
        placeholder="Write your diary entry..."
      />
    </div>
  );
}
