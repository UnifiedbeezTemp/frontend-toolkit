# Addon Module Usage Guide

This module is designed using the **"Shared Ingredients, Local Recipe"** pattern.

- **Shared Ingredients**: Pure UI components (`BaseAddonCard`, `AddAddonModal`, `MultiLanguageModal`) and logical orchestration hooks (`useAddons`, `useMultiLanguage`) reside in `@/shared`.
- **Local Recipe**: Your project's local page (e.g., `AddonsPage.tsx`) and its custom hook orchestration these ingredients to fit your specific billing and trial rules.

---

## 🚀 How to Implement

### Step 1: Create your Local Orchestration Hook

Create a hook in your project to manage the logic between the different modals and the addon list.

```tsx
// hooks/useAddonsPage.ts
import { useAddons } from "@/shared/src/components/addons/hooks/useAddons";
import { Addon } from "@/shared/src/store/onboarding/types/addonTypes";

export const useAddonsPage = () => {
  const {
    selectedAddons,
    handleOpenAddModal,
    handleCloseAddModal,
    handleAddAddon,
    handleRemoveAddon,
    handleUpdateAddonQuantity,
    isAddModalOpen,
    tempAddon,
    tempQuantity,
    handleUpdateTempQuantity,
    // ...
  } = useAddons();

  return {
    addons: selectedAddons,
    isAddModalOpen,
    tempAddon,
    tempQuantity,
    onOpenAdd: handleOpenAddModal,
    onCloseAdd: handleCloseAddModal,
    onConfirmAdd: handleAddAddon,
    onRemove: handleRemoveAddon,
    onQuantityChange: handleUpdateAddonQuantity,
    onTempQuantityChange: handleUpdateTempQuantity,
  };
};
```

### Step 2: Compose your Local Page

Use the shared UI components and pass them the state from your local hook.

```tsx
// AddonsPage.tsx
import { useAddonsPage } from "./hooks/useAddonsPage";
import { BaseAddonCard } from "@/shared/src/components/addons/cards/BaseAddonCard";
import { AddAddonModal } from "@/shared/src/components/addons/modals/AddAddonModal";

export default function AddonsPage() {
  const {
    addons,
    onOpenAdd,
    onRemove,
    onQuantityChange,
    isAddModalOpen,
    onCloseAdd,
    tempAddon,
    tempQuantity,
    onTempQuantityChange,
    onConfirmAdd,
  } = useAddonsPage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Render the Addon Cards */}
      {addons.map((addon) => (
        <BaseAddonCard
          key={addon.id}
          addon={addon}
          variant="manage"
          onAdd={() => onOpenAdd(addon)}
          onRemove={() => onRemove(addon.id)}
          onQuantityChange={(qty) => onQuantityChange(addon.id, qty)}
        />
      ))}

      {/* 2. Render the Configuration Modal */}
      <AddAddonModal
        isOpen={isAddModalOpen}
        onClose={onCloseAdd}
        addon={tempAddon}
        currentQuantity={tempQuantity}
        onQuantityChange={onTempQuantityChange}
        onAdd={() => tempAddon && onConfirmAdd(tempAddon, tempQuantity)}
        canAddMore={tempAddon ? tempQuantity < tempAddon.limit : true}
      />
    </div>
  );
}
```

---

## 📦 Shared API Reference

### `useAddons()`

The primary hook for managing the addon lifecycle.

**Returns:**

- `selectedAddons`: Current list of addons (merged with backend purchases).
- `handleRemoveAddon(id)`: Handles local removal OR backend cancellation.
- `updateAddonQuantity(id, qty)`: Updates quantity with validation against purchased counts.
- `hydrateAddons(purchased)`: Essential for syncing backend data with Redux.

### `BaseAddonCard`

The standard display unit for an addon.

- **Props**: `addon`, `variant` ("add" | "manage"), `onAdd`, `onRemove`, `onQuantityChange`.
- **Features**: Automatically displays "Scheduled for cancellation" status and hides actions when applicable.

### `AddAddonModal`

Modal for configuring an addon before adding/updating.

- **Features**: Handles quantity selection and integrates `MultiLanguageManager` automatically for language-based addons.

### `MultiLanguageModal`

Specialized modal for managing AI Language instances.

- **Logic**: Uses `useMultiLanguageModal` to handle search, selection quotas, and backend preference updates.

---

## 🔧 Multi-Language Pattern

When implementing Multi-Language AI, the component uses `useMultiLanguage` internally to:

1. Fetch available languages.
2. Track cancellation requests per instance.
3. Sync preferences to the backend.

Developers should ensure that `updatePreferences` is called only when the user confirms their selection, to maintain a "draft" state until the final action.
