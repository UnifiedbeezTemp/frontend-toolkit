# Assistant Selector

The `AssistantSelector` is a shared component used to choose an AI Assistant from a list. It is designed to be self-contained and reusable across different projects via the shared submodule.

## Components

### `AssistantSelector`

The main entry point for the selector UI.

**Props:**

- `assistants: AIAssistant[]`: List of available assistants.
- `selectedAssistant: AIAssistant | null`: The currently selected assistant.
- `onSelectAssistant: (id: string) => void`: Callback when an assistant is selected.
- `noBorder?: boolean`: Optional flag to remove bottom border.
- `allowEmpty?: boolean`: Optional flag to allow no assistant to be selected initially.

### `AssistantDropdown`

The dropdown menu content used by the selector.

### `AssistantSelectorPreview`

Displays the preview of the selected assistant inside the selector trigger.

## Hooks

### `useAssistantSelector`

A React hook to manage assistant selection state.

**Returns:**

- `assistants: AIAssistant[]`: List of assistants (automatically fetched).
- `selectedAssistant: AIAssistant | null`: The currently selected assistant object.
- `selectedAssistantId: string | null`: The ID of the selected assistant.
- `selectAssistant: (id: string) => void`: Function to update the selection.

## Usage Example

```tsx
import { useAssistantSelector } from "@/shared/src/hooks/useAssistantSelector";
import AssistantSelector from "@/shared/src/components/ai-assistant/selector/AssistantSelector";

export function MyComponent() {
  const { assistants, selectedAssistant, selectAssistant } =
    useAssistantSelector();

  return (
    <AssistantSelector
      assistants={assistants}
      selectedAssistant={selectedAssistant}
      onSelectAssistant={selectAssistant}
    />
  );
}
```

## Setup & Dependencies

- Depends on `useAiAssistants` shared hook for data fetching.
- Uses `SmartDropdown` for the dropdown UI.
- Uses `AssistantHeader` and `SelectionChip` for consistent branding.
