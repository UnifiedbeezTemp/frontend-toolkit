# Channel AI Config Submodule

Centralized logic and components for managing AI configuration for various channel types (Webchat, Email, WhatsApp, etc.).

## Directory Structure

- `types/`
  - `api.ts`: Consolidated API request and response models.
- `utils/`
  - `configUtils.ts`: Shared formatters, parsers, and connection detection helpers.
- `services/`
  - `aiConfigService.ts`: Unified service for all AI configuration API interactions.
- `hooks/`
  - `useAIConfigPersistence.ts`: Base hook for configuration fetching and synchronization.
  - `useEscalationPersistence.ts`: Specialized hook for Escalation Rules.
  - `useFollowUpPersistence.ts`: Specialized hook for Follow-Up Triggers.
  - `useAIBehaviorPersistence.ts`: Specialized hook for AI Behavior Settings.
  - `useAccessPermissionsPersistence.ts`: Specialized hook for Access Permissions.

## How to Integrate

### 1. Setup Your Form Config

Ensure your local component has a configuration object that matches the expected structure.

### 2. Implementation Example

```tsx
import { useEscalationPersistence } from "@/shared/src/components/channel-account-ai-config/hooks/useEscalationPersistence";

function MyEscalationForm({
  channelId,
  aiId,
  connection,
  config,
  updateLocalConfig,
  members,
}) {
  const { isLoading, isSaving, isRefreshing, hasChanges, save } =
    useEscalationPersistence(
      {
        channelId,
        aiId,
        connectionId: connection.id,
        metadata: connection.metadata,
      },
      members,
      config,
      updateLocalConfig,
    );

  // Use the returned flags and 'save' function in your UI
  return (
    <Button onClick={save} disabled={!hasChanges || isSaving}>
      {isSaving ? "Saving..." : "Save Changes"}
    </Button>
  );
}
```

## Key Benefits

- **Single Source of Truth**: All API logic and data transformations exist in one place.
- **Auto-Sync**: Hooks automatically sync state when the API data changes.
- **Change Detection**: Efficient implementation of `hasChanges` to control UI states.
- **Webchat Support**: Automatically handles the differences between webchat and channel accounts based on connection metadata.
