import { useState, useRef, FormEvent } from "react";
import { MergeField, MergeFieldCategory } from "../types";
import { MERGE_FIELD_TABS } from "../constants";

interface CreateFieldFormData {
  name: string;
  category: MergeFieldCategory;
}

export function useCreateField(
  onClose: () => void,
  addField: (field: MergeField) => void,
) {
  const [formData, setFormData] = useState<CreateFieldFormData>({
    name: "",
    category: "audience",
  });

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryTriggerRef = useRef<HTMLButtonElement>(null);

  const handleInputChange = (
    field: keyof CreateFieldFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectCategory = (category: MergeFieldCategory) => {
    handleInputChange("category", category);
    setIsCategoryDropdownOpen(false);
  };

  const getCategoryLabel = (category: string): string => {
    const tab = MERGE_FIELD_TABS.find((t) => t.value === category);
    return tab ? tab.label : category;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const autoTag = `%${formData.name
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "_")
      .replace(/[^A-Z_]/g, "")}%`;

    const newField: MergeField = {
      id: `field-${Date.now()}`,
      name: formData.name.trim(),
      type: "Text Input",
      autoFillTag: autoTag,
      category: formData.category,
      required: false,
      createdAt: new Date().toISOString(),
    };

    addField(newField);
    setFormData({ name: "", category: "audience" });
    onClose();
  };

  return {
    formData,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    categoryTriggerRef,
    handleInputChange,
    handleSelectCategory,
    handleSubmit,
    getCategoryLabel,
    categories: MERGE_FIELD_TABS,
  };
}
