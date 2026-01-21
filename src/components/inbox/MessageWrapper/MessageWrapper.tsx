"use client"

import { useRef, ReactNode } from "react"
import { useLongPress } from "../../../hooks/useLongPress"
import { IncomingChatBubble } from "../ChatBubbles/IncomingChatBubble"
import { OwnChatBubble } from "../ChatBubbles/OwnChatBubble"
import { GroupIncomingBubble } from "../ChatBubbles/GroupIncomingBubble"

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
  const messageRef = useRef<HTMLDivElement>(null)

  const longPressHandlers = useLongPress({
    onLongPress: (e) => {
      if (e.currentTarget instanceof HTMLElement) {
        onLongPress(message.id, e.currentTarget)
      }
    },
  })

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault() // Prevent default browser context menu
    if (e.currentTarget instanceof HTMLElement) {
      onLongPress(message.id, e.currentTarget)
    }
  }

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
      ref={messageRef}
      {...longPressHandlers}
      onContextMenu={handleContextMenu}
      className="relative"
    >
      {renderBubble()}
    </div>
  )
}
