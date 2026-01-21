import TagIcon from "../../../assets/icons/TagIcon";
import { cn } from "../../../lib/utils"
import { TagPillProps } from "../types";
import { allTags } from "../temp/crmTags"
import { CATEGORY_CONFIG } from "./crm-tags/config"

export function TagPill({
  label = "Wishlist-user",
  showIcon = true,
  className,
}: TagPillProps) {
  // Find the tag by label to get its category
  const tag = allTags.find((t) => t.label === label)

  // Get the color from the category config
  const textColor = tag?.category
    ? CATEGORY_CONFIG[tag.category]?.textColor || "text-secondary-green-100"
    : "text-secondary-green-100"

  return (
    <span
      className={cn(
        "tagpill inline-flex items-center gap-0.75 rounded-full border border-current px-1 py-1 text-xs font-medium",
        textColor,
        className
      )}
    >
      {showIcon && <TagIcon />}
      <span className="leading-none">{label}</span>
    </span>
  )
}
