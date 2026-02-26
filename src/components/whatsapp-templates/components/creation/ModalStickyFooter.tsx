import React from "react";
import Button from "../../../ui/Button";

interface ModalStickyFooterProps {
  onBack: () => void;
  onContinue: () => void;
}

export function ModalStickyFooter({
  onBack,
  onContinue,
}: ModalStickyFooterProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-[2.4rem] bg-primary border-border flex items-center justify-between gap-[1.6rem] z-[20]">
      <Button
        variant="secondary"
        onClick={onBack}
        className="flex-1 justify-center py-[1.2rem] text-[1.6rem] font-bold"
      >
        Go back
      </Button>
      <Button
        variant="primary"
        onClick={onContinue}
        className="flex-1 justify-center py-[1.2rem] text-[1.6rem] font-bold highlight-inside border-0"
      >
        Continue
      </Button>
    </div>
  );
}
