import React from "react";
import CloseModalButton from "@/shared/src/components/modal/CloseModalButton";
import Heading from "@/shared/src/components/ui/Heading";

interface AddNewPageModalHeaderProps {
  onClose: () => void;
}

export default function AddNewPageModalHeader({ 
  onClose 
}: AddNewPageModalHeaderProps) {
  return (
    <div className="px-[2.4rem] pt-[2rem] pb-[2.4rem] border-b border-border flex items-center justify-between">
      <Heading>Add website</Heading>
      <CloseModalButton onClick={onClose} />
    </div>
  );
}