"use client";

import React from "react";
import Text from "../../../../../ui/Text";
import ImageComponent from "../../../../../ui/ImageComponent";
import { DocumentActivity } from "../types";
import { useDocumentItem } from "../hooks/useDocumentItem";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import FileIcon from "../../../../../../assets/icons/FileIcon";
import { SmartDropdown } from "../../../../../smart-dropdown";

interface DocumentItemProps {
  document: DocumentActivity;
  contactName: string;
  contactAvatar: string;
  onPreview: () => void;
}

export default function DocumentItem({
  document,
  contactName,
  contactAvatar,
  onPreview,
}: DocumentItemProps) {
  const {
    fileIconColor,
    icons,
    avatarSrc,
    actions,
    categoryBadgeStyle,
    uploaderAvatarSrc,
  } = useDocumentItem(document, contactAvatar, onPreview);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuTriggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-[1.6rem] sm:p-[2rem] border border-border rounded-[1rem] bg-primary gap-[1.2rem] sm:gap-0 group">
      <div className="flex items-center gap-[1.2rem] w-full sm:w-auto min-w-0 overflow-hidden">
        <div className="border border-border rounded-full p-[1rem] sm:p-[0.6rem] shrink-0 self-start sm:self-center">
          <FileIcon color={fileIconColor} size={32} className="sm:hidden" />
          <FileIcon
            color={fileIconColor}
            size={24}
            className="hidden sm:block"
          />
        </div>

        {/* Desktop Layout Group */}
        <div className="hidden sm:flex flex-col gap-[0.4rem] min-w-0">
          <div className="flex items-center gap-[0.8rem]">
            <Text className="text-[1.6rem] font-bold text-dark-base-100 truncate min-w-0 max-w-[30rem]">
              {document.title}
            </Text>
            <span className={categoryBadgeStyle}>{document.category}</span>
          </div>
          <div className="flex items-center gap-[0.8rem] text-[1.2rem] text-dark-base-40">
            <span>{document.size}</span>
            <div className="w-[1.6rem] h-[1.6rem] rounded-full overflow-hidden bg-input-filled border border-input-stroke shrink-0">
              <ImageComponent
                src={uploaderAvatarSrc}
                alt={document.uploadedBy.name}
                width={16}
                height={16}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="truncate max-w-[15rem]">
              {document.uploadedBy.name}
            </span>
          </div>
        </div>

        {/* Mobile Layout Title */}
        <Text className="text-[1.6rem] font-bold text-dark-base-100 truncate min-w-0 sm:hidden">
          {document.title}
        </Text>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-[1.6rem] w-full sm:w-auto min-w-0">
        <div className="flex items-center gap-[0.8rem] min-w-0 overflow-hidden sm:hidden">
          <div className="w-[2.4rem] h-[2.4rem] rounded-full overflow-hidden flex items-center justify-center bg-input-filled border border-input-stroke shrink-0">
            <ImageComponent
              src={avatarSrc}
              alt={contactName}
              width={24}
              height={24}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex items-center gap-[0.8rem] min-w-0 overflow-hidden">
            <Text className="text-[1.2rem] font-bold text-dark-base-40 truncate">
              {contactName}
            </Text>
            <Text className="text-[1.2rem] font-bold text-dark-base-40 shrink-0">
              {document.date} {document.time}
            </Text>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-[1.6rem] shrink-0">
          <button
            onClick={onPreview}
            className="p-[0.4rem] hover:bg-input-filled rounded-[0.4rem] transition-colors"
          >
            <ImageComponent
              src={icons.eyeOn}
              alt="View"
              width={20}
              height={20}
              className="opacity-40"
            />
          </button>
          <button className="p-[0.4rem] hover:bg-input-filled rounded-[0.4rem] transition-colors">
            <ImageComponent
              src={icons.download}
              alt="Download"
              width={20}
              height={20}
              className="opacity-40"
            />
          </button>
        </div>

        <div className="sm:hidden relative shrink-0">
          <button
            ref={menuTriggerRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-[0.4rem] hover:bg-input-filled rounded-[0.4rem] transition-colors"
          >
            <ImageComponent
              src={icons.threeDot}
              alt="menu"
              width={16}
              height={16}
              className="opacity-40"
            />
          </button>

          <SmartDropdown
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            triggerRef={menuTriggerRef}
            placement="bottom-end"
            className="!w-auto !min-w-0"
          >
            <div className="flex flex-col gap-[0.8rem] border border-input-stroke rounded-[1rem] p-[0.8rem] shadow-lg bg-primary">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => {
                    action.onClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-[4rem] h-[4rem] flex items-center justify-center rounded-[0.8rem] border border-input-stroke bg-input-filled transition-colors hover:bg-black/5"
                >
                  <ImageComponent
                    src={action.icon}
                    alt={action.id}
                    width={20}
                    height={20}
                    className="opacity-40 grayscale brightness-0"
                  />
                </button>
              ))}
            </div>
          </SmartDropdown>
        </div>
      </div>
    </div>
  );
}
