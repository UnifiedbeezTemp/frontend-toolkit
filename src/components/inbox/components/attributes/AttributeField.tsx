import { AttributeField as AttributeFieldType } from "../../types"
import { AvatarGroup } from "../../../avatar/AvatarGroup"
import { Badge } from "../../../ui/Badge"
import { ChevronDown, Link as LinkIcon } from "lucide-react"
import { isFunction } from "../../../../utils/is"
import { Icons, IconName } from "./IconsMap"
import { TagPill } from "../TagPill"
import ToggleSwitch from "../../../ui/ToggleSwitch"

interface AttributeFieldProps {
  field: AttributeFieldType
}

export function AttributeField({ field }: AttributeFieldProps) {
  const renderValue = () => {
    switch (field.type) {
      case "tag":
        return (
          <TagPill label={field.value as string} className="rounded-[0.5rem]" />
        )
      case "badge":
        return (
          <Badge variant={field.badgeVariant}>{field.value as string}</Badge>
        )

      case "avatarGroup":
        return (
          <AvatarGroup
            overlapDirection="left"
            items={
              field.avatars?.map((avatar) => ({
                id: avatar,
                type: "image",
                src: avatar,
                alt: "",
              })) || []
            }
            count={field.avatarCount}
          />
        )

      case "toggle":
        return (
          <div className="">
            <ToggleSwitch
              isActive={(field.value as boolean) || true}
              onToggle={() => {}}
            />
          </div>
        )

      case "link":
        return (
          <button className="flex items-center gap-1.5 text-sm  hover:text-gray-900">
            <LinkIcon className="w-4 h-4" />
            <span>{field.linkText}</span>
          </button>
        )

      case "text":
      case "dropdown":
      case "dateRange":
      default:
        return (
          <span
            className={`text-sm ${
              field.value === "Enter" ? "text-dark-base-70" : ""
            }`}
          >
            {field.value as string}
          </span>
        )
    }
  }

  const Icon = Icons[field.icon as IconName]

  return (
    <div className="grid grid-cols-2 items-center gap-3 py-2.5 px-2 rounded-sm hover:bg-primary group text-base">
      <div className="flex items-center gap-3 min-w-0">
        <div className="shrink-0 text-dark-base-70">
          {Icon && <Icon size={24} />}
        </div>
        <span className="text-sm text-dark-base-70">{field.label}</span>
      </div>

      <div className="flex items-center justify-between gap-2 text-dark-base-100">
        {renderValue()}
        {field.hasDropdown && (
          <ChevronDown size={15} className="text-dark-base-70" />
        )}
      </div>
    </div>
  )
}
