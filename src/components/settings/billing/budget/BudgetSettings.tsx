"use client";

import { useBudgetSettings } from "./hooks/useBudgetSettings";
import BudgetStats from "./components/BudgetStats";
import BudgetBreakdown from "./components/BudgetBreakdown";
import BudgetSettingsAdjust from "./components/BudgetSettingsAdjust";
import BudgetBreakdownModal from "./components/BudgetBreakdownModal";
import Heading from "../../../ui/Heading";

export default function BudgetSettings() {
  const {
    monthlyLimit,
    setMonthlyLimit,
    budgetAlerts,
    autoAdjustBudget,
    budgetStats,
    budgetBreakdown,
    selectedCategory,
    isBreakdownModalOpen,
    handleUpdateLimit,
    handleToggleAlerts,
    handleToggleAutoAdjust,
    handleOpenBreakdown,
    handleCloseBreakdown,
    handleUpdateCategoryLimit,
    handleToggleCategoryAlerts,
    handleToggleCategoryAutoAdjust,
  } = useBudgetSettings();

  const onAdjustBudget = () => {
    // Scroll to settings section or focus input
    const settingsSection = document.getElementById("budget-settings-adjust");
    if (settingsSection) {
      settingsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full mt-[2rem] p-[1rem] lg:p-0">
      <div className="mb-[2.4rem]">
        <Heading className="text-[2.4rem] font-bold text-text-secondary mb-[0.8rem]">
          Budget
        </Heading>
      </div>

      <BudgetStats stats={budgetStats} onAdjustBudget={onAdjustBudget} />

      <BudgetBreakdown
        categories={budgetBreakdown}
        onViewDetails={handleOpenBreakdown}
      />

      <div id="budget-settings-adjust">
        <BudgetSettingsAdjust
          monthlyLimit={monthlyLimit}
          setMonthlyLimit={setMonthlyLimit}
          budgetAlerts={budgetAlerts}
          onToggleAlerts={handleToggleAlerts}
          autoAdjustBudget={autoAdjustBudget}
          onToggleAutoAdjust={handleToggleAutoAdjust}
          onUpdateLimit={() => handleUpdateLimit(monthlyLimit)}
        />
      </div>

      <BudgetBreakdownModal
        isOpen={isBreakdownModalOpen}
        onClose={handleCloseBreakdown}
        category={selectedCategory}
        onUpdateCategoryLimit={handleUpdateCategoryLimit}
        onToggleCategoryAlerts={handleToggleCategoryAlerts}
        onToggleCategoryAutoAdjust={handleToggleCategoryAutoAdjust}
      />
    </div>
  );
}
