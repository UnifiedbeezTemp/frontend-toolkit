"use client";

import React, { useRef, useState } from "react";
import { useAppSelector } from "../../../../store/hooks/useRedux";
import { RootState } from "../../../../store";
import { TagIcon, PlusIcon } from "lucide-react";
import CloseIcon from "../../../../assets/icons/CloseIcon";
import TagSelectorDropdown from "../../sub-components/TagSelectorDropdown";
import Text from "../../../ui/Text";

interface DiaryModalTagsProps {
  selectedTags: string[];
  onToggleTag: (tagId: string) => void;
}

export default function DiaryModalTags({
  selectedTags,
  onToggleTag,
}: DiaryModalTagsProps) {
  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const plusRef = useRef<HTMLButtonElement>(null);
  const allTags = useAppSelector((state: RootState) => state.tag.tags);

  return (
    <div className="flex flex-col gap-[1.2rem]">
      <Text size="sm" className="tracking-wider">
        Tags
      </Text>
      <div className="flex flex-wrap gap-[0.8rem]">
        {selectedTags?.map((tagId) => {
          const tag = allTags.find((t) => t.id === tagId);
          const label = tag ? tag.label : tagId;

          return (
            <div
              key={tagId}
              className="flex items-center gap-[0.6rem] px-[1.2rem] py-[0.6rem] rounded-[0.8rem] bg-input-filled border border-input-stroke group"
            >
              <TagIcon
                size={14}
                className="text-text-primary-2 group-hover:text-brand-primary"
              />
              <span className="text-[1.4rem] text-text-primary">{label}</span>
              <button
                onClick={() => onToggleTag(tagId)}
                className="text-text-primary/40 hover:text-text-primary transition-colors"
              >
                <CloseIcon size={12} color="var(--text-primary-2)" />
              </button>
            </div>
          );
        })}

        <button
          ref={plusRef}
          onClick={() => setIsTagsOpen(true)}
          className="flex items-center justify-center w-[3.2rem] h-[3.2rem] rounded-[0.8rem] bg-input-filled border border-input-stroke hover:bg-input-stroke transition-colors"
        >
          <PlusIcon size={16} className="text-text-primary" />
        </button>
      </div>

      <TagSelectorDropdown
        isOpen={isTagsOpen}
        onClose={() => setIsTagsOpen(false)}
        triggerRef={plusRef}
        allTags={allTags}
        selectedTags={selectedTags}
        onToggleTag={onToggleTag}
      />
    </div>
  );
}
