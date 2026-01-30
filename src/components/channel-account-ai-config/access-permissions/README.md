# Access Permissions Components

Reusable components for managing team member access permissions in a channel account context.

## Components

### TeamMembersList

Displays a list of team members with selection options.

### TeamMemberItem

Individually represents a team member with their avatar, email, role, and a selection checkbox.

## Usage

```tsx
import TeamMembersList from "@/shared/src/components/channel-account-ai-config/access-permissions/TeamMembersList";

// ... in your component
<TeamMembersList
  teamMembers={teamMembers}
  selectedMemberIds={config.selectedMemberIds}
  allMemberIds={allMemberIds}
  onToggleMember={toggleMember}
  onToggleSelectAll={() => toggleSelectAll(allMemberIds)}
/>;
```

## Directory Structure

- `TeamMembersList.tsx`
- `TeamMemberItem.tsx`
- `hooks/`
  - `useTeamMembers.ts`

```

```
