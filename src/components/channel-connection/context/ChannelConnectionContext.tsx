"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { getAvailableAndSelectedChannels } from "../../../utils/channels/getAvailableAndSelectedChannels";
import {
  SelectedChannel,
  SelectedChannelsResponse,
} from "../../../types/channelApiTypes";
import { AccountDisplayData } from "../../../types/channelAccountDetailTypes";
import { ChannelConnection } from "../../../types/channelConnectionTypes";

interface ChannelConnectionContextType {
  selectedChannels: SelectedChannelsResponse | null;
  activeChannelId: number | null;
  activeChannel: SelectedChannel | undefined;
  editingAccount: ChannelConnection | AccountDisplayData | null;
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;

  setActiveChannelId: (id: number | null) => void;
  setEditingAccount: (
    account: ChannelConnection | AccountDisplayData | null,
  ) => void;
  handleSelectChannel: (channelId: number) => void;
  handleEditAccount: (
    account: ChannelConnection | AccountDisplayData | null,
  ) => void;
  handleClose: () => void;
  refetch: () => void;
}

const ChannelConnectionContext = createContext<
  ChannelConnectionContextType | undefined
>(undefined);

export function ChannelConnectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { selectedChannels, isLoading, isFetching, error, refetch } =
    getAvailableAndSelectedChannels();

  const [activeChannelId, setActiveChannelId] = useState<number | null>(null);
  const [editingAccount, setEditingAccount] = useState<
    ChannelConnection | AccountDisplayData | null
  >(null);

  const activeChannel = useMemo(
    () => selectedChannels?.channels.find((ch) => ch.id === activeChannelId),
    [selectedChannels, activeChannelId],
  );

  useEffect(() => {
    if (
      !activeChannelId &&
      selectedChannels?.channels?.length &&
      selectedChannels?.channels?.length > 0
    ) {
      setActiveChannelId(selectedChannels?.channels?.[0].id);
    }
  }, []);

  const handleSelectChannel = (channelId: number) => {

    if(channelId === activeChannel?.id) {
      setActiveChannelId(null);
    } else {
      setActiveChannelId(channelId);
    }
    setEditingAccount(null);
  };

  const handleEditAccount = (
    account: ChannelConnection | AccountDisplayData | null,
  ) => {
    setEditingAccount(account);
  };

  const handleClose = () => {
    setActiveChannelId(null);
    setEditingAccount(null);
  };

  const value = {
    selectedChannels,
    activeChannelId,
    activeChannel,
    editingAccount,
    isLoading,
    isFetching,
    error,

    setActiveChannelId,
    setEditingAccount,
    handleSelectChannel,
    handleEditAccount,
    handleClose,
    refetch,
  };

  return (
    <ChannelConnectionContext.Provider value={value}>
      {children}
    </ChannelConnectionContext.Provider>
  );
}

export function useChannelConnectionContext() {
  const context = useContext(ChannelConnectionContext);
  if (context === undefined) {
    throw new Error(
      "useChannelConnectionContext must be used within a ChannelConnectionProvider",
    );
  }
  return context;
}
