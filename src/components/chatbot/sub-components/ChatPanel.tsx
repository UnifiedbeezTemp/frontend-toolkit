"use client";

import { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import QuickActions from "./QuickActions";
import ChatInput from "./ChatInput";
import { useChatMessages } from "../hooks/useChatMessages";
import { QUICK_ACTIONS } from "../constants";
import { cn } from "../../../lib/utils";

interface ChatPanelProps {
  onClose: () => void;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    mode,
    switchMode,
    messages,
    inputValue,
    setInputValue,
    handleSubmit,
    handleQuickAction,
    messagesEndRef,
    selectedAgent,
    isAgentDropdownOpen,
    setIsAgentDropdownOpen,
    agentTriggerRef,
    handleSelectAgent,
    agents,
  } = useChatMessages();

  return (
    <div
      className={cn(
        "fixed bottom-[10rem] right-[3rem] z-[1000] bg-primary rounded-[1.6rem] shadow-2xl border border-border flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 transition-all",
        isExpanded ? "w-[60rem] h-[75rem]" : "w-[40rem] h-[62rem]",
      )}
    >
      <ChatHeader
        mode={mode}
        onSwitchMode={switchMode}
        onClose={onClose}
        isExpanded={isExpanded}
        onToggleExpand={() => setIsExpanded(!isExpanded)}
      />

      <ChatMessages
        messages={messages}
        mode={mode}
        messagesEndRef={messagesEndRef}
        selectedAgent={selectedAgent}
        isAgentDropdownOpen={isAgentDropdownOpen}
        setIsAgentDropdownOpen={setIsAgentDropdownOpen}
        agentTriggerRef={agentTriggerRef}
        handleSelectAgent={handleSelectAgent}
        agents={agents}
      />

      <QuickActions actions={QUICK_ACTIONS} onAction={handleQuickAction} />

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
