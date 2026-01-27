import { ReactNode } from "react";
import { cn } from "../../../../lib/utils";
import { isString } from "../../../../utils/is";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import { TagPill } from "../../components/TagPill";

import { GeneralInboxConversationItemProps } from "../types";

export function GeneralInboxConversationItem({
  leading,
  name,
  tag,
  timestamp,
  preview,
  className,
  onClick,
  isActive,
  unreadCount = 0,
}: GeneralInboxConversationItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative w-full flex items-center gap-4 border-b border-gray-200 px-4 py-3.75 md:px-2 lg:px-4 text-left hover:bg-input-filled",
        isActive && "bg-input-filled",
        className,
      )}
    >
      <div className="w-full">
        <div className="flex flex-wrap items-center gap-1">
          <div className="w-full sm:w-fit lg:w-full">{leading}</div>
          <div className="flex items-center gap-2">
            <Heading className="w-fit text-dark-base-100 text-base">
              {name}
            </Heading>
            <div className="sm:w-full lg:w-auto">
              {isString(tag) ? <TagPill label={tag} /> : tag}
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full mt-2">
          <Text className="truncate text-md text-gray-250 w-full">
            {preview}
          </Text>
          {(unreadCount ?? 0) > 0 && (
            <span className="text-center grid h-5 w-5 place-items-center rounded-full bg-danger-100 text-xs font-semibold text-white ml-2">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
      <div
        className="absolute sm:hidden lg:block
       top-3.75 md:top-1.25 lg:top-4 right-4 text-xs text-gray-250"
      >
        {timestamp}
      </div>
    </button>
  );
}
