import React from "react";
import {
  useGeneralTemplateForm,
  GeneralTemplateFormData,
} from "../hooks/useGeneralTemplateForm";
import {
  NameField,
  SubjectField,
  MessageField,
  DateTimeFields,
} from "./form-sections/GeneralTemplateFields";
import { MergeBlocksInfo } from "./form-sections/MergeBlocksInfo";
import { AutomationTypeDropdown } from "./form-sections/AutomationTypeDropdown";

interface GeneralTemplateFormProps {
  onCreate: (data: GeneralTemplateFormData) => void;
  formId: string;
}

export const GeneralTemplateForm = ({
  onCreate,
  formId,
}: GeneralTemplateFormProps) => {
  const {
    formData,
    isDropdownOpen,
    dropdownTriggerRef,
    handleChange,
    handleSelectAutomationType,
    toggleDropdown,
    setIsDropdownOpen,
  } = useGeneralTemplateForm(onCreate);

  return (
    <form
      id={formId}
      onSubmit={(e) => {
        e.preventDefault();
        onCreate(formData);
      }}
      className="flex flex-col gap-[2rem]"
    >
      <NameField formData={formData} onChange={handleChange} />
      <SubjectField formData={formData} onChange={handleChange} />
      <MessageField formData={formData} onChange={handleChange} />
      <MergeBlocksInfo />
      <DateTimeFields formData={formData} onChange={handleChange} />
      <AutomationTypeDropdown
        currentValue={formData.list}
        isOpen={isDropdownOpen}
        onToggle={toggleDropdown}
        onSelect={handleSelectAutomationType}
        onClose={() => setIsDropdownOpen(false)}
        triggerRef={dropdownTriggerRef}
      />
    </form>
  );
};
