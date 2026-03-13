"use client";

import React, { useState } from "react";
import Button from "../../../../../../ui/Button";
import Text from "../../../../../../ui/Text";
import Input from "../../../../../../ui/Input";
import { EMOJIS } from "../../constants/EmailComposerConstants";

interface PopoverProps {
  onApply: (command: string, value: string) => void;
  onClose: () => void;
}

export function LinkPopover({ onApply, onClose }: PopoverProps) {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const handleApply = () => {
    if (url) {
      onApply("createLink", JSON.stringify({ url, text: text || url }));
    }
  };

  return (
    <div className="absolute top-[6rem] left-[2.4rem] z-50 bg-primary border border-input-stroke rounded-[1.2rem] shadow-xl p-[1.6rem] w-[32rem] flex flex-col gap-[1.2rem] animate-in fade-in zoom-in duration-200">
      <Text className="text-[1.4rem] font-bold text-gray-900">Add Link</Text>
      <div className="flex flex-col gap-[0.8rem]">
        <Text className="text-[1.2rem] font-medium text-gray-500">
          Text to display
        </Text>
        <Input
          placeholder="Display text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <Text className="text-[1.2rem] font-medium text-gray-500">
          Link URL
        </Text>
        <Input
          placeholder="https://example.com"
          value={url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUrl(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && handleApply()
          }
        />
      </div>
      <div className="flex items-center justify-end gap-[0.8rem]">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleApply}>Apply</Button>
      </div>
    </div>
  );
}

export function ImagePopover({ onApply, onClose }: PopoverProps) {
  const [url, setUrl] = useState("");
  return (
    <div className="absolute top-[6rem] left-[2.4rem] z-50 bg-primary border border-input-stroke rounded-[1.2rem] shadow-xl p-[1.6rem] w-[32rem] flex flex-col gap-[1.2rem] animate-in fade-in zoom-in duration-200">
      <Text className="text-[1.4rem] font-bold text-gray-900">
        Insert Image URL
      </Text>
      <Input
        placeholder="https://example.com/image.png"
        value={url}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUrl(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          e.key === "Enter" && onApply("insertImage", url)
        }
      />
      <div className="flex items-center justify-end gap-[0.8rem]">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onApply("insertImage", url)}>Insert</Button>
      </div>
    </div>
  );
}

export function EmojiPopover({ onApply, onClose }: PopoverProps) {
  return (
    <div className="absolute top-[6rem] left-[2.4rem] z-50 bg-primary border border-input-stroke rounded-[1.2rem] shadow-xl p-[1.2rem] w-[35rem] animate-in fade-in zoom-in duration-200">
      <div className="grid grid-cols-8 gap-[0.4rem] max-h-[20rem] overflow-y-auto p-[0.4rem] no-scrollbar">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onApply("insertText", emoji)}
            className="text-[2rem] hover:bg-gray-100 rounded-[0.6rem] p-[0.4rem] transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className="mt-[1.2rem] pt-[0.8rem] border-t border-input-stroke flex justify-end">
        <button
          onClick={onClose}
          className="text-[1.2rem] text-gray-500 hover:text-gray-700 font-medium"
        >
          Done
        </button>
      </div>
    </div>
  );
}
