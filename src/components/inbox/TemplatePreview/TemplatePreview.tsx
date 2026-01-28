"use client"

import { useMemo } from "react"
import { cn } from "../../../lib/utils"
import { TemplatePreviewProps } from "./types"
import SmartDropdown from "../../smart-dropdown/SmartDropdown"
import Text from "../../ui/Text"

export default function TemplatePreview({
  template,
  isOpen,
  triggerRef,
}: TemplatePreviewProps) {
  const renderedContent = useMemo(() => {
    if (!template) return null

    let content = template.content
    const parts: Array<{ text: string; isVariable: boolean }> = []

    const variableRegex = /\{\{([^}]+)\}\}/g
    let lastIndex = 0
    let match

    while ((match = variableRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          text: content.substring(lastIndex, match.index),
          isVariable: false,
        })
      }

      parts.push({
        text: match[1],
        isVariable: true,
      })

      lastIndex = match.index + match[0].length
    }
    if (lastIndex < content.length) {
      parts.push({
        text: content.substring(lastIndex),
        isVariable: false,
      })
    }
    if (parts.length === 0) {
      parts.push({ text: content, isVariable: false })
    }

    return parts
  }, [template])

  if (!template || !isOpen) return null

  return (
    <SmartDropdown
      isOpen={isOpen && !!template}
      onClose={() => {}}
      triggerRef={triggerRef}
      placement="right-start"
      offset={8}
      className={cn(
        "bg-white rounded-xl shadow-lg border border-gray-200 p-4 ml-6",
        "min-w-[24rem] max-w-[28rem]",
        "md:block"
      )}
      closeOnClick={false}
      closeOnOutsideClick={false}
    >
      <div className="flex flex-col gap-3">
        <Text className="text-[1.6rem] font-semibold text-gray-800">
          {template.name}
        </Text>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <Text className="text-[1.4rem] text-gray-700 leading-relaxed">
            {renderedContent?.map((part, index) => {
              if (part.isVariable) {
                return (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 mx-0.5 rounded bg-gray-200 text-gray-700 text-[1.2rem] font-medium border border-gray-300"
                  >
                    {part.text}
                  </span>
                )
              }
              return <span key={index}>{part.text}</span>
            })}
          </Text>
        </div>
      </div>
    </SmartDropdown>
  )
}
