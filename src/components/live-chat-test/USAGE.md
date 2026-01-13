# Live Chat Shared Components

This directory contains the core UI components for the Live Chat interface. These components are designed to be composed together to build custom chat experiences.

## Components

- **ChatHeader**: Displays the assistant name and refresh button.
- **ChatMessages**: Renders the list of messages with typing indicators.
- **ChatInput**: Input field with send button.
- **MessageBubble**: Individual message bubble component.

## Usage Pattern

To implement a live chat, you should create a custom hook (e.g., `useChat`) that manages the chat state and interacts with your backend services. Then, use these shared components to render the UI.

### Example Hook Implementation

Below is an example of how you might structure your `useChat` hook. This logic is specific to your implementation and should reside in your feature directory, not in `shared`.

```typescript
// features/my-feature/hooks/useChat.ts
import { useState, useCallback } from "react";
// Import your specific services
import { initSession, sendMessage } from "@/services/myChatService";

export function useChat(assistantId: string) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  // ... state for typing, loading, etc.

  const handleSendMessage = useCallback(async () => {
    // 1. Update local state
    // 2. Call service
    // 3. Handle response
  }, [inputText, assistantId]);

  return {
    messages,
    inputText,
    setInputText,
    handleSendMessage,
    // ... other handlers
  };
}
```

### Example Usage

```tsx
// features/my-feature/MyChatComponent.tsx
import { useChat } from "./hooks/useChat";
import ChatHeader from "@/shared/src/components/live-chat-test/ChatHeader";
import ChatMessages from "@/shared/src/components/live-chat-test/ChatMessages";
import ChatInput from "@/shared/src/components/live-chat-test/ChatInput";

export default function MyChatComponent({ assistantId }) {
  const { messages, inputText, setInputText, handleSendMessage } =
    useChat(assistantId);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader assistantName="Beezora" />

      <ChatMessages messages={messages} />

      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
```

A hook example which is just a template of what powers the live chat

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/shared/src/components/ui/toast/useToast";
import {
initAiTest,
sendAiTestMessage,
} from "@/shared/src/services/aiAssistantService";

export interface ChatMessage {
id: string;
text: string;
sender: "assistant" | "user";
timestamp: string;
}

export function useChat(assistantId: string | number | undefined) {
const { showToast } = useToast();
const [messages, setMessages] = useState<ChatMessage[]>([]);
const [inputText, setInputText] = useState("");
const [isTyping, setIsTyping] = useState(false);
const [typingText, setTypingText] = useState("");
const [currentAiResponse, setCurrentAiResponse] = useState("");
const [sessionId, setSessionId] = useState<string | null>(null);
const [isInitializing, setIsInitializing] = useState(false);
const [isSending, setIsSending] = useState(false);
const [initError, setInitError] = useState<boolean>(false);

const initializedIdRef = useRef<string | number | null>(null);

const formatTimestamp = () => {
return new Date().toLocaleTimeString([], {
hour: "2-digit",
minute: "2-digit",
});
};

/\*\*

- Initializes the chat session. This is called automatically when assistantId changes,
- or manually via retryInitialization.
-
- @param customId - Optional ID to override assistantId (useful for retries/switching)
  \*/
  const handleSessionTransition = useCallback(
  async (customId?: string | number) => {
  const id = customId || assistantId;
  if (!id) return;

      try {
        setIsInitializing(true);
        setInitError(false);

        const data = await initAiTest(Number(id));
        setSessionId(data.sessionId);

        const greetingMessage: ChatMessage = {
          id: "initial-greeting",
          text: data.greeting,
          sender: "assistant",
          timestamp: formatTimestamp(),
        };

        setMessages([greetingMessage]);
        initializedIdRef.current = id;
      } catch (error) {
        setInitError(true);
        showToast({
          title: "Initialization Failed",
          description: "Failed to initialize chat session. Please try again.",
          variant: "error",
        });
      } finally {
        setIsInitializing(false);
      }

  },
  [assistantId, showToast]
  );

// Automatically initialize when assistantId changes
useEffect(() => {
if (assistantId && assistantId !== initializedIdRef.current) {
handleSessionTransition();
}
}, [assistantId, handleSessionTransition]);

const handleSendMessage = useCallback(async () => {
if (!inputText.trim() || !sessionId || !assistantId || isSending) return;

    // 1. Add User Message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: formatTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputText;
    // Clear input immediately for better UX
    setInputText("");
    setIsSending(true);
    setIsTyping(true);

    try {
      // 2. Send to API
      const data = await sendAiTestMessage(Number(assistantId), {
        sessionId,
        message: messageToSend,
      });

      // 3. Store the AI response for the typing effect
      setCurrentAiResponse(data.response || "");
    } catch (error) {
      showToast({
        title: "Message Failed",
        description: "Failed to get a response. Please try again.",
        variant: "error",
      });
      // Stop typing effect on error
      setIsTyping(false);
    } finally {
      setIsSending(false);
    }

}, [inputText, sessionId, assistantId, isSending, showToast]);

const handleKeyPress = useCallback(
(e: React.KeyboardEvent) => {
if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault();
handleSendMessage();
}
},
[handleSendMessage]
);

const handleRefresh = useCallback(async () => {
// Reset all local state
setMessages([]);
setInputText("");
setIsTyping(false);
setTypingText("");
setCurrentAiResponse("");
setSessionId(null); // Force a new session ID to be generated
setInitError(false); // Clear errors
setIsSending(false);
setIsInitializing(false);

    // Reset ref so handleSessionTransition believes it's a "new" ID
    initializedIdRef.current = null;

    // Trigger initialization again
    await handleSessionTransition();

}, [handleSessionTransition]);

// Handle typing effect for AI response
useEffect(() => {
if (!isTyping || !currentAiResponse) return;

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < currentAiResponse.length) {
        setTypingText(currentAiResponse.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          // Add the full message to the chat history
          const aiMessage: ChatMessage = {
            id: Date.now().toString(),
            text: currentAiResponse,
            sender: "assistant",
            timestamp: formatTimestamp(),
          };

          setMessages((prev) => [...prev, aiMessage]);
          setTypingText("");
          setCurrentAiResponse("");
          setIsTyping(false);
        }, 500); // Small delay after typing finishes before committing the message
      }
    }, 10); // Typing speed

    return () => clearInterval(typingInterval);

}, [isTyping, currentAiResponse]);

return {
messages,
inputText,
setInputText,
isTyping,
typingText,
isInitializing,
isSending,
initError,
retryInitialization: handleSessionTransition,
handleSendMessage,
handleKeyPress,
handleRefresh,
};
}
