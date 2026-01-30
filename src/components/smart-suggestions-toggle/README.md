# SmartSuggestionsToggle

A reusable toggle component for enabling or disabling "Smart Suggestions" within a channel or settings context.

## Props

| Name       | Type                         | Description                                             |
| :--------- | :--------------------------- | :------------------------------------------------------ |
| `enabled`  | `boolean`                    | Whether the smart suggestions are currently enabled.    |
| `onToggle` | `(enabled: boolean) => void` | Callback function triggered when the toggle is clicked. |
| `disabled` | `boolean` (optional)         | Whether the toggle is interactive.                      |

## Usage

```tsx
import SmartSuggestionsToggle from "@/shared/src/components/smart-suggestions-toggle/SmartSuggestionsToggle";

function MyComponent() {
  const [isSmartSuggestionsEnabled, setIsSmartSuggestionsEnabled] =
    useState(false);

  const handleToggle = (newValue: boolean) => {
    setIsSmartSuggestionsEnabled(newValue);
    // Perform any side effects here
  };

  return (
    <SmartSuggestionsToggle
      enabled={isSmartSuggestionsEnabled}
      onToggle={handleToggle}
    />
  );
}
```

## Function Signatures

### onToggle

Should be a function that takes a boolean value as its only argument and returns nothing.

```typescript
const handleToggle = (enabled: boolean): void => {
  // Logic to update state or persist settings
};
```
