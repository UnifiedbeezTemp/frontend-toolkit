"use client";

import React from "react";
import Modal from "../modal/Modal";
import ComparisonTable from "./ComparisonTable";
import CloseModalButton from "../modal/CloseModalButton";

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
  onAddonsClick?: (planId?: string) => void;
}

export default function ComparisonModal({
  isOpen,
  onClose,
  onSelectPlan,
  onAddonsClick,
}: ComparisonModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="fullscreen"
      className="w-[calc(100vw-2rem)] lg:w-fit rounded-[2.5rem] mx-auto overflow-hidden"
    >
      <div className="max-w-[160rem] mx-auto relative">
        <CloseModalButton
          onClick={onClose}
          className="absolute top-0 right-0 z-[60]"
        />
        <ComparisonTable
          onSelectPlan={onSelectPlan}
          onAddonsClick={onAddonsClick}
        />
      </div>
    </Modal>
  );
}
