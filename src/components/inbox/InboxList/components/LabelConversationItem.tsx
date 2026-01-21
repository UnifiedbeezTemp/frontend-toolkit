import React from "react"
import { cn } from "../../../../lib/utils"
import Button from "../../../ui/Button"
import { ChevronDown } from "lucide-react"
import { useLabelConversationItem } from "../hooks/useLabelConversationItem"
import { LabelConversationItemProps } from "../types"

export const LabelConversationItem = ({
  label,
  icon,
  isExpanded: controlledExpanded,
  onToggle,
  subItems = [],
  footerAction,
  className,
}: LabelConversationItemProps) => {
  const { isExpanded, handleToggle } = useLabelConversationItem({
    controlledExpanded,
    onToggle,
  })

  return (
    <div
      className={cn(
        "flex flex-col w-full bg-white border border-gray-200 rounded-[1.6rem] overflow-hidden transition-all duration-300",
        className
      )}
    >
      <div
        onClick={handleToggle}
        className="flex items-center justify-between p-[1.6rem] cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-[1.2rem]">
          {icon && (
            <div className="text-gray-600">
              {icon}
            </div>
          )}
          <span className="text-[2rem] text-text-primary font-normal">
            {label}
          </span>
        </div>
        {subItems.length > 0 && (
          <ChevronDown
            className={cn(
              "w-[2rem] h-[2rem] text-gray-400 transition-transform duration-300",
              isExpanded && "rotate-180"
            )}
          />
        )}
      </div>
      {isExpanded && subItems.length > 0 && (
        <div className="flex flex-col p-[1.6rem] pt-0 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="w-full border-t border-gray-100 mb-[1.6rem]" />
          
          <div className="flex flex-col border border-gray-200 rounded-[1.2rem] overflow-hidden bg-white">
            {subItems.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center gap-[1.2rem] p-[1.6rem] transition-colors",
                    item.onClick ? "cursor-pointer hover:bg-gray-50" : "cursor-default"
                  )}
                >
                  {item.icon && (
                    <div className="flex items-center justify-center w-[4rem] h-[4rem] rounded-[0.8rem] border border-gray-100 bg-white overflow-hidden shrink-0">
                      {item.icon}
                    </div>
                  )}
                  <span className="text-[1.8rem] text-text-primary font-normal">
                    {item.label}
                  </span>
                </div>
                {index < subItems.length - 1 && (
                  <div className="mx-[1.6rem] border-b border-gray-100" />
                )}
              </React.Fragment>
            ))}
          </div>

          {footerAction && (
            <Button
              onClick={footerAction.onClick}
              variant="primary"
              className="w-full mt-[2.4rem] bg-[#053D27] hover:bg-[#042F1E] text-white py-[1.6rem] rounded-[1.2rem] text-[1.8rem] font-normal border-none"
            >
              {footerAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
