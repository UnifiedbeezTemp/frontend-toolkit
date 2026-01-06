# Addon Selection Module

This module provides a decoupled and reusable set of components and hooks for implementing addon selection flows, mirroring the `PlanSelection` architecture.

## Directory Structure

```
addons/                 # Flow-specific building blocks in shared/src/components/addons
├── cards/              # Individual Addon UI cards
│   ├── AddonCard.tsx
│   ├── SelectedAddonCard.tsx
│   └── ...
├── modals/             # Purchase & Quantity Modals
│   ├── AddAddonModal.tsx
│   ├── CheckoutModal.tsx
│   └── ...
├── hooks/              # Selection & Business Logic
│   ├── useAddonsPage.ts
│   ├── useAddons.ts
│   └── ...
└── index.ts            # Public API exports
```

## Typical Implementation Flow

To implement an addons selection page, you should follow this pattern:

1. Create a **pure UI component** (acting as a Container) that calls the **shared orchestration hook**.
2. Compose the UI using the granular components exported from `@/shared`.

### 1. The Orchestration Hook (`useAddonsPage.ts`)

This shared hook encapsulates all business logic: fetching available addons, managing selected state, calculating totals, and handling checkout navigation.

```tsx
import { useAddonsPage } from "@/shared/src/components/addons";

// Inside your component:
const {
  addons, // List of available addons
  selectedAddons, // List of user-selected addons
  loading,
  error,
  handleContinue,
  // ... and many granular handlers
} = useAddonsPage();
```

### 2. The UI Component (e.g., `AddonsPage.tsx` in your app)

A clean, structural component that retrieves logic from the hook and renders the layout.

```tsx
import {
  AddonCard,
  SelectedAddonCard,
  AddAddonModal,
  CheckoutModal,
  useAddonsPage,
} from "@/shared/src/components/addons";

export default function AddonsPage() {
  const {
    icons,
    addons,
    selectedAddons,
    handleOpenAddModal,
    // ... destructure all needed state/handlers
  } = useAddonsPage();

  return (
    <div className="layout-wrapper">
      {/* 1. Page Header / Wrapper */}

      {/* 2. Selected Addons Section */}
      {selectedAddons.map((addon) => (
        <SelectedAddonCard key={addon.id} addon={addon} />
      ))}

      {/* 3. Available Addons Grid */}
      <div className="grid">
        {addons.map((addon) => (
          <AddonCard
            key={addon.id}
            addon={addon}
            onAdd={() => handleOpenAddModal(addon)}
          />
        ))}
      </div>

      {/* 4. Modals (controlled by hook state) */}
      <AddAddonModal />
      <CheckoutModal />
    </div>
  );
}
```

## Key Exports

### Components

- **`AddonCard`**: Displays an available addon with "Add" button.
- **`SelectedAddonCard`**: Displays a selected addon with "Remove" and quantity controls.
- **`AddAddonModal`**: Modal interface for selecting quantity before adding.
- **`CheckoutModal`**: Summary view before proceeding to payment.

### Hooks

- **`useAddonsPage`**: The primary entry point. Orchestrates the entire flow.
- **`useAddons`**: Lower-level hook for Redux manipulation (add/remove/update).
