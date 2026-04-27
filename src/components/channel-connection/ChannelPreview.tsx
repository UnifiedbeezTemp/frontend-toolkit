"use client";

import React from "react";
import ChannelPreviewHeader from "./components/ChannelPreviewHeader";
import ChannelPreviewAccountList from "./components/ChannelPreviewAccountList";
import { ChannelPreviewProps } from "./types";
import { useChannelPreview } from "./hooks/useChannelPreview";

export default function ChannelPreview({
  channel,
  isExpanded,
  onToggle,
  accounts = [],
  onEdit,
  editingAccountId,
}: ChannelPreviewProps) {
  const { icon, isConnected, connectionStatusText, icons } = useChannelPreview({
    channel,
    accounts,
  });

  return (
    <div className={`${isExpanded ? "layout-body" : ""}`}>
      <ChannelPreviewHeader
        channel={channel}
        icon={icon}
        isExpanded={isExpanded}
        isConnected={isConnected}
        connectionStatusText={connectionStatusText}
        onToggle={onToggle}
        icons={icons}
      />

      {isExpanded && (
        <ChannelPreviewAccountList
          accounts={accounts}
          editingAccountId={editingAccountId}
          onEdit={onEdit}
        />
      )}
    </div>
  );
}
