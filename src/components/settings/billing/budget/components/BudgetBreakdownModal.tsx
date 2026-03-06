"use client";

import { useState } from "react";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Modal from "../../../../modal/Modal";
import Button from "../../../../ui/Button";
import IconActionModal from "../../../../modal/IconActionModal";
import { BudgetCategory } from "../hooks/useBudgetSettings";
import BudgetBreakdownHeader from "./modal/BudgetBreakdownHeader";
import BudgetBreakdownStats from "./modal/BudgetBreakdownStats";
import BudgetBreakdownList from "./modal/BudgetBreakdownList";
import BudgetTransactionList from "./modal/BudgetTransactionList";
import BudgetAdjustModal from "./modal/BudgetAdjustModal";

interface BudgetBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: BudgetCategory | null;
  onUpdateCategoryLimit: (categoryId: string, newLimit: number) => void;
  onToggleCategoryAlerts: (categoryId: string) => void;
  onToggleCategoryAutoAdjust: (categoryId: string) => void;
}

export default function BudgetBreakdownModal({
  isOpen,
  onClose,
  category,
  onUpdateCategoryLimit,
  onToggleCategoryAlerts,
  onToggleCategoryAutoAdjust,
}: BudgetBreakdownModalProps) {
  const icons = useSupabaseIcons();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);

  if (!category) return null;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xxl"
        className="overflow-hidden w-full lg:w-[85.2rem] !p-0 h-[98dvh] sm:h-auto rounded-t-[2rem] sm:rounded-t-auto"
        bottomSheet
      >
        <BudgetBreakdownHeader
          name={category.name}
          tag={category.tag}
          description={category.description}
          onClose={onClose}
        />

        <div className="p-[1.6rem] sm:p-[2.4rem] space-y-[3.2rem]">
          <BudgetBreakdownStats
            spent={category.spent}
            allocated={category.allocated}
            remaining={category.remaining}
            percentageUsed={category.percentageUsed}
          />

          {category.breakdown && (
            <BudgetBreakdownList items={category.breakdown} />
          )}
          {category.transactions && (
            <BudgetTransactionList transactions={category.transactions} />
          )}
        </div>

        <div className="p-[2.4rem] flex gap-[1.2rem] sticky bottom-0 bg-primary">
          <Button
            variant="secondary"
            className="w-full text-[1.4rem] font-bold"
            onClick={() => setIsDownloadModalOpen(true)}
          >
            Download Report
          </Button>
          <Button
            className="w-full text-[1.4rem] font-bold"
            onClick={() => setIsAdjustModalOpen(true)}
          >
            Adjust Budget
          </Button>
        </div>
      </Modal>

      <IconActionModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        title="Download Not Available"
        description="This feature is not yet avalable to you!"
        icon={{ src: icons.infoCircle2, alt: "info" }}
        primaryAction={{
          label: "Close",
          onClick: () => setIsDownloadModalOpen(false),
        }}
      />

      <BudgetAdjustModal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        categoryName={category.name}
        currentLimit={category.allocated}
        budgetAlerts={category.budgetAlerts}
        autoAdjustBudget={category.autoAdjustBudget}
        onUpdate={(newLimit) => onUpdateCategoryLimit(category.id, newLimit)}
        onToggleAlerts={() => onToggleCategoryAlerts(category.id)}
        onToggleAutoAdjust={() => onToggleCategoryAutoAdjust(category.id)}
      />
    </>
  );
}
