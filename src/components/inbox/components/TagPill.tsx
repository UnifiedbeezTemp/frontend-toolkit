import TagIcon from "../../../assets/icons/TagIcon";
import { cn } from "../../../lib/utils";
import { ConversationTagNameToColorMappings } from "../constants";
import { TagPillProps } from "../types";


export function TagPill({
  label = "Wishlist-users",
  showIcon = true,
  className,
}: TagPillProps) {
  return (
    <span
      className={cn(
        "tagpill inline-flex items-center gap-0.75 rounded-full border border-current px-1 py-1 text-xs font-medium",
        ConversationTagNameToColorMappings[
          label as keyof typeof ConversationTagNameToColorMappings
        ] || "text-secondary-green-100",
        className
      )}
    >
      {showIcon && <TagIcon />}
      <span className="leading-none">{label}</span>
    </span>
  )
}
