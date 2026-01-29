import { AttributeSection } from "../../types"
import { AttributeField } from "./AttributeField"
import { useToggle } from "../../../../hooks/useToggle"
import { ChevronDown, Plus } from "lucide-react"
import { IconName, Icons } from "./IconsMap"
import { cn } from "../../../../lib/utils"
import Button from "../../../ui/Button"
import { FilledChevronIcon } from "../../../../assets/icons/FilledChevronIcon"

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
        isExpanded && "bg-input-stroke/5"
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
        <FilledChevronIcon />
      </button>

      {isExpanded && (
        <div className="pb-2 px-2.5">
          {section.fields.map((field) => (
            <div key={field.id} className="py-2.75">
              <AttributeField field={field} />
            </div>))}
          <Button variant="secondary" className="mt-4 flex items-center gap-2 font-normal px-4 py-2.5 text-dark-base-60 text-base min-w-max">
            <Plus />Create attribute
          </Button>
        </div>
      )}
    </div>
  )
}
