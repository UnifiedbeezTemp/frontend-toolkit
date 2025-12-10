import { useRef, useCallback } from "react";

interface UseFileUploadProps {
  onFileUpload: (files: FileList) => void;
  onDragOverChange: (isOver: boolean) => void;
}

export const useFileUpload = ({
  onFileUpload,
  onDragOverChange,
}: UseFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFileUpload(e.target.files);
        onDragOverChange(false);
        // Clear the input value to prevent duplicate triggers
        e.target.value = '';
      }
    },
    [onFileUpload, onDragOverChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files) {
        onFileUpload(e.dataTransfer.files);
      }
      onDragOverChange(false);
    },
    [onFileUpload, onDragOverChange]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      onDragOverChange(true);
    },
    [onDragOverChange]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.currentTarget.contains(e.relatedTarget as Node)) return;
      onDragOverChange(false);
    },
    [onDragOverChange]
  );

  return {
    fileInputRef,
    handleClick,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  };
};
