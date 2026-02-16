import { useState, useCallback, useMemo } from "react";
import {
  DowngradeTab,
  SwitchPreviewResponse,
  GroupedAddon,
  AffectedChannel,
} from "../types";

interface UseDowngradeWarningParams {
  previewData: SwitchPreviewResponse | null;
}

interface UseDowngradeWarningReturn {
  activeTab: DowngradeTab;
  selectedAddonTypes: Set<string>;
  selectedChannelIds: Set<number>;
  expandedGroupIds: Set<string>;
  totalItemCount: number;
  selectedCount: number;
  totalSavings: number;
  groupedAddons: GroupedAddon[];
  blockedChannels: AffectedChannel[];
  addonsCount: number;
  channelsCount: number;
  handleTabChange: (tab: DowngradeTab) => void;
  handleToggleAddon: (addonType: string) => void;
  handleToggleChannel: (channelId: number) => void;
  handleSelectAll: () => void;
  handleDeselectAll: () => void;
  handleToggleGroup: (groupId: string) => void;
  isGroupExpanded: (groupId: string) => boolean;
  isProceedDisabled: boolean;
}

export const useDowngradeWarning = ({
  previewData,
}: UseDowngradeWarningParams): UseDowngradeWarningReturn => {
  const [activeTab, setActiveTab] = useState<DowngradeTab>("addons");
  const [selectedAddonTypes, setSelectedAddonTypes] = useState<Set<string>>(
    new Set(),
  );
  const [selectedChannelIds, setSelectedChannelIds] = useState<Set<number>>(
    new Set(),
  );
  const [expandedGroupIds, setExpandedGroupIds] = useState<Set<string>>(
    new Set(),
  );

  const groupedAddons = useMemo((): GroupedAddon[] => {
    if (!previewData) return [];

    const groups = new Map<string, GroupedAddon>();

    for (const addon of previewData.changes.refunded) {
      const existing = groups.get(addon.addonType);
      if (existing) {
        existing.totalQuantity += addon.quantity;
        existing.totalRefund += addon.estimatedRefund;
        existing.items.push(addon);
      } else {
        groups.set(addon.addonType, {
          addonType: addon.addonType,
          name: addon.name,
          totalQuantity: addon.quantity,
          totalRefund: addon.estimatedRefund,
          reason: addon.reason,
          items: [addon],
        });
      }
    }

    return Array.from(groups.values());
  }, [previewData]);

  const blockedChannels = useMemo(
    () => previewData?.affectedChannels.planBlocked ?? [],
    [previewData],
  );

  const addonsCount = groupedAddons.length;
  const channelsCount = blockedChannels.length;

  const totalItemCount = addonsCount + channelsCount;
  const selectedCount = selectedAddonTypes.size + selectedChannelIds.size;

  const totalSavings = useMemo(() => {
    let savings = 0;

    for (const group of groupedAddons) {
      if (selectedAddonTypes.has(group.addonType)) {
        savings += group.totalRefund;
      }
    }

    return savings / 100;
  }, [groupedAddons, selectedAddonTypes]);

  const handleTabChange = useCallback((tab: DowngradeTab) => {
    setActiveTab(tab);
  }, []);

  const handleToggleAddon = useCallback((addonType: string) => {
    setSelectedAddonTypes((prev) => {
      const next = new Set(prev);
      if (next.has(addonType)) {
        next.delete(addonType);
      } else {
        next.add(addonType);
      }
      return next;
    });
  }, []);

  const handleToggleChannel = useCallback((channelId: number) => {
    setSelectedChannelIds((prev) => {
      const next = new Set(prev);
      if (next.has(channelId)) {
        next.delete(channelId);
      } else {
        next.add(channelId);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    const allAddonTypes = groupedAddons.map((g) => g.addonType);
    const allChannelIds = blockedChannels.map((c) => c.channelId);
    setSelectedAddonTypes(new Set(allAddonTypes));
    setSelectedChannelIds(new Set(allChannelIds));
  }, [groupedAddons, blockedChannels]);

  const handleDeselectAll = useCallback(() => {
    setSelectedAddonTypes(new Set());
    setSelectedChannelIds(new Set());
  }, []);

  const handleToggleGroup = useCallback((groupId: string) => {
    setExpandedGroupIds((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  }, []);

  const isGroupExpanded = useCallback(
    (groupId: string) => expandedGroupIds.has(groupId),
    [expandedGroupIds],
  );

  return {
    activeTab,
    selectedAddonTypes,
    selectedChannelIds,
    expandedGroupIds,
    totalItemCount,
    selectedCount,
    totalSavings,
    groupedAddons,
    blockedChannels,
    addonsCount,
    channelsCount,
    handleTabChange,
    handleToggleAddon,
    handleToggleChannel,
    handleSelectAll,
    handleDeselectAll,
    handleToggleGroup,
    isGroupExpanded,
    isProceedDisabled: totalItemCount > 0 && selectedCount < totalItemCount,
  };
};
