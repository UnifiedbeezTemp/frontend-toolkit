import { useCallback } from "react";
import { UploadedFile } from "../../types";

interface UseFileItemHandlersParams {
  file: UploadedFile;
  onRemove: (fileId: string, documentId?: number) => void;
  onCancel: (fileId: string) => void;
  onPreview?: (file: UploadedFile) => void;
  isDeleting?: boolean;
}

export function useFileItemHandlers({
  file,
  onRemove,
  onCancel,
  onPreview,
  isDeleting = false,
}: UseFileItemHandlersParams) {
  const hasError = file.status === "error";
  const isSaved = file.status === "saved" && file.isFromBackend;
  const isPending = file.status === "pending";

  const handleClick = useCallback(() => {
    if (isSaved && onPreview && !isDeleting) {
      onPreview(file);
    }
  }, [isSaved, onPreview, isDeleting, file]);

  const handleRemove = useCallback(() => {

    if (!file.isFromBackend) {
      onCancel(file.id);
    } else {
      onRemove(file.id, file.documentId);
    }
  }, [isPending, onCancel, onRemove, file.id, file.documentId]);

  return {
    hasError,
    isSaved,
    isPending,
    handleClick,
    handleRemove,
  };
}
