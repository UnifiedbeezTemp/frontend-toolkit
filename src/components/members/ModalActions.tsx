"use client";

import Button from "../ui/Button";

interface ModalActionsProps {
  onClose: () => void;
}

export default function ModalActions({ onClose }: ModalActionsProps) {
  const handleSave = () => {
    console.log("Saving member changes...");
    onClose();
  };

  return (
    <div className="sticky bottom-0 shadow bg-primary py-[4rem] px-[4rem] flex items-center justify-between gap-[10px] w-full">
      <Button variant="secondary" className="w-full" onClick={onClose}>
        Go back
      </Button>
      <Button className="w-full" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
