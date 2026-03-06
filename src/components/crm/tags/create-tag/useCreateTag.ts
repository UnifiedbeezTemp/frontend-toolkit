import { useState, useRef, FormEvent } from "react";
import { CRMTag } from "../types";
import { TagCategory } from "../../../../store/slices/tagSlice";
import { TAG_CATEGORIES } from "../../../tags/utils/tagConstants";
import { AUTO_FILL_TAGS } from "../constants";

interface CreateTagFormData {
  name: string;
  category: TagCategory;
  description: string;
  useCase: string;
}

export function useCreateTag(
  onClose: () => void,
  addTag: (tag: CRMTag) => void,
) {
  const [formData, setFormData] = useState<CreateTagFormData>({
    name: "",
    category: TAG_CATEGORIES[0].id as TagCategory,
    description: "",
    useCase: "",
  });

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const categoryTriggerRef = useRef<HTMLButtonElement>(null);

  const handleInputChange = (field: keyof CreateTagFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectCategory = (category: TagCategory) => {
    handleInputChange("category", category);
    setIsCategoryDropdownOpen(false);
  };

  const getCategoryLabel = (categoryId: string): string => {
    const cat = TAG_CATEGORIES.find((c) => c.id === categoryId);
    return cat ? cat.label : categoryId;
  };

  const getCategoryEmoji = (categoryId: string): string => {
    const cat = TAG_CATEGORIES.find((c) => c.id === categoryId);
    return cat ? cat.emoji : "";
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const tagLabel = formData.name.trim().replace(/\s+/g, "-").toLowerCase();

    const newTag: CRMTag = {
      id: `tag-${Date.now()}`,
      label: tagLabel,
      category: formData.category,
      autoFillTag:
        AUTO_FILL_TAGS[Math.floor(Math.random() * AUTO_FILL_TAGS.length)],
      contactsCount: 0,
      createdAt: new Date().toISOString(),
    };

    addTag(newTag);
    setFormData({
      name: "",
      category: TAG_CATEGORIES[0].id as TagCategory,
      description: "",
      useCase: "",
    });
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
    getCategoryEmoji,
    categories: TAG_CATEGORIES,
  };
}
