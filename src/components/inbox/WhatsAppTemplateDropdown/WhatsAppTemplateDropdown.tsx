"use client"

import { useState, useMemo, useRef } from "react"
import { Search, Plus, MessageSquare } from "lucide-react"
import { cn } from "../../../lib/utils"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { WhatsAppTemplateDropdownProps, WhatsAppTemplate } from "./types"
import { mockWhatsAppTemplates } from "./constants"
import SmartDropdown from "../../smart-dropdown/SmartDropdown"
import { DropdownItem } from "../../smart-dropdown/DropdownItem"

export default function WhatsAppTemplateDropdown({
  isOpen,
  onClose,
  triggerRef,
  onTemplateSelect,
  onTemplateHover,
  onCreateTemplate,
}: WhatsAppTemplateDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const templateItemRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const filteredTemplates = useMemo(() => {
    if (!searchQuery.trim()) return mockWhatsAppTemplates
    return mockWhatsAppTemplates.filter((template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleTemplateClick = (template: WhatsAppTemplate) => {
    onTemplateSelect?.(template)
    onClose()
  }

  const handleTemplateHover = (template: WhatsAppTemplate | null) => {
    const element = template ? templateItemRefs.current.get(template.id) : null
    onTemplateHover?.(template, element)
  }

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      placement="top-start"
      offset={8}
      className={cn(
        "bg-white rounded-xl shadow-lg border border-gray-200 p-4",
        "min-w-[28rem] min-h-[40rem] max-w-[32rem] max-h-[60vh] overflow-y-auto",
        "md:block"
      )}
      maxHeight="40rem"
      closeOnClick={false}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search inbox"
              leftIcon={<Search size={16} className="text-gray-400" />}
              className="w-full"
            />
          </div>
          <Button
            variant="primary"
            className="h-10 w-10 p-0 flex items-center justify-center shrink-0"
            onClick={() => {
              onCreateTemplate?.()
              onClose()
            }}
          >
            <Plus size={18} />
          </Button>
        </div>

        <div className="flex flex-col gap-1">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              ref={(el) => {
                if (el) {
                  templateItemRefs.current.set(template.id, el)
                } else {
                  templateItemRefs.current.delete(template.id)
                }
              }}
              onMouseEnter={(e) => {
                handleTemplateHover(template)
              }}
              onMouseLeave={() => handleTemplateHover(null)}
              className="cursor-pointer"
            >
              <DropdownItem
                onClick={() => handleTemplateClick(template)}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg"
              >
                <MessageSquare size={18} className="text-gray-600 shrink-0" />
                <span className="text-[1.4rem] text-gray-700 flex-1">
                  {template.name}
                </span>
              </DropdownItem>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[1.4rem] text-gray-500">No templates found</p>
          </div>
        )}
      </div>
    </SmartDropdown>
  )
}
