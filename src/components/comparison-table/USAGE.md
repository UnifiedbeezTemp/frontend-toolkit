# Comparison Table Component

The `ComparisonTable` component displays a detailed comparison of available plans, features, and pricing. It includes responsive designs for both desktop and mobile views and handles data fetching internally.

## Usage

```tsx
import ComparisonTable from "@shared/components/comparison-table/ComparisonTable";

export default function PlansPage() {
  const handlePlanSelection = (planId: string) => {
    console.log("User selected plan:", planId);
    // Handle navigation or modal opening
  };

  return (
    <div className="container mx-auto">
      <ComparisonTable 
        className="my-10" 
        onSelectPlan={handlePlanSelection}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply to the container. |
| `onSelectPlan` | `(planId: string) => void` | No | Callback function triggered when a user clicks a "Choose Plan" button. |

## Features

- **Responsive Design**: Automatically switches between `ComparisonDesktop` and `ComparisonMobile` components based on screen size.
- **Data Fetching**: Uses the internal `useComparisonPlans` hook to fetch plan data and feature comparisons from the backend.
- **Loading State**: Displays a loading spinner while data is being fetched.
- **Error Handling**: Displays an error message if data fetching fails.

## Internal Components

- **ComparisonDesktop**: Table layout for larger screens.
- **ComparisonMobile**: Card-based or simplified layout for mobile devices.
- **constants.ts**: Defines the list of features (`COMPARISON_FEATURES`) shown in the table rows.

## Data Structures

The component maps backend data to the `ComparisonPlan` interface defined in `types.ts`.

```typescript
export interface ComparisonPlan {
  id: string;
  name: string;
  description: string;
  values: Record<string, string | React.ReactNode>; // Map of feature keys to values
  // ... other styling and display properties
}
```
