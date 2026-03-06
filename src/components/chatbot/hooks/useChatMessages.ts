import { useState, useRef, useCallback } from "react";
import { ChatMessage, ChatMode } from "../types";
import { AI_RESPONSES, INITIAL_AI_MESSAGE, AGENTS } from "../constants";

export function useChatMessages() {
  const [mode, setMode] = useState<ChatMode>("ai");
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_AI_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [isAgentDropdownOpen, setIsAgentDropdownOpen] = useState(false);
  const agentTriggerRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const getTimestamp = (): string => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      const userMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        text: text.trim(),
        sender: "user",
        timestamp: getTimestamp(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      scrollToBottom();

      if (mode === "ai") {
        setTimeout(() => {
          const lowerText = text.toLowerCase();
          const matchedKey = Object.keys(AI_RESPONSES).find(
            (key) => key !== "default" && lowerText.includes(key),
          );

          const botMessage: ChatMessage = {
            id: `bot-${Date.now()}`,
            text: AI_RESPONSES[matchedKey || "default"],
            sender: "bot",
            senderName: "Beezora AI",
            timestamp: getTimestamp(),
          };

          setMessages((prev) => [...prev, botMessage]);
          scrollToBottom();
        }, 1000);
      } else {
        // Dummy agent response in live mode
        setTimeout(() => {
          const agentMessage: ChatMessage = {
            id: `agent-${Date.now()}`,
            text: "I'm looking into that for you. Please hold on for a moment while I check your account details.",
            sender: "agent",
            senderName: AGENTS[0].name,
            timestamp: getTimestamp(),
          };
          setMessages((prev) => [...prev, agentMessage]);
          scrollToBottom();
        }, 2000);
      }
    },
    [mode, scrollToBottom],
  );

  const handleQuickAction = useCallback(
    (action: string) => {
      sendMessage(action);
    },
    [sendMessage],
  );

  const handleSubmit = useCallback(() => {
    sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  const switchMode = useCallback(
    (newMode: ChatMode) => {
      if (newMode === mode) return;
      setMode(newMode);

      if (newMode === "live") {
        const systemMessage: ChatMessage = {
          id: `sys-${Date.now()}`,
          text: "Switched to Live Support. Our team will assist you shortly.",
          sender: "agent",
          senderName: "Sarah Mitchell",
          timestamp: getTimestamp(),
        };
        setMessages((prev) => [...prev, systemMessage]);
        setSelectedAgent(AGENTS[0].id);
      } else {
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          text: "You're back with Beezora AI! How can I help?",
          sender: "bot",
          senderName: "AI Bot",
          timestamp: getTimestamp(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }

      scrollToBottom();
    },
    [mode, scrollToBottom],
  );

  const handleSelectAgent = useCallback(
    (agentId: string) => {
      setSelectedAgent(agentId);
      setIsAgentDropdownOpen(false);
      const agent = AGENTS.find((a) => a.id === agentId);
      if (agent) {
        const systemMessage: ChatMessage = {
          id: `sys-${Date.now()}`,
          text: `Connected to ${agent.name}. They will respond shortly.`,
          sender: "agent",
          senderName: agent.name,
          timestamp: getTimestamp(),
        };
        setMessages((prev) => [...prev, systemMessage]);
        scrollToBottom();
      }
    },
    [scrollToBottom],
  );

  return {
    mode,
    switchMode,
    messages,
    inputValue,
    setInputValue,
    handleSubmit,
    handleQuickAction,
    messagesEndRef,
    selectedAgent,
    setSelectedAgent,
    isAgentDropdownOpen,
    setIsAgentDropdownOpen,
    agentTriggerRef,
    handleSelectAgent,
    agents: AGENTS,
  };
}
