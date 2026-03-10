import { useState, useRef } from "react";

export const AUTOMATION_TYPES = [
  "Sales & Lead Generation",
  "Support & Escalation",
  "Retention & Nurture",
  "Re-engagement & Campaigns",
] as const;

export type AutomationType = (typeof AUTOMATION_TYPES)[number];

export interface GeneralTemplateFormData {
  name: string;
  subject: string;
  message: string;
  dueDate: string;
  dueTime: string;
  list: AutomationType;
}

export function useGeneralTemplateForm(
  onCreate: (data: GeneralTemplateFormData) => void,
) {
  const [formData, setFormData] = useState<GeneralTemplateFormData>({
    name: "",
    subject: "",
    message: "",
    dueDate: "",
    dueTime: "",
    list: AUTOMATION_TYPES[1],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectAutomationType = (type: AutomationType) => {
    setFormData((prev) => ({ ...prev, list: type }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    onCreate(formData);
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return {
    formData,
    isDropdownOpen,
    dropdownTriggerRef,
    handleChange,
    handleSelectAutomationType,
    handleSubmit,
    toggleDropdown,
    setIsDropdownOpen,
  };
}
