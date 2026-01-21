import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { CategoryId } from "../../../types";

interface UseTagInputProps {
  categoryId: CategoryId;
  onAddTag: (label: string) => void;
}

export const useTagInput = ({ categoryId, onAddTag }: UseTagInputProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTagLabel, setNewTagLabel] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsAdding(false);
    setNewTagLabel("");
  }, [categoryId]);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const startAdding = () => setIsAdding(true);

  const cancelAdding = () => {
    setIsAdding(false);
    setNewTagLabel("");
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (newTagLabel.trim()) {
        onAddTag(newTagLabel.trim());
        cancelAdding();
      }
    } else if (e.key === 'Escape') {
      cancelAdding();
    }
  };

  const handleBlur = () => {
    cancelAdding();
  };

  return {
    isAdding,
    newTagLabel,
    setNewTagLabel,
    inputRef,
    startAdding,
    handleKeyDown,
    handleBlur
  };
};
