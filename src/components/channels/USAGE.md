# Shared Channel Management Components

This directory contains reusable components for managing channel connections, previewing channel metadata, and configuring individual channels.

## Summary of Components

### 1. `ChannelConnection`

Located at `shared/src/components/channels/management/ChannelConnection.tsx`.
This is the main entry point for the channel connection flow. It supports both desktop (sidebar + panel) and mobile views.

**Usage:**

```tsx
import ChannelConnection from "@/shared/src/components/channels/management/ChannelConnection";

function MyComponent() {
  const handleRefetch = async () => {
    // optional refetch logic
  };

  return <ChannelConnection onRefetchChannels={handleRefetch} />;
}
```

### 2. `ChannelsPreview`

Located at `shared/src/components/channels/preview/ChannelsPreview.tsx`.
A component that displays a summary of selected channels and their active connections.

**Usage:**

```tsx
import ChannelsPreview from "@/shared/src/components/channels/preview/ChannelsPreview";

function MyPreview() {
  return <ChannelsPreview />;
}
```

### 3. `ChannelConfigWrapper`

Located at `shared/src/components/channels/config/ChannelConfigWrapper.tsx`.
A generic wrapper that dynamically renders the configuration form for a specific channel (e.g., Stripe, WhatsApp).

## Coupling and Extension

To use these components in a new part of the app (like Settings or a Modal):

1. **State Management**: Ensure the Redux slices `channelsSlice` and `channelConnectionsSlice` are properly initialized and populated with data.
2. **Context**: If using the `RedirectModal` feature, wrap your component with `RedirectModalProvider` from `shared/src/components/channels/context/RedirectModalContext`.
3. **Modal Wrapper**: To display the flow in a modal, simply wrap `ChannelConnection` in your modal component.

Example of use in a Modal:

```tsx
import { Modal } from "@/shared/src/components/modal/Modal";
import ChannelConnection from "@/shared/src/components/channels/management/ChannelConnection";

export function ChannelSettingsModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-4 h-[80vh]">
        <ChannelConnection />
      </div>
    </Modal>
  );
}
```

## Folder Structure

- `management/`: Core UI for connecting channels (Desktop/Mobile).
- `preview/`: Metadata and connection list previews.
- `config/`: Individual channel forms and maps.
- `hooks/`: Shared logic for state and API interactions.
- `connections/`: Connection item components and mapping.
- `mappers/`: Form value transformation logic.
