# AI Behavior Settings Components

Reusable form fields for configuring AI behavior settings in a channel account context.

## Components

### AIReplyDelayField

Dropdown for specifying the delay before the AI assistant replies to a message.

### WorkingDaysField

Multi-select dropdown for choosing the days of the week when the AI assistant is active.

### TimezoneField

Dropdown for selecting the timezone for the opening and closing hours.

### TimePicker

Custom input with dropdowns for selecting hours, minutes, and AM/PM period.

## Usage

```tsx
import AIReplyDelayField from "@/shared/src/components/channel-account-ai-config/ai-behavior-settings/AIReplyDelayField";
import WorkingDaysField from "@/shared/src/components/channel-account-ai-config/ai-behavior-settings/WorkingDaysField";
import TimezoneField from "@/shared/src/components/channel-account-ai-config/ai-behavior-settings/TimezoneField";
import TimePicker from "@/shared/src/components/channel-account-ai-config/ai-behavior-settings/TimePicker";

// ... in your component
<AIReplyDelayField
  value={formState.aiReplyDelay}
  onChange={handleReplyDelayChange}
/>

<WorkingDaysField
  value={formState.workingDays}
  onChange={handleWorkingDaysChange}
/>

<TimezoneField
  value={formState.timezone}
  onChange={handleTimezoneChange}
/>

<TimePicker
  label="Opening Hours"
  hours={formState.openingHours}
  minutes={formState.openingMinutes}
  period={formState.openingPeriod}
  onChange={handleOpeningChange}
/>
```

## Directory Structure

- `AIReplyDelayField.tsx`
- `WorkingDaysField.tsx`
- `TimezoneField.tsx`
- `TimePicker.tsx`
- `hooks/`
  - `useAIReplyDelayField.ts`
  - `useWorkingDaysField.ts`
  - `useTimezoneField.ts`
  - `useTimePicker.ts`
