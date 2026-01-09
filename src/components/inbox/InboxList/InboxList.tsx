"use client"

import { InboxSearchAndFilters } from "./FilterComponents"
import { InboxListTopToolBar } from "./InboxListTopToolBar"
import { GeneralInboxConversationItem } from "../GeneralInboxConversationItem"
import { TeamInboxConversationItem } from "../TeamInboxConversationItem"
import InboxListContainer from "./InboxListContainer"
import { useToggle } from "../../../hooks/useToggle"
import { ReactNode } from "react"
import PanelShell from "../ChannelsPanel/PanelShell"
import PanelCollapseIcon from "../../../assets/icons/PanelCollapseIcon"
import IconButton from "../../ui/IconButton"
import Heading from "../../ui/Heading"
import ChannelsList from "../ChannelsPanel/ChannelsList"
import { InboxType, inboxTypeLabels, Conversation } from "../utils/dummyData"
import { useRouter } from "next/navigation"
import Avatar from "../../ui/Avatar"

export default function InboxList({
  sideDrawerContent = <ChannelsList />,
  sideDrawerTitle = "Connect Channels",
  generalInboxConversations,
  teamInboxConversations,
  selectedInboxType,
  onInboxTypeChange,
  selectedConversationId,
  onConversationSelect,
}: {
  sideDrawerContent?: ReactNode
  sideDrawerTitle?: string
  generalInboxConversations: Conversation[]
  teamInboxConversations: Conversation[]
  selectedInboxType: InboxType
  onInboxTypeChange: (type: InboxType) => void
  selectedConversationId?: string | null
  onConversationSelect?: (conversationId: string | null) => void
}) {
  const router = useRouter()
  const {
    setTrue: openSideDrawer,
    value: isSideDrawerOpen,
    setFalse: closeSideDrawer,
  } = useToggle()

  const handleInboxTypeChange = (type: InboxType) => {
    onInboxTypeChange(type)
    // Navigate back to inbox page when switching inbox types
    router.push("/inbox")
  }

  const handleConversationClick = (conversationId: string) => {
    // Navigate to conversation page
    router.push(`/inbox/${conversationId}`)
  }

  const conversations =
    selectedInboxType === "general"
      ? generalInboxConversations
      : teamInboxConversations

  const currentTitle = inboxTypeLabels[selectedInboxType]
  return (
    <div className="absolute flex w-full">
      <PanelShell
        isOpen={isSideDrawerOpen}
        className="h-[calc(100dvh-16.5rem)] sm:h-[calc(100dvh-5.7rem)] overflow-auto "
      >
        <div className="flex items-center justify-between">
          <Heading className="text-dark-base-40 text-md">
            {sideDrawerTitle}
          </Heading>
          <IconButton
            onClick={closeSideDrawer}
            variant="secondary"
            icon={<PanelCollapseIcon />}
            ariaLabel="Open Drawer"
          />
        </div>
        {sideDrawerContent}
      </PanelShell>
      <InboxListContainer
        className="grow"
        header={
          <div className="flex flex-col">
            <InboxListTopToolBar
              onLeftClick={isSideDrawerOpen ? closeSideDrawer : openSideDrawer}
              title={currentTitle}
              leftIcon={undefined}
              selectedInboxType={selectedInboxType}
              onInboxTypeChange={handleInboxTypeChange}
            />
            <InboxSearchAndFilters />
          </div>
        }
        body={
          <div>
            {conversations.map((conversation) => {
              const leading = conversation.avatarUrl ? (
                <Avatar
                  src={conversation.avatarUrl}
                  alt={conversation.name}
                  name={conversation.name}
                  size="sm"
                />
              ) : (
                <div
                  className={`h-10 w-10 rounded-full ${conversation.avatarColor}`}
                />
              )

              if (selectedInboxType === "general") {
                const generalLeading = conversation.avatarUrl ? (
                  <Avatar
                    src={conversation.avatarUrl}
                    alt={conversation.name}
                    name={conversation.name}
                    size="sm"
                  />
                ) : (
                  leading
                )
                return (
                  <GeneralInboxConversationItem
                    key={conversation.id}
                    leading={generalLeading}
                    name={conversation.name}
                    tag={conversation.tag}
                    timestamp={conversation.timestamp}
                    preview={conversation.preview}
                    onClick={() => handleConversationClick(conversation.id)}
                    isActive={selectedConversationId === conversation.id}
                  />
                )
              } else {
                return (
                  <TeamInboxConversationItem
                    key={conversation.id}
                    leading={leading}
                    name={conversation.name}
                    timestamp={conversation.timestamp}
                    unreadCount={conversation.unreadCount}
                    preview={conversation.preview}
                    onClick={() => handleConversationClick(conversation.id)}
                    isActive={selectedConversationId === conversation.id}
                    isGroup={conversation.isGroup || false}
                    participants={conversation.participants || []}
                    participantAvatars={conversation.participantAvatars || []}
                  />
                )
              }
            })}
          </div>
        }
      />
    </div>
  )
}
