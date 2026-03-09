import { useState, useRef } from "react";
import { MarketingChannel } from "../../shared/types";
import { CHANNELS } from "../utils";

export function useListsHeader(
  channelFilter: MarketingChannel | null,
  onChannelFilter: (channel: MarketingChannel | null) => void,
  onSelectAll: () => void,
  onClearSelection: () => void,
  onDeleteSelected: () => void,
  selectedCount: number,
) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const filterTriggerRef = useRef<HTMLButtonElement>(null);
  const actionsTriggerRef = useRef<HTMLButtonElement>(null);

  const handleFilterSelect = (channel: MarketingChannel | null) => {
    onChannelFilter(channel);
    setIsFilterOpen(false);
  };

  const handleSelectAll = () => {
    onSelectAll();
    setIsActionsOpen(false);
  };

  const handleClearSelection = () => {
    onClearSelection();
    setIsActionsOpen(false);
  };

  const handleDeleteSelected = () => {
    onDeleteSelected();
    setIsActionsOpen(false);
  };

  return {
    isFilterOpen,
    setIsFilterOpen,
    isActionsOpen,
    setIsActionsOpen,
    filterTriggerRef,
    actionsTriggerRef,
    channelFilter,
    channels: CHANNELS,
    selectedCount,
    handleFilterSelect,
    handleSelectAll,
    handleClearSelection,
    handleDeleteSelected,
  };
}
