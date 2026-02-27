"use client";

import { useState, useEffect } from "react";
import { TemplateFormData, TemplateButton } from "../types";

export function useTemplateForm(initialData: TemplateFormData) {
  const [formData, setFormData] = useState<TemplateFormData>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleChange = <K extends keyof TemplateFormData>(
    field: K,
    value: TemplateFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const updateButton = (
    index: number,
    field: keyof TemplateButton,
    value: string,
  ) => {
    const newButtons = [...formData.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    handleChange("buttons", newButtons);
  };

  const addButton = () => {
    if (formData.buttons.length < 10) {
      handleChange("buttons", [
        ...formData.buttons,
        { type: "Quick reply", text: "" },
      ]);
    }
  };

  const removeButton = (index: number) => {
    const newButtons = [...formData.buttons];
    newButtons.splice(index, 1);
    handleChange("buttons", newButtons);
  };

  const toggleButtonFeature = () => {
    const newVal = !formData.hasButton;
    handleChange("hasButton", newVal);
    if (newVal && formData.buttons.length === 0) {
      handleChange("buttons", [{ type: "Quick reply", text: "" }]);
    }
  };

  return {
    formData,
    setFormData,
    activeDropdown,
    setActiveDropdown,
    handleChange,
    toggleDropdown,
    updateButton,
    addButton,
    removeButton,
    toggleButtonFeature,
  };
}
