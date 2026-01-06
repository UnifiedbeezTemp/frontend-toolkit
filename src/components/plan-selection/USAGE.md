# Plan Selection Module

This module provides a decoupled and reusable set of components and hooks for implementing plan selection flows.

## Directory Structure

```
plan-selection/         # Flow-specific building blocks
├── hooks/              # Selection & enhancement logic
├── modals/             # Celebration & Required modals
└── tabs/               # Reusable billing toggle

full-plan-card/         # Independent pure UI component
├── PlanCard.tsx
├── PlanCardSkeleton.tsx
└── ...

data/
└── plansData.tsx       # Shared data formatting logic
```

## Typical Implementation Flow

To implement a plan selection page, you should follow this pattern:

1. Create a **local hook** to orchestrate the shared logic with your project-specific actions (routing, custom modals).
2. Create a **pure UI component** that uses this local hook.

### 1. The Orchestration Hook (e.g., `usePlanSelectionPage.ts`)

This is where you "glue" the shared bits together.

```tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import {
  usePlanSelection,
  usePlanEnhancement,
  getPlansData,
} from "@/shared/src";

export const usePlanSelectionPage = () => {
  const icons = useSupabaseIcons();
  const router = useRouter();
  const [isAddonsModalOpen, setIsAddonsModalOpen] = useState(false);

  // 1. Initialize core selection logic
  const {
    isYearly,
    setIsYearly,
    showCelebrationModal,
    selectedPlan,
    setSelectedPlan,
    isSelecting,
    user,
    backendPlans,
    loading,
    error,
    retry,
    handleContinue,
    handleCloseCelebration,
  } = usePlanSelection();

  // 2. Format backend data for the UI
  const plans = getPlansData(backendPlans, icons);

  // 3. Add dynamic labels (Upgrade/Downgrade/Current)
  const { enhancedPlans } = usePlanEnhancement(
    plans,
    user?.plan,
    selectedPlan,
    setSelectedPlan
  );

  // 4. Define PROJECT-SPECIFIC actions
  const onContinueClick = () => {
    handleContinue((hasPlanChanged) => {
      if (!hasPlanChanged) {
        // If plan didn't change (e.g. just confirming current), go straight to checkout
        router.push("/checkout");
      }
      // If plan CHANGED, the CelebrationModal will show automatically
    });
  };

  return {
    icons,
    isYearly,
    setIsYearly,
    showCelebrationModal,
    selectedPlan,
    setSelectedPlan,
    isSelecting,
    enhancedPlans,
    loading,
    error,
    retry,
    isAddonsModalOpen,
    setIsAddonsModalOpen,
    handleCloseCelebration,
    onContinueClick,
  };
};
```

### 2. The UI Component (e.g., `PlanSelection.tsx`)

A clean, structural component with zero internal functions.

```tsx
import {
  PlanCard,
  PlanCardSkeleton,
  CelebrationModal,
  PlanSelectionTabs,
  PlanSelectionRequiredModal,
} from "@/shared/src";
import { usePlanSelectionPage } from "./usePlanSelectionPage";

export default function PlanSelection() {
  const {
    icons,
    isYearly,
    setIsYearly,
    showCelebrationModal,
    selectedPlan,
    setSelectedPlan,
    isSelecting,
    enhancedPlans,
    loading,
    error,
    onContinueClick,
    isAddonsModalOpen,
    setIsAddonsModalOpen,
    handleCloseCelebration,
  } = usePlanSelectionPage();

  return (
    <>
      {/* 1. Header & Tabs */}
      <PlanSelectionTabs isYearly={isYearly} onTabChange={setIsYearly} />

      {/* 2. Plan Grid with Loading State */}
      <div className="grid grid-cols-4 gap-4">
        {loading
          ? [1, 2, 3, 4].map((i) => <PlanCardSkeleton key={i} />)
          : enhancedPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isYearly={isYearly}
                isSelected={selectedPlan === plan.id}
                onSelect={setSelectedPlan}
              />
            ))}
      </div>

      {/* 3. Action Button (controlled by hook) */}
      <button onClick={onContinueClick} disabled={isSelecting}>
        Continue
      </button>

      {/* 4. Modals */}
      <CelebrationModal
        isOpen={showCelebrationModal}
        onClose={handleCloseCelebration}
        onContinue={() => router.push("/checkout")}
      />

      <PlanSelectionRequiredModal
        isOpen={isAddonsModalOpen}
        onClose={() => setIsAddonsModalOpen(false)}
      />
    </>
  );
}
```

## Key Exports

### `usePlanSelection()`

- `handleContinue(onSuccess?)`: Central function to save plan. Accepts a callback `(hasPlanChanged: boolean) => void`.
- `isYearly / setIsYearly`: UI state for the billing toggle.
- `selectedPlan / setSelectedPlan`: UI state for the active card.

### `getPlansData(backendPlans, icons)`

Transforms raw API data into the rich objects required by `PlanCard`.

### `usePlanEnhancement(plans, currentUserPlan, selectedPlan, setSelectedPlan)`

Compares plans to user's current subscription to generate "Current Plan" or "Upgrade/Downgrade" labels.
