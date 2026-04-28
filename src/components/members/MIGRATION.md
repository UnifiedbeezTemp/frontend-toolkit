# Members Module Migration Guide

## Summary

The members module now supports a provider-based controller so consumers do not need to prop-drill invite, loading, retry, and per-row action state through multiple layers.

Recommended entry points:

- `useTeamManagement`
- `TeamManagementProvider`
- `InviteSection`
- `InvitedUsersSection`
- `TeamMembersSection`

Reference consumers:

- `components/onboarding/setup/steps/step-3/Step3.tsx`
- `shared/src/components/settings/team/TeamSettings.tsx`

## What Changed

### Old pattern

Consumers owned and passed:

- `emailInput`
- `error`
- `onEmailChange`
- `onAddInvite`
- `onSendInvite`
- `isSendingInvite`
- `isLoadingMembers`
- `isLoadingInvitations`
- `membersError`
- `invitationsError`
- retry handlers

This caused:

- prop drilling
- duplicated invite/bulk logic
- shared loading state across different rows
- inconsistent inline error handling

### New pattern

`useTeamManagement` now owns:

- draft creation with `addOnly=true`
- send-invite dispatch flow
- per-user loading/error state
- bulk draft actions
- fetch/retry state for members, invitations, and roles
- shared inline feedback plus toast feedback

`TeamManagementProvider` exposes that controller to shared members UI.

## Recommended Migration

### 1. Create the controller once

```tsx
const teamManagement = useTeamManagement()
```

### 2. Wrap the members UI with the provider

```tsx
<TeamManagementProvider value={teamManagement}>
  <InviteSection />
  <InvitedUsersSection />
  <TeamMembersSection />
</TeamManagementProvider>
```

### 3. Keep local page concerns outside the provider

Examples:

- page navigation
- step progression
- page layout
- tab switching outside the shared module if needed

## Before

```tsx
<InviteSection
  emailInput={emailInput}
  error={error}
  onEmailChange={handleEmailChange}
  onAddInvite={handleAddInvite}
  failedInvitations={failedInvitations}
  isSending={isAnySendingInvite}
/>

<InvitedUsersSection
  isLoading={isLoadingInvitations}
  error={invitationsError}
  onRetry={refetchInvitations}
  onSendInvite={handleSendInviteToAddedEmail}
  isSendingInvite={isSendingInviteToAddedEmail}
/>
```

## After

```tsx
const teamManagement = useTeamManagement()

<TeamManagementProvider value={teamManagement}>
  <InviteSection />
  <InvitedUsersSection />
  <TeamMembersSection />
</TeamManagementProvider>
```

## Compatibility Layer

The following components still accept legacy props for staged migration:

- `InviteSection`
- `InvitedUsersSection`
- `TeamMembersSection`
- `UserList`
- `UserItem`
- `shared/src/components/settings/team/UsersSection.tsx`
- `components/onboarding/setup/steps/step-3/ContentSection.tsx`

Compatibility notes:

- `UserList.isSendingInvite` accepts either a boolean or `(invitationId: string) => boolean`
- `UserItem.onSendInvite` still works and now preserves the legacy payload shape:
  `{ invitationId, roleId, email? }`
- legacy prop-based consumers outside the provider continue to work

## Behavioral Notes

- `Add` creates draft invitations first using `addOnly=true`
- sending invites is a separate dispatch action
- each row now has independent pending/error state for:
  - send invite
  - remove/cancel
  - assign role
- invitation updates upsert into store state instead of replacing the entire list with partial mutation responses

## Migration Checklist

- move invite and retry orchestration into `useTeamManagement`
- wrap the members UI once with `TeamManagementProvider`
- remove prop drilling into shared members components
- stop using one shared row-loading boolean
- rely on shared inline status and toast feedback
- only keep compatibility props where migration cannot be completed yet

## When To Keep Legacy Props Temporarily

Keep the old prop-based API only if:

- the consumer is not ready to adopt the provider
- the consumer has custom invite wiring that is being migrated later
- the consumer still manages unrelated page state that has not been split yet

Once migrated, prefer the provider path and delete the compatibility props from that consumer.
