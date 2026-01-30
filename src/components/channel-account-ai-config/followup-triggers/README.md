# Follow-up Triggers Components

Reusable form fields for configuring follow-up triggers in a channel account context.

## Components

### DelayBeforeFollowUpField

Dropdown for specifying the delay time before a follow-up action is triggered.

### FollowUpContentTypeField

Dropdown for specifying the type of content to be used for the follow-up.

## Usage

```tsx
import DelayBeforeFollowUpField from "@/shared/src/components/channel-account-ai-config/followup-triggers/DelayBeforeFollowUpField";
import FollowUpContentTypeField from "@/shared/src/components/channel-account-ai-config/followup-triggers/FollowUpContentTypeField";

// ... in your component
<DelayBeforeFollowUpField
  value={config.delayBeforeFollowUp}
  onChange={(value) => updateChannelConfig({ delayBeforeFollowUp: value })}
/>
<FollowUpContentTypeField
  value={config.followUpContentType}
  onChange={(value) => updateChannelConfig({ followUpContentType: value })}
/>
```

## Directory Structure

- `DelayBeforeFollowUpField.tsx`
- `FollowUpContentTypeField.tsx`
- `hooks/`
  - `useDelayBeforeFollowUpField.ts`
  - `useFollowUpContentTypeField.ts`
