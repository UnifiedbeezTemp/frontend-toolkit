import { useState, useCallback, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { testChatService } from "../services/testChatService";
import { ChatMessage } from "../types/api";
import { useToast } from "../../../ui/toast/useToast";

export interface UseTestChatParams {
  channelId: number;
  aiId: number;
  connectionId: number;
  metadata: Record<string, unknown> | undefined;
}

export function useTestChat({
  channelId,
  aiId,
  connectionId,
  metadata,
}: UseTestChatParams) {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState(false);
  const [currentAiId, setCurrentAiId] = useState(aiId);

  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pendingResponseRef = useRef<string | null>(null);
  const hasInitializedRef = useRef(false);

  const cleanupTyping = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }, []);

  const animateTyping = useCallback(
    (text: string, onComplete: () => void) => {
      cleanupTyping();

      const words = text.split(" ");
      let currentIndex = 0;

      typingIntervalRef.current = setInterval(() => {
        if (currentIndex < words.length) {
          setTypingText(words.slice(0, currentIndex + 20).join(" "));
          currentIndex = currentIndex + 20;
        } else {
          cleanupTyping();
          onComplete();
        }
      }, 50);
    },
    [cleanupTyping],
  );

  const initMutation = useMutation({
    mutationFn: async () => {
      return testChatService.initTestSession({
        channelId,
        aiId,
        connectionId,
        metadata,
      });
    },
    onSuccess: (response) => {
      setSessionId(response.sessionId);
      setIsInitialized(true);
      setInitError(false);
      setCurrentAiId(aiId);

      const greetingMessage: ChatMessage = {
        id: `greeting-${Date.now()}`,
        text: response.greeting,
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([greetingMessage]);
    },
    onError: (error: Error) => {
      setInitError(true);
      setIsInitialized(false);
      showToast({
        title: "Failed to Start Test Session",
        description: error.message || "Could not initialize the test chat",
        variant: "error",
      });
    },
  });

  const sendMutation = useMutation({
    mutationFn: async (message: string) => {
      if (!sessionId) throw new Error("No session ID");
      return testChatService.sendTestMessage({
        channelId,
        aiId,
        sessionId,
        message,
        simulateOutOfHours: false,
      });
    },
    onSuccess: (response) => {
      const aiResponseText = response.response;
      pendingResponseRef.current = aiResponseText;

      animateTyping(aiResponseText, () => {
        const aiMessage: ChatMessage = {
          id: `ai-${Date.now()}`,
          text: aiResponseText,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setIsTyping(false);
        setTypingText("");
        pendingResponseRef.current = null;
      });
    },
    onError: (error: Error) => {
      setIsTyping(false);
      setTypingText("");
      showToast({
        title: "Failed to Send Message",
        description: error.message || "Could not send your message",
        variant: "error",
      });
    },
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      if (!sessionId) return null;
      return testChatService.clearTestSession(
        channelId,
        currentAiId,
        sessionId,
      );
    },
    onSuccess: () => {
      cleanupTyping();
      setMessages([]);
      setSessionId(null);
      setIsInitialized(false);
      setInputText("");
      setIsTyping(false);
      setTypingText("");
    },
  });

  const resetState = useCallback(() => {
    cleanupTyping();
    setMessages([]);
    setSessionId(null);
    setIsInitialized(false);
    setInitError(false);
    setIsTyping(false);
    setTypingText("");
  }, [cleanupTyping]);

  const initializeChat = useCallback(() => {
    if (initMutation.isPending) return;
    resetState();
    initMutation.mutate();
  }, [initMutation, resetState]);

  // Initialize only once on mount
  useEffect(() => {
    if (!hasInitializedRef.current && aiId) {
      hasInitializedRef.current = true;
      initializeChat();
    }
  }, [aiId, initializeChat]);

  // Reinitialize when AI changes
  useEffect(() => {
    if (aiId !== currentAiId && hasInitializedRef.current) {
      setCurrentAiId(aiId);
      resetState();
      initMutation.mutate();
    }
  }, [aiId, currentAiId, initMutation, resetState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupTyping();
      hasInitializedRef.current = false;
    };
  }, [cleanupTyping]);

  const handleSendMessage = useCallback(() => {
    if (!inputText.trim() || !sessionId || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    sendMutation.mutate(inputText.trim());
  }, [inputText, sessionId, isTyping, sendMutation]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  const handleRefresh = useCallback(() => {
    initializeChat();
  }, [initializeChat]);

  return {
    messages,
    inputText,
    setInputText,
    isTyping,
    typingText,
    isInitialized,
    isInitializing: initMutation.isPending,
    isSending: sendMutation.isPending,
    hasError: initError,
    initializeChat,
    handleSendMessage,
    handleKeyPress,
    handleRefresh,
  };
}
