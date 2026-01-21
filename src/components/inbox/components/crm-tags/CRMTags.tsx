import React from "react";
import { SmartDropdown } from "../../../smart-dropdown";
import { allTags } from "../../temp/crmTags";
import { cn } from "../../../../lib/utils";
import { CRMTagSection } from "./CRMTagSection";
import { CRMTagsProps } from "./types";
import { useCRMTags } from "./hooks/useCRMTags";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";

export const CRMTags = ({
  isOpen,
  onClose,
  triggerRef,
  selectedTags,
  onTagsChange,
  tags = allTags,
  className
}: CRMTagsProps) => {

  const { visibleSections, addTag } = useCRMTags(tags);

  const handleTagToggle = (tagId: string) => {
    const newSelectedTags = selectedTags.includes(tagId)
      ? selectedTags.filter(id => id !== tagId)
      : [...selectedTags, tagId];
    onTagsChange(newSelectedTags);
  };

  const handleAddTag = (label: string, category: any) => {
    if (!label) return;
    const newTag = {
      id: label.toLowerCase().replace(/\s+/g, '-'),
      label: label,
      category: category
    };
    addTag(newTag);
  }

  return (
    <SmartDropdown
      isOpen={isOpen}
      onClose={onClose}
      triggerRef={triggerRef}
      className={className}
      placement="bottom-end"
      maxHeight="60rem"
    >
      <div className="flex flex-col w-full bg-primary p-4">
        <div className="">
          <Heading className="text-base text-dark-base-100">CRM Keywords</Heading>
          <Text className="text-md text-dark-base-100/70 mt-2">
            Select CRM Tags/Keywords to attach to this conversation.
          </Text>
        </div>
        <div className="flex flex-col py-2">
          {visibleSections.map((section, index) => (
            <CRMTagSection
              key={section.id}
              categoryId={section.id}
              tags={section.tags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              onAddTag={(label) => handleAddTag(label, section.id)}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </div>
    </SmartDropdown>
  );
};
