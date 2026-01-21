"use client";

import ImageComponent from "../ui/ImageComponent";
import {
  useSupabaseIcons,
  useSupabaseImages,
} from "../../lib/supabase/useSupabase";
import { ChatMessage } from "./types";
import { cn } from "../../lib/utils";
import { useUser } from "../../contexts/UserContext";

interface MessageBubbleProps {
  message: ChatMessage;
  assistantName: string;
}

export default function MessageBubble({
  message,
  assistantName,
}: MessageBubbleProps) {
  const icons = useSupabaseIcons();
  const images = useSupabaseImages();
  const isUser = message.sender === "user";

  const { user } = useUser();

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "flex items-end gap-[1rem] max-w-[90%]",
          isUser && "flex-row-reverse"
        )}
      >
        {/* Avatar */}
        <div
          className={cn(
            "w-[4rem] h-[4rem] rounded-full flex-shrink-0 relative",
            isUser ? "bg-primary" : "border border-input-stroke p-[0.6rem]"
          )}
        >
          <ImageComponent
            src={
              isUser ? user?.profilePhoto || images.avatar : icons.beeGreenLeft
            }
            alt={isUser ? "User" : "Assistant"}
            width={40}
            height={40}
            className="rounded-full w-full h-full object-cover"
          />

          <div
            className={cn(
              "w-[1rem] h-[1rem] bg-success rounded-full border border-white absolute",
              isUser ? "bottom-[.1rem] right-0" : "bottom-[-.1rem] right-0"
            )}
          />
        </div>

        {/* Message Content */}
        <div
          className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
        >
          <div
            className={cn(
              "rounded-[1.2rem] py-[1rem] px-[1.4rem] max-w-[85%] relative flex items-end gap-[1rem]",
              isUser
                ? "bg-[linear-gradient(267deg,var(--brand-primary)_-12.17%,var(--brand-secondary)_125.17%)] text-white rounded-tr-none"
                : "bg-soft-green border border-border rounded-tl-none text-text-secondary"
            )}
          >
            <p
              className={cn(
                "text-[1.6rem] mb-[0.5rem]",
                isUser && "text-right"
              )}
            >
              {message.text}
            </p>
            <p
              className={cn(
                "text-[1rem] font-[700] opacity-70 mb-[.7rem]",
                isUser && "text-right"
              )}
            >
              {message.timestamp}
            </p>
          </div>

          <span className="text-[1.4rem] text-black font-[700] mt-[0.7rem]">
            {isUser ? user?.fullName || "You" : "Beezora"}
          </span>
        </div>
      </div>
    </div>
  );
}
