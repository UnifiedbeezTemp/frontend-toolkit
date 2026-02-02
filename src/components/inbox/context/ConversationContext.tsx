"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Conversation } from "../types";
import {
  generalInboxConversations as initialGeneral,
  teamInboxConversations as initialTeam,
} from "../utils/dummyData";

interface ConversationContextType {
  generalConversations: Conversation[];
  teamConversations: Conversation[];
  filteredGeneralConversations: Conversation[];
  filteredTeamConversations: Conversation[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  addConversation: (conversation: Conversation) => void;
  markAsRead: (id: string) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(
  undefined,
);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [generalConversations, setGeneralConversations] =
    useState<Conversation[]>(initialGeneral);
  const [teamConversations, setTeamConversations] =
    useState<Conversation[]>(initialTeam);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const addConversation = (conversation: Conversation) => {
    setGeneralConversations((prev) => [conversation, ...prev]);
  };

  const markAsRead = (id: string) => {
    const updater = (prev: Conversation[]) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c));
    setGeneralConversations(updater);
    setTeamConversations(updater);
  };

  const filterConversations = (conversations: Conversation[]) => {
    return conversations.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.preview.toLowerCase().includes(searchQuery.toLowerCase());

      const isUnreadFilter = activeFilter.toLowerCase().includes("unread");
      const matchesFilter = isUnreadFilter ? (c.unreadCount || 0) > 0 : true;

      return matchesSearch && matchesFilter;
    });
  };

  const filteredGeneralConversations =
    filterConversations(generalConversations);
  const filteredTeamConversations = filterConversations(teamConversations);

  return (
    <ConversationContext.Provider
      value={{
        generalConversations,
        teamConversations,
        filteredGeneralConversations,
        filteredTeamConversations,
        searchQuery,
        setSearchQuery,
        activeFilter,
        setActiveFilter,
        addConversation,
        markAsRead,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversations() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error(
      "useConversations must be used within a ConversationProvider",
    );
  }
  return context;
}
