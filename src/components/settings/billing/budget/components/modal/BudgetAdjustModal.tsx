"use client";

import { useState } from "react";
import Button from "../../../../../ui/Button";
import Modal from "../../../../../modal/Modal";
import BudgetSettingsAdjust from "../BudgetSettingsAdjust";

interface BudgetAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  currentLimit: number;
  budgetAlerts: boolean;
  autoAdjustBudget: boolean;
  onUpdate: (newLimit: number) => void;
  onToggleAlerts: () => void;
  onToggleAutoAdjust: () => void;
}

export default function BudgetAdjustModal({
  isOpen,
  onClose,
  categoryName,
  currentLimit,
  budgetAlerts,
  autoAdjustBudget,
  onUpdate,
  onToggleAlerts,
  onToggleAutoAdjust,
}: BudgetAdjustModalProps) {
  const [limit, setLimit] = useState(currentLimit);

  const handleSave = () => {
    onUpdate(limit);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="fullscreen"
      className="bg-primary !p-0 lg:w-[97rem] rounded-[1.6rem]"
      isBlur
    >
      <div className="p-[2.4rem]">
        <BudgetSettingsAdjust
          title={`Adjust ${categoryName} Budget`}
          monthlyLimit={limit}
          setMonthlyLimit={setLimit}
          budgetAlerts={budgetAlerts}
          onToggleAlerts={onToggleAlerts}
          autoAdjustBudget={autoAdjustBudget}
          onToggleAutoAdjust={onToggleAutoAdjust}
          onUpdateLimit={handleSave}
          className="mt-0 border-0 !p-0"
        />
      </div>
    </Modal>
  );
}
