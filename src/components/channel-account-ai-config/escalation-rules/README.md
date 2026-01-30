# Escalation Rules Components

A collection of reusable form fields for configuring escalation rules in a channel account context.

## Components

### UnansweredMessagesField

Dropdown with custom numeric input for specifying the number of unanswered messages before escalation.

### KeywordsField

Tag-style input for specifying keywords that trigger escalation.

### NoReplyTimeField

Dropdown with custom numeric input and unit selection (Seconds, Minutes, Hours) for specifying the time after no reply before escalation.

### TeamMembersField

Multi-select dropdown for selecting backup escalation contacts from a list of team members.

## Usage

```tsx
import UnansweredMessagesField from "@/shared/src/components/channel-account-ai-config/escalation-rules/UnansweredMessagesField";
import KeywordsField from "@/shared/src/components/channel-account-ai-config/escalation-rules/KeywordsField";
import NoReplyTimeField from "@/shared/src/components/channel-account-ai-config/escalation-rules/NoReplyTimeField";
import TeamMembersField from "@/shared/src/components/channel-account-ai-config/escalation-rules/TeamMembersField";

// ... in your component
<UnansweredMessagesField
  value={config.escalateAfterUnanswered}
  onChange={(value) => updateChannelConfig({ escalateAfterUnanswered: value })}
/>
<KeywordsField
  value={config.escalateOnKeywords}
  onChange={(keywords) => updateChannelConfig({ escalateOnKeywords: keywords })}
/>
<NoReplyTimeField
  value={config.escalateAfterNoReply}
  onChange={(value) => updateChannelConfig({ escalateAfterNoReply: value })}
/>
<TeamMembersField
  value={config.backupEscalationContacts}
  onChange={(memberIds) => updateChannelConfig({ backupEscalationContacts: memberIds })}
  members={members}
/>
```

## Directory Structure

- `UnansweredMessagesField.tsx`
- `KeywordsField.tsx`
- `NoReplyTimeField.tsx`
- `TeamMembersField.tsx`
- `hooks/`
  - `useUnansweredMessagesField.ts`
  - `useKeywordsField.ts`
  - `useNoReplyTimeField.ts`
  - `useTeamMembersField.ts`
