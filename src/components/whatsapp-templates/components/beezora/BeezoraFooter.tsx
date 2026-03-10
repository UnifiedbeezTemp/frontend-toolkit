import React from "react";
import Button from "../../../ui/Button";

interface BeezoraFooterProps {
  onClose: () => void;
  onCreate: () => void;
  isCreateDisabled: boolean;
}

export function BeezoraFooter({
  onClose,
  onCreate,
  isCreateDisabled,
}: BeezoraFooterProps) {
  return (
    <div className="flex items-center gap-[1.6rem] mt-[3.2rem]">
      <Button
        variant="secondary"
        onClick={onClose}
        className="w-full"
      >
        Cancel
      </Button>
      <Button
        variant="primary"
        onClick={onCreate}
        disabled={isCreateDisabled}
        className="w-full"
      >
        Create
      </Button>
    </div>
  );
}
