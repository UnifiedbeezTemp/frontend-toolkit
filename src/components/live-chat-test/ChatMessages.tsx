"use client";

import {
  useSupabaseIcons,
  useSupabaseImages,
} from "../../lib/supabase/useSupabase";
import { ChatMessage } from "./hooks/useChat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useRef, useEffect } from "react";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
  typingText: string;
  assistantName: string;
}

export default function ChatMessages({
  messages,
  isTyping,
  typingText,
  assistantName,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const icons = useSupabaseIcons();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, typingText]);

  return (
    <div
      className="bg-cover bg-center bg-no-repeat overflow-y-auto p-5 flex-1"
      style={{ backgroundImage: `url(${icons.rectangle4})` }}
    >
      <div className="space-y-5 flex flex-col h-[40vh] xl:h-[auto] overflow-y-scroll">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            assistantName={assistantName}
          />
        ))}
        <div ref={messagesEndRef} className=" bg-[red]" />

        {isTyping && (
          <TypingIndicator
            typingText={typingText}
            assistantName={assistantName}
          />
        )}
      </div>
    </div>
  );
}
