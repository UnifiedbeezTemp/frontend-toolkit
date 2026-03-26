"use client";

import { useState } from "react";
import { uploadAssistantFiles } from "../../../../../../../api/aiAssistants";
import { useAppMutation } from "../../../../../../../api/query";
import { extractErrorMessage } from "../../../../../../../utils/extractErrorMessage";
import { FileUploadResponse } from "../../../../../../../types/aiAssistantTypes";
import { useToast } from "../../../../../../ui/toast/useToast";

export function useSaveAssistantKnowledge(
  options: { showToasts?: boolean } = {},
) {
  const showToasts = options.showToasts ?? true;
  const { showToast } = useToast();

  const uploadMutation = useAppMutation<
    { id: string; formData: FormData },
    FileUploadResponse,
    FileUploadResponse
  >(
    async ({ id, formData }) => {
      return uploadAssistantFiles(id, formData);
    },
    {
      onSuccess: () => {
        if (showToasts) {
          showToast({
            variant: "success",
            title: "Files uploaded",
            description: "Your knowledge files have been saved successfully.",
          });
        }
      },
      onError: (error) => {
        if (showToasts) {
          showToast({
            variant: "error",
            title: "Upload failed",
            description: extractErrorMessage(error),
          });
        }
      },
    },
  );

  return {
    handleSaveFiles: uploadMutation.mutateAsync,
    isSaving: uploadMutation.isPending,
  };
}
