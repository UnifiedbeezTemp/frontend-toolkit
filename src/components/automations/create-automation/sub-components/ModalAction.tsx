"use client";

import React from "react";
import Button from "../../../ui/Button";

interface ModalActionsProps {
  onClose: () => void;
  onContinue: () => void;
}

export default function ModalAction({
  onClose,
  onContinue,
}: ModalActionsProps) {
  return (
    <div className="flex lg:justify-end gap-[15px] sm:px-[10rem] lg:px-0 mt-8">
      <Button
        variant="secondary"
        onClick={onClose}
        className="w-full border border-border lg:border-0 lg:w-[12rem] font-bold text-[1.4rem]"
      >
        Cancel
      </Button>
      <Button
        className="w-full lg:w-[15rem] font-bold text-[1.4rem]"
        onClick={onContinue}
      >
        Continue
      </Button>
    </div>
  );
}
