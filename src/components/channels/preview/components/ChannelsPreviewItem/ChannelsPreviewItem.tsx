"use client";

import ImageComponent from "../../../../../components/ui/ImageComponent";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import { cn } from "../../../../../lib/utils";
import CloseModalButton from "../../../../modal/CloseModalButton";
import { ChannelsPreviewItemProps } from "../../types";
import SearchBar from "../SearchBar";
import { useChannelsPreviewItem } from "./hooks/useChannelsPreviewItem";
import Text from "../../../../ui/Text";
import ChannelConnectionsList from "../ChannelConnectionsList/ChannelConnectionsList";

export default function ChannelsPreviewItem({
  channel,
  isExpanded,
  isSelected,
  onToggle,
  onSelect,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
}: ChannelsPreviewItemProps) {
  const icons = useSupabaseIcons() as Record<string, string>;

  const {
    searchQuery,
    hasAccounts,
    handleSearchChange,
    accounts,
    icon,
    handleClick,
  } = useChannelsPreviewItem({
    channel,
    onSelect,
    onToggle,
    searchQuery: externalSearchQuery,
    onSearchChange: externalOnSearchChange,
    icons,
  });

  return (
    <div className={cn("")}>
      <div
        className={cn(
          "flex items-center justify-between p-[0.8rem] px-[0.8rem] cursor-pointer transition-colors border border-input-stroke rounded-[0.8rem]",
          isExpanded && "layout-body",
        )}
        onClick={handleClick}
      >
        <div className="flex items-center gap-[1.2rem] flex-1 min-w-0">
          <ImageComponent
            src={icon}
            alt={channel.channelName}
            width={30}
            height={30}
          />

          <div className="flex-1 min-w-0">
            <Text
              size="sm"
              className={cn(
                "font-[700] truncate",
                isExpanded ? "text-text-secondary" : "text-text-secondary",
              )}
            >
              {channel.channelName}
            </Text>
          </div>
        </div>

        {hasAccounts && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="shrink-0 p-[0.4rem] hover:bg-input-filled rounded-[0.4rem] transition-colors"
          >
            {isExpanded ? (
              <ImageComponent
                src={icons.checkboxBase2}
                alt={"checkbox"}
                width={16}
                height={16}
                className={cn(
                  "text-text-secondary transition-transform",
                  isExpanded ? "" : "rotate-0",
                )}
              />
            ) : (
              <div className="w-[1.5rem] h-[1.5rem] border border-input-stroke rounded-full"></div>
            )}
          </button>
        )}
      </div>

      {isExpanded && hasAccounts && (
        <div className="pb-[1.6rem] pt-[0.8rem]">
          <div className="w-full flex items-center justify-between">
            <CloseModalButton
              onClick={onToggle}
              className="ml-auto p-[.4rem]"
            />
          </div>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
          />
          <ChannelConnectionsList
            connections={accounts}
            searchQuery={searchQuery}
            channelName={channel.channelName}
            channelIcon={icon}
          />
        </div>
      )}
    </div>
  );
}
