"use client";

import SearchIcon from "../../../../assets/icons/SearchIcon";
import FunnelIcon from "../../../../assets/icons/FunnelIcon";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import Button from "../../../ui/Button";
import Input from "../../../forms/Input";
import MoreVerticalIcon from "../../../../assets/icons/MoreVerticalIcon";
import SmartDropdown from "../../../smart-dropdown/SmartDropdown";
import { DropdownItem } from "../../../smart-dropdown/DropdownItem";
import { useListsHeader } from "../hooks/useListsHeader";
import { MarketingChannel } from "../../shared/types";
import ImageComponent from "../../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { getChannelIcon } from "../utils";
import CheckBox from "../../../ui/CheckBox";

interface ListsHeaderProps {
  activeTab: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCreateList: () => void;
  channelFilter: MarketingChannel | null;
  onChannelFilter: (channel: MarketingChannel | null) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDeleteSelected: () => void;
  selectedCount: number;
}

export default function ListsHeader({
  activeTab,
  searchQuery,
  onSearchChange,
  onCreateList,
  channelFilter,
  onChannelFilter,
  onSelectAll,
  onClearSelection,
  onDeleteSelected,
  selectedCount,
}: ListsHeaderProps) {
  const {
    isFilterOpen,
    setIsFilterOpen,
    isActionsOpen,
    setIsActionsOpen,
    filterTriggerRef,
    actionsTriggerRef,
    channels,
    handleFilterSelect,
    handleSelectAll,
    handleClearSelection,
    handleDeleteSelected,
  } = useListsHeader(
    channelFilter,
    onChannelFilter,
    onSelectAll,
    onClearSelection,
    onDeleteSelected,
    selectedCount,
  );

  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[1.6rem] p-[1.2rem] border-b border-border">
      <div className="flex items-center gap-[0.8rem]">
        <span className="text-[1.6rem] font-semibold text-dark">List</span>
        <div className="border border-border text-dark-base-70 px-[0.8rem] py-[0.2rem] text-[1.2rem] rounded-full">
          {activeTab}
        </div>
      </div>

      <div className="flex items-center gap-[1.2rem] w-full sm:w-auto">
        <Button
          variant="primary"
          className="grad-btn flex items-center gap-[1rem]"
          onClick={onCreateList}
        >
          <PlusIcon className="" />
          <span className="">Create List</span>
        </Button>

        <div className="relative flex-1 sm:w-[24rem]">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search forms"
            className=""
            leftIcon={<SearchIcon className="" />}
          />
        </div>

        <Button
          variant="secondary"
          className=""
          ref={filterTriggerRef}
          onClick={() => setIsFilterOpen(true)}
        >
          <FunnelIcon className="h-[2rem] w-[2rem] text-text-primary" />
        </Button>
        <SmartDropdown
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          triggerRef={filterTriggerRef}
          maxHeight="24rem"
          className="min-w-[18rem]"
        >
          <div className="p-[0.4rem]">
            <DropdownItem
              onClick={() => handleFilterSelect(null)}
              className={!channelFilter ? "bg-accent" : ""}
            >
              <span className="text-[1.4rem]">All Channels</span>
            </DropdownItem>
            {channels.map((channel: MarketingChannel) => (
              <DropdownItem
                key={channel}
                onClick={() => handleFilterSelect(channel)}
                className={channelFilter === channel ? "bg-accent" : ""}
              >
                <div className="flex items-center gap-[0.8rem]">
                  <ImageComponent
                    src={getChannelIcon(channel, icons)}
                    alt={channel}
                    width={18}
                    height={18}
                  />
                  <span className="text-[1.4rem]">{channel}</span>
                </div>
              </DropdownItem>
            ))}
          </div>
        </SmartDropdown>

        <Button
          variant="secondary"
          className="border-0"
          ref={actionsTriggerRef}
          onClick={() => setIsActionsOpen(true)}
        >
          <MoreVerticalIcon size={20} />
        </Button>
        <SmartDropdown
          isOpen={isActionsOpen}
          onClose={() => setIsActionsOpen(false)}
          triggerRef={actionsTriggerRef}
          maxHeight="24rem"
          className="min-w-[18rem]"
        >
          <div className="p-[0.4rem] min-w-[16rem]">
            <DropdownItem onClick={handleSelectAll}>
              <CheckBox
                checked={false}
                onChange={handleSelectAll}
                className="w-[1.6rem] h-[1.6rem]"
              />
              <span className="text-[1.4rem]">Select All</span>
            </DropdownItem>
            <DropdownItem
              onClick={handleClearSelection}
              disabled={selectedCount === 0}
            >
              <span className="text-[1.4rem]">Clear Selection</span>
            </DropdownItem>
            <DropdownItem
              onClick={handleDeleteSelected}
              disabled={selectedCount === 0}
            >
              <span className="text-[1.4rem] text-destructive">
                Delete Selected ({selectedCount})
              </span>
            </DropdownItem>
          </div>
        </SmartDropdown>
      </div>
    </div>
  );
}
