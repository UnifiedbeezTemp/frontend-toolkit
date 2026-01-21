import { AttributeSection } from "../../types"
import { AttributeField } from "./AttributeField"
import { useToggle } from "../../../../hooks/useToggle"
import { ChevronDown, Plus } from "lucide-react"
import { IconName, Icons } from "./IconsMap"
import { isFunction } from "../../../../utils/is"
import { cn } from "../../../../lib/utils"
import Button from "../../../ui/Button"

interface AccordionSectionProps {
  section: AttributeSection
}

export function AccordionSection({ section }: AccordionSectionProps) {
  const { value: isExpanded, toggle } = useToggle(section.defaultExpanded)
  const Icon = Icons[section.icon as IconName]
  return (
    <div
      className={cn(
        "border border-input-stroke rounded-md overflow-hidden",
        isExpanded && "bg-input-filled"
      )}
    >
      <button
        onClick={() => toggle()}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={24} className="text-dark-base-100" />}
          <span className="text-base text-dark-base-100 font-bold">
            {section.title}
          </span>
        </div>
        <ChevronDown />
      </button>

      {isExpanded && (
        <div className="pb-2 px-4">
          {section.fields.map((field) => (
            <AttributeField key={field.id} field={field} />
          ))}
          <Button variant="secondary" className="mt-4 flex items-center gap-2 max-w-2xs font-normal px-4 py-2.5 text-dark-base-70 text-base">
            <Plus />
            <span>Create attribute</span>
          </Button>
        </div>
      )}
    </div>
  )
}
