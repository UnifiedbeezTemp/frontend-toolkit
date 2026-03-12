"use client";

import React from "react";
import Button from "../../../../../../ui/Button";

interface EmailComposerFooterProps {
  onCancel: () => void;
  onSend: () => void;
}

export default function EmailComposerFooter({
  onCancel,
  onSend,
}: EmailComposerFooterProps) {
  return (
    <div className="flex items-center justify-between sm:justify-start gap-[1.2rem] shrink-0 px-[1.6rem] py-[1.2rem] sm:p-[2.4rem] bg-primary sm:bg-input-filled border-t border-input-stroke sm:border-none">
      <Button
        variant="secondary"
        onClick={onCancel}
        className="px-[2.4rem] w-full sm:w-fit h-[4rem] text-[1.4rem] font-bold text-dark-base-100"
      >
        Cancel
      </Button>
      <Button
        onClick={onSend}
        className="px-[2.4rem] w-full sm:w-fit h-[4rem] bg-brand-primary hover:bg-brand-primary/90 text-[1.4rem] font-bold text-primary"
      >
        Send email
      </Button>
    </div>
  );
}
