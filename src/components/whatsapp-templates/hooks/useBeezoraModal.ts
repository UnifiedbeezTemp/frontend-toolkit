import { useState } from "react";

export interface BeezoraFormData {
  objective: string;
  variable: string;
  language: string;
}

export function useBeezoraModal() {
  const [formData, setFormData] = useState<BeezoraFormData>({
    objective: "",
    variable: "",
    language: "English",
  });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleInputChange = (field: keyof BeezoraFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const resetForm = () => {
    setFormData({
      objective: "",
      variable: "",
      language: "English",
    });
    setActiveDropdown(null);
  };

  return {
    formData,
    handleInputChange,
    activeDropdown,
    setActiveDropdown,
    toggleDropdown,
    resetForm,
  };
}
