"use client";

import React from "react";
import Button from "../../../ui/Button";

interface AddTaskModalFooterProps {
  onCancel: () => void;
  onSave: () => void;
  isValid: boolean;
}

export default function AddTaskModalFooter({
  onCancel,
  onSave,
  isValid,
}: AddTaskModalFooterProps) {
  return (
    <div className="p-[1rem] sm:p-[2.4rem] sticky bottom-0 bg-primary border-t border-input-stroke flex items-center gap-[1.6rem]">
      <Button className="w-full" onClick={onCancel} variant="secondary">
        {" "}
        Cancel
      </Button>
      <Button className="w-full"
        onClick={onSave}
        disabled={!isValid}
      >
        Save
      </Button>
    </div>
  );
}
