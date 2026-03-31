"use client";

import { useState } from "react";
import { deleteAssistantFile } from "../../../../../../../api/aiAssistants";
import { useAppMutation } from "../../../../../../../api/query";
import { extractErrorMessage } from "../../../../../../../utils/extractErrorMessage";
import { useToast } from "../../../../../../ui/toast/useToast";
import { invalidateAiAssistantsAndSession } from "../../../../../../../api/invalidateAiAssistantsAndSession";

export function useDeleteFile() {
  const { showToast } = useToast();
  const [deletingFileId, setDeletingFileId] = useState<number | null>(null);

  const deleteMutation = useAppMutation<
    { aiId: string; documentId: number },
    { message?: string },
    { message?: string }
  >(
    async ({ aiId, documentId }) => {
      setDeletingFileId(documentId);
      return deleteAssistantFile(aiId, documentId);
    },
    {
      onSuccess: () => {
        void invalidateAiAssistantsAndSession({ refetchActive: true });
        showToast({
          variant: "success",
          title: "File deleted",
          description: "The file has been removed from assistant knowledge.",
        });
        setDeletingFileId(null);
      },
      onError: (error) => {
        showToast({
          variant: "error",
          title: "Delete failed",
          description: extractErrorMessage(error),
        });
        setDeletingFileId(null);
      },
    },
  );

  return {
    handleDelete: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deletingFileId,
  };
}
