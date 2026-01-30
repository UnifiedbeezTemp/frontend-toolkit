"use client"

import { ReactNode } from "react"
import { IncomingChatBubble } from "../ChatBubbles/IncomingChatBubble"
import { OwnChatBubble } from "../ChatBubbles/OwnChatBubble"
import { GroupIncomingBubble } from "../ChatBubbles/GroupIncomingBubble"
import { useMessageWrapper } from "./hooks/useMessageWrapper"
import { cn } from "../../../lib/utils"

export type MessageType = "incoming" | "own" | "group"

export interface Message {
  id: string
  type: MessageType
  text: string
  timestamp: string
  senderName?: string
  senderAvatar?: string
}

interface MessageWrapperProps {
  message: Message
  onLongPress: (messageId: string, element: HTMLElement) => void
}

export default function MessageWrapper({
  message,
  onLongPress,
}: MessageWrapperProps) {
  const { longPressHandlers, handleContextMenu } = useMessageWrapper({
    messageId: message.id,
    onLongPress,
  });

  const renderBubble = (): ReactNode => {
    if (message.type === "own") {
      return <OwnChatBubble>{message.text}</OwnChatBubble>
    } else if (message.type === "group") {
      return (
        <GroupIncomingBubble
          avatar={message.senderAvatar || ""}
          name={message.senderName || "Team Member"}
          message={message.text}
        />
      )
    } else {
      return <IncomingChatBubble>{message.text}</IncomingChatBubble>
    }
  }

  return (
    <div
      {...longPressHandlers}
      onContextMenu={handleContextMenu}
      className={cn("relative w-fit", message.type === "own" && "ml-auto")}
    >
      {renderBubble()}
    </div>
  )
}
