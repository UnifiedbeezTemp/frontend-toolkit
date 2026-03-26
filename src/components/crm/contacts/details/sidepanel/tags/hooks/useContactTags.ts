"use client";

import { useState, useCallback, useRef } from "react";
import { useAppSelector } from "../../../../../../../store/hooks/useRedux";
import { useTags } from "../../../../../../tags/hooks/useTags";

export function useContactTags() {
  useTags();

  const allTags = useAppSelector((state) => state.tag.tags);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([
    "tag-2", // Vip-customer
    "tag-25", // Window-shopper
    "tag-60", // google-shopping
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const selectedTags = allTags.filter((tag) => selectedTagIds.includes(tag.id));

  const handleToggleTag = useCallback((tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  }, []);

  const handleRemoveTag = useCallback((tagId: string) => {
    setSelectedTagIds((prev) => prev.filter((id) => id !== tagId));
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  return {
    allTags,
    selectedTags,
    selectedTagIds,
    isDropdownOpen,
    inputRef,
    handleToggleTag,
    handleRemoveTag,
    toggleDropdown,
    closeDropdown,
  };
}
