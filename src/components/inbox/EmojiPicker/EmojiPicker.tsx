"use client";

import Picker, { Theme, EmojiStyle, EmojiClickData } from "emoji-picker-react";
import { RefObject } from "react";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
  triggerRef: RefObject<HTMLElement | null>;
}

export const EmojiPicker = ({
  onSelect,
  onClose,
  triggerRef,
}: EmojiPickerProps) => {
  const onEmojiClick = (emojiData: EmojiClickData) => {
    onSelect(emojiData.emoji);
  };

  return (
    <SmartDropdown
      isOpen={true}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="top-end"
      offset={12}
      maxHeight="unset"
      className="!w-auto !max-w-none shadow-2xl rounded-2xl overflow-hidden border border-input-stroke bg-primary z-[9999]"
    >
      <Picker
        onEmojiClick={onEmojiClick}
        autoFocusSearch={true}
        theme={Theme.LIGHT}
        emojiStyle={EmojiStyle.APPLE}
        width={350}
        height={450}
        lazyLoadEmojis={true}
        searchPlaceholder="Search emojis..."
        previewConfig={{
          showPreview: false,
        }}
        skinTonesDisabled={true}
        searchDisabled={false}
      />
      {/* <div className="bg-white border-t border-input-stroke p-3 flex justify-end">
        <button
          onClick={onClose}
          className="text-primary-base font-bold text-[1.2rem] hover:underline px-2"
        >
          Done
        </button>
      </div> */}
    </SmartDropdown>
  );
};
