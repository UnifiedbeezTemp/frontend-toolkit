# Channel Configuration Structure

This directory contains individual channel configuration components. Each channel has its own folder with a dedicated configuration component.

## Structure

```
channels/
├── BaseChannelConfig.tsx          # Base interface and types
├── channelConfigMap.tsx           # Maps channel IDs to their config components
├── PlaceholderChannelConfig.tsx   # Default placeholder for channels without custom configs
├── whatsapp/
│   ├── WhatsAppConfig.tsx
│   └── index.ts
├── facebook/
│   ├── FacebookConfig.tsx
│   └── index.ts
├── instagram/
│   ├── InstagramConfig.tsx
│   └── index.ts
├── telegram/
│   ├── TelegramConfig.tsx
│   └── index.ts
└── [other-channels]/              # Create folders for: linkedin, sms, phone, email, google, microsoft, calendly, zoom, shopify, paypal, stripe
    ├── [ChannelName]Config.tsx
    └── index.ts
```

## How It Works

1. **Channel Configuration Component**: Each channel has its own configuration component that implements the `BaseChannelConfigProps` interface.

2. **Connection Management**: The `useChannelConnections` hook manages all channel connections:
   - `getConnections(channelId)` - Get all connections for a channel
   - `addConnection(channelId, data)` - Add a new connection
   - `updateConnection(channelId, connectionId, data)` - Update existing connection
   - `deleteConnection(channelId, connectionId)` - Delete a connection

3. **Channel Config Wrapper**: The `ChannelConfigWrapper` component:
   - Renders the appropriate channel config component based on `channelConfigMap`
   - Handles saving/updating connections
   - Displays list of existing connections
   - Handles edit/delete actions

4. **Preview Display**: When a channel is expanded and has connections, they are displayed in the preview section.

## Creating a New Channel Config

1. Create a folder for your channel: `[channel-id]/`
2. Create `[ChannelName]Config.tsx` that implements `BaseChannelConfigProps`
3. Export it from `index.ts`
4. Add it to `channelConfigMap.tsx`

Example:
```tsx
// channels/stripe/StripeConfig.tsx
export default function StripeConfig({
  channel,
  connection,
  onSave,
  onCancel,
  isLoading = false,
}: BaseChannelConfigProps) {
  // Your form implementation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      apiKey: formData.get("apiKey") as string,
      // ... other fields
    };
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
    </form>
  );
}
```

## Flow

1. User expands a channel → `ChannelItem` shows `ChannelConfigWrapper`
2. `ChannelConfigWrapper` renders the channel-specific config component
3. User fills form and submits → `onSave` is called with form data
4. Connection is saved via `useChannelConnections` hook
5. Connection appears in the connections list
6. When channel is expanded, connections are shown in preview
7. User can edit/delete connections from the list

