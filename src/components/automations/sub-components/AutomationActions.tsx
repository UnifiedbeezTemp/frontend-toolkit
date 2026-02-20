"use client";

import React from "react";
import Button from "../../ui/Button";

interface AutomationActionsProps {
  onBack: () => void;
  onDone: () => void;
  selectedCount: number;
  totalCount: number;
}

export default function AutomationActions({
  onBack,
  onDone,
}: AutomationActionsProps) {
  return (
    <div className="sticky px-[2.4rem] bottom-0 bg-white py-[2.4rem] flex items-center justify-between gap-[10px] w-full border-t border-border">
      <Button
        variant="secondary"
        className="w-full text-[1.4rem] font-bold"
        onClick={onBack}
      >
        Go back
      </Button>
      <Button
        className="w-full highlight-inside border-0 text-[1.4rem] font-bold"
        onClick={onDone}
      >
        Done
      </Button>
    </div>
  );
}
