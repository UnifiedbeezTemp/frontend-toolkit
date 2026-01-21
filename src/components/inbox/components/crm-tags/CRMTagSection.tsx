import { useState } from "react";
import React from "react";
import { Plus, ChevronDown } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { CATEGORY_CONFIG } from "./config";
import { CRMTagItem } from "./CRMTagItem";
import { CRMTagSectionProps } from "./types";
import { useTagInput } from "./hooks/useTagInput";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";

export const CRMTagSection = ({
  categoryId,
  tags,
  selectedTags,
  onTagToggle,
  onAddTag,
  defaultOpen = false
}: CRMTagSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const {
    isAdding,
    newTagLabel,
    setNewTagLabel,
    inputRef,
    startAdding,
    handleKeyDown,
    handleBlur
  } = useTagInput({ categoryId, onAddTag });

  const config = CATEGORY_CONFIG[categoryId];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className="px-1.5 py-2.5 flex flex-col gap-3">
      <div 
        className="flex items-center gap-2 text-md font-semibold text-dark-base-70 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className={cn("w-3.5 h-3.5", config.headerIconColor)} />
        <span>{config.label}</span>
        <div className="ml-auto">
          <ChevronDown className={cn("w-2.5 h-2.5 text-gray-400 transition-transform duration-200", isOpen && "rotate-180")} />
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-2 px-1.5 py-2 border border-gray-200 rounded-md">
            {tags.map(tag => (
            <CRMTagItem
                key={tag.id}
                tag={tag}
                isSelected={selectedTags.includes(tag.id)}
                onToggle={onTagToggle}
                config={config}
            />
            ))}
            {isAdding ? (
            <div className="mt-2 mx-1">
                <Input
                ref={inputRef}
                type="text"
                value={newTagLabel}
                onChange={(e) => setNewTagLabel(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="Type tag name..."
                className="text-md py-1.5 placeholder:text-md"
                />
            </div>
            ) : (
            <Button
                onClick={startAdding}
                variant="secondary"
                className="flex items-center gap-1.5 px-3 py-1.5 text-md text-brand-primary bg-primary border-brand-primary rounded-md w-fit hover:bg-gray-50 transition-colors mt-2 mx-1 shadow-sm font-normal"
            >
                <span>Add Tags/Keywords</span>
                <Plus className="w-4 h-4" />
            </Button>
            )}
        </div>
      )}

    </div>
  );
};
