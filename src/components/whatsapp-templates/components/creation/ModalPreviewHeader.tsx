import React from "react";
import CloseModalButton from "@/shared/src/components/modal/CloseModalButton";

interface ModalPreviewHeaderProps {
  onClose: () => void;
}

export function ModalPreviewHeader({ onClose }: ModalPreviewHeaderProps) {
  return (
    <div className="flex items-center justify-between p-[2.4rem] pb-[1.6rem] border-b border-border h-[8.9rem]">
      <h2 className="text-[1.8rem] font-bold text-text-secondary">
        WhatsApp templates preview
      </h2>
      <CloseModalButton onClick={onClose} />
    </div>
  );
}
