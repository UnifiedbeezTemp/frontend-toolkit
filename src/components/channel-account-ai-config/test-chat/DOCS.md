# AI Test Chat Submodule

This submodule provides a standardized way to implement AI assistant live chat testing across different projects. It includes API services, specialized hooks, and type definitions.

## Structure

- `types/api.ts`: Centralized type definitions for chat messages, session management, and API requests/responses.
- `services/testChatService.ts`: API service for initializing sessions, sending messages, and managing chat history.
- `hooks/useTestChat.ts`: A comprehensive hook for managing chat state, typing animations, and API interactions.

## Usage

### 1. Basic Implementation (Hook)

The `useTestChat` hook handles everything from session initialization to typing animations.

```tsx
import { useTestChat } from "@/shared/src/components/channel-account-ai-config/test-chat/hooks/useTestChat";

function MyChatComponent({ channelId, aiId, connectionId, metadata }) {
  const {
    messages,
    inputText,
    setInputText,
    isTyping,
    typingText,
    isInitializing,
    handleSendMessage,
    handleKeyPress,
    handleRefresh,
  } = useTestChat({
    channelId,
    aiId,
    connectionId,
    metadata,
  });

  return <div>{/* Render messages and input */}</div>;
}
```

### 2. Manual API Calls (Service)

If you need more control, you can use the `testChatService` directly.

```tsx
import { testChatService } from "@/shared/src/components/channel-account-ai-config/test-chat/services/testChatService";

// Example: Initialize a session
const response = await testChatService.initTestSession({
  channelId,
  aiId,
  connectionId,
  metadata,
});
```

## Key Benefits

- **Consistency**: All projects use the same API contract and logic for AI testing.
- **Reusability**: Reduces code duplication and ensures bug fixes are propagated automatically.
- **Improved UX**: Built-in typing animations and state management provide a premium feel.
