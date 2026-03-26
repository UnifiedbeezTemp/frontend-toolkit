import React from "react";
import { ChatMessage, ChatMode, ChatAgent } from "../types";
import ChatBubble from "./ChatBubble";
import { SmartDropdown, DropdownItem } from "../../smart-dropdown";
import ChevronDownIcon from "../../../assets/icons/ChevronDownIcon";
import { User } from "lucide-react";
import { cn } from "../../../lib/utils";

interface ChatMessagesProps {
  messages: ChatMessage[];
  mode: ChatMode;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  selectedAgent: string;
  isAgentDropdownOpen: boolean;
  setIsAgentDropdownOpen: (open: boolean) => void;
  agentTriggerRef: React.RefObject<HTMLButtonElement | null>;
  handleSelectAgent: (agentId: string) => void;
  agents: ChatAgent[];
}

export default function ChatMessages({
  messages,
  mode,
  messagesEndRef,
  selectedAgent,
  isAgentDropdownOpen,
  setIsAgentDropdownOpen,
  agentTriggerRef,
  handleSelectAgent,
  agents,
}: ChatMessagesProps) {
  const selectedAgentName =
    agents.find((a) => a.id === selectedAgent)?.name || "Select an Agent";

  return (
    <div className="flex-1 overflow-y-auto p-[1.6rem] flex flex-col gap-[1.6rem] custom-scrollbar bg-soft-green">
      {mode === "live" && (
        <div className="relative mb-[0.8rem]">
          <button
            ref={agentTriggerRef}
            onClick={() => setIsAgentDropdownOpen(true)}
            className="w-full flex items-center justify-between px-[1.4rem] py-[1.2rem] border border-border rounded-[1rem] bg-input-filled text-[1.4rem] hover:border-brand-primary transition-all shadow-sm"
          >
            <div className="flex items-center gap-[1rem]">
              <User size={18} className="text-muted" />
              <span className="text-text-primary font-semibold">
                {selectedAgentName}
              </span>
            </div>
            <ChevronDownIcon size={16} color="var(--text-primary-2)" />
          </button>
          <SmartDropdown
            isOpen={isAgentDropdownOpen}
            onClose={() => setIsAgentDropdownOpen(false)}
            triggerRef={agentTriggerRef}
            maxHeight="20rem"
          >
            <div className="p-[0.6rem]">
              {agents.map((agent) => (
                <DropdownItem
                  key={agent.id}
                  onClick={() => handleSelectAgent(agent.id)}
                  className={cn(
                    "rounded-[0.8rem] mb-[0.2rem] last:mb-0",
                    selectedAgent === agent.id ? "bg-accent" : "",
                  )}
                >
                  <div className="flex items-center gap-[1rem] text-[1.4rem] py-[0.4rem]">
                    <User size={16} className="text-muted" />
                    <span className="text-text-primary font-medium">
                      {agent.name}
                    </span>
                  </div>
                </DropdownItem>
              ))}
            </div>
          </SmartDropdown>
        </div>
      )}

      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
}
