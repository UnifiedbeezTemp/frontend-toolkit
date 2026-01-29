"use client";

import { InboxSearchAndFilters } from "./FilterComponents";
import { InboxListTopToolBar } from "./InboxListTopToolBar";
import { GeneralInboxConversationItem } from "./components/GeneralInboxConversationItem";
import { TeamInboxConversationItem } from "./components/TeamInboxConversationItem";
import InboxListContainer from "./InboxListContainer";
import { ReactNode } from "react";
import PanelShell from "../ChannelsPanel/PanelShell";
import PanelCollapseIcon from "../../../assets/icons/PanelCollapseIcon";
import IconButton from "../../ui/IconButton";
import Heading from "../../ui/Heading";
import { inboxTypeLabels } from "../utils/dummyData";
import { InboxType, Conversation } from "../types";
import Avatar from "../../ui/Avatar";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import { useInboxList } from "./hooks/useInboxList";

export default function InboxList({
  sideDrawerContent,
  sideDrawerTitle = "Connect Channels",
  selectedInboxType,
  onInboxTypeChange,
  selectedConversationId,
}: {
  sideDrawerContent?: ReactNode;
  sideDrawerTitle?: string;
  selectedInboxType: InboxType;
  onInboxTypeChange: (type: InboxType) => void;
  selectedConversationId?: string | null;
  onConversationSelect?: (conversationId: string | null) => void;
}) {
  const {
    filteredGeneralConversations,
    filteredTeamConversations,
    isSideDrawerOpen,
    openSideDrawer,
    closeSideDrawer,
    handleInboxTypeChange,
    handleConversationClick,
  } = useInboxList({ onInboxTypeChange });

  const icons = useSupabaseIcons();

  const conversations =
    selectedInboxType === "general"
      ? filteredGeneralConversations
      : filteredTeamConversations;

  const currentTitle = inboxTypeLabels[selectedInboxType];

  return (
    <div className="absolute flex w-full">
      <PanelShell
        isOpen={isSideDrawerOpen}
        className="h-[calc(100dvh-16.5rem)] sm:h-[calc(100dvh-5.7rem)] overflow-auto"
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
              selectedInboxType={selectedInboxType}
              onInboxTypeChange={handleInboxTypeChange}
            />
            <InboxSearchAndFilters inboxType={selectedInboxType} />
          </div>
        }
        body={
          <div>
            {conversations.map((conversation: Conversation) => {
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
              );

              if (selectedInboxType === "general") {
                const channelIcon = conversation.channel
                  ? (icons as any)[
                      {
                        whatsapp: "whatsappIcon",
                        instagram: "instagramLogo",
                        facebook: "facebookMessengerLogo",
                        telegram: "telegramLogo",
                        linkedin: "linkedinLogo",
                        sms: "twilioSmsIcon",
                        email: "emailRedIcon",
                        phone: "twilioPhoneIcon",
                        "website-chat": "websiteWebChatIcon",
                      }[conversation.channel] || ""
                    ]
                  : null;

                const generalLeading = channelIcon ? (
                  <ImageComponent
                    src={channelIcon}
                    alt={conversation.channel || "channel"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : conversation.avatarUrl ? (
                  <Avatar
                    src={conversation.avatarUrl}
                    alt={conversation.name}
                    name={conversation.name}
                    size="sm"
                  />
                ) : (
                  leading
                );
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
                    unreadCount={conversation.unreadCount}
                  />
                );
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
                );
              }
            })}
          </div>
        }
      />
    </div>
  );
}
