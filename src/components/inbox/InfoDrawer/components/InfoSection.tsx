import { useState, ReactNode } from "react"
import { cn } from "../../../../lib/utils"
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon"
import Text from "../../../ui/Text"

interface InfoSectionProps {
  title: string
  subtitle?: string
  icon: ReactNode
  children: ReactNode
  defaultExpanded?: boolean
  showAddButton?: boolean
  onAdd?: () => void
}

export default function InfoSection({
  title,
  subtitle,
  icon,
  children,
  defaultExpanded = false,
  showAddButton = false,
  onAdd,
}: InfoSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="border-b border-input-stroke last:border-b-0">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="text-text-primary">{icon}</div>
          <div className="flex-1">
            <Text className="text-[1.6rem] font-semibold text-text-primary">
              {title}
            </Text>
            {subtitle && (
              <div className="flex items-center justify-between mt-1">
                <Text className="text-[1.2rem] text-text-secondary">
                  {subtitle}
                </Text>
                {showAddButton && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onAdd?.()
                    }}
                    className="text-[1.2rem] text-brand-primary font-medium hover:underline"
                  >
                    Add
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <ChevronDownIcon
          className={cn(
            "transition-transform duration-200",
            isExpanded && "rotate-180"
          )}
        />
      </div>
      {isExpanded && (
        <div className="pb-4 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  )
}
