import { useState, useCallback, useMemo } from "react";
import { useAiAssistants } from "../../../../../../hooks/useAiAssistants";
import { useAssistantKnowledgeFiles } from "../knowledge/hooks/useAssistantKnowledgeFiles";
import { useSaveAssistantKnowledge } from "../knowledge/hooks/useSaveAssistantKnowledge";
import { useDeleteFile } from "../knowledge/hooks/useDeleteFile";
import { useToast } from "../../../../../ui/toast/useToast";
import { extractErrorMessage } from "../../../../../../utils/extractErrorMessage";

import {
  AIAssistant,
  FileUploadResponse,
} from "../../../../../../types/aiAssistantTypes";
import { invalidateAiAssistantsAndSession } from "../../../../../../api/invalidateAiAssistantsAndSession";

interface UseEditAssistantModalProps {
  assistant: AIAssistant;
  onClose: () => void;
  onSave: (assistant: AIAssistant) => void;
}

interface SaveTask {
  name: string;
  promise: Promise<AIAssistant | FileUploadResponse | void>;
}

export const useEditAssistantModal = ({
  assistant,
  onClose,
  onSave,
}: UseEditAssistantModalProps) => {
  const [localAssistant, setLocalAssistant] = useState<AIAssistant>(assistant);
  const { showToast } = useToast();

  const {
    updateAssistantName,
    updateAssistantPersonality,
    updateAssistantInstruction,
    isUpdating,
    isUpdatingPersonality,
    isUpdatingInstruction,
  } = useAiAssistants({ autoFetch: false, showToasts: false });

  const {
    uploadingFiles,
    savedFiles,
    failedFiles,
    isDragOver,
    hasChanges: filesHasChanges,
    handleFilesUpdate,
    removeFile,
    cancelUpload,
    setDragOver,
    getFilesFormData,
    handleUploadResults,
  } = useAssistantKnowledgeFiles(assistant);

  const { handleSaveFiles, isSaving: isSavingFiles } =
    useSaveAssistantKnowledge({ showToasts: false });

  const {
    handleDelete,
    isDeleting: isDeletingFile,
    deletingFileId,
  } = useDeleteFile();

  const isSaving = useMemo(
    () =>
      isUpdating ||
      isUpdatingPersonality ||
      isUpdatingInstruction ||
      isSavingFiles,
    [isUpdating, isUpdatingPersonality, isUpdatingInstruction, isSavingFiles],
  );

  const updateField = useCallback((field: keyof AIAssistant, value: string) => {
    setLocalAssistant((prev) => (prev ? { ...prev, [field]: value } : prev));
  }, []);

  const handleSaveAction = async () => {
    if (!localAssistant || !assistant) return;

    try {
      const tasks: SaveTask[] = [];
      // 1. Update Name if changed
      if (localAssistant.name !== assistant.name) {
        tasks.push({
          name: "Name update",
          promise: updateAssistantName({
            id: assistant.id,
            name: localAssistant.name,
          }),
        });
      }

      // 2. Update Personality if changed
      if (
        localAssistant.tone !== assistant.tone ||
        localAssistant.style !== assistant.style ||
        localAssistant.personalityType !== assistant.personalityType
      ) {
        tasks.push({
          name: "Personality update",
          promise: updateAssistantPersonality({
            id: assistant.id,
            tone: localAssistant.tone || "",
            style: localAssistant.style || "",
            personalityType: localAssistant.personalityType || "",
          }),
        });
      }

      // 3. Update Instruction if changed
      if (localAssistant.instruction !== assistant.instruction) {
        tasks.push({
          name: "Instruction update",
          promise: updateAssistantInstruction({
            id: assistant.id,
            instruction: localAssistant.instruction || "",
          }),
        });
      }

      // 4. Upload files if staged
      if (uploadingFiles.length > 0) {
        const formData = getFilesFormData();
        tasks.push({
          name: "File upload",
          promise: handleSaveFiles({ id: assistant.id, formData }).then(
            (res: FileUploadResponse) => {
              handleUploadResults(res.results);
              const failedResults = res.results.filter((r) => !r.success);
              if (failedResults.length > 0) {
                throw new Error(
                  `${failedResults.length} files failed to upload`,
                );
              }
              return res;
            },
          ),
        });
      }

      if (tasks.length === 0) {
        onClose();
        return;
      }

      const results = await Promise.allSettled(tasks.map((t) => t.promise));
      const failures: { name: string; reason: unknown }[] = [];

      results.forEach((result, index) => {
        if (result.status === "rejected") {
          failures.push({
            name: tasks[index].name,
            reason: result.reason,
          });
        }
      });

      if (failures.length > 0) {
        const title =
          failures.length === 1
            ? `${failures[0].name} failed`
            : "Save partially failed";

        const description =
          failures.length === 1
            ? extractErrorMessage(failures[0].reason)
            : failures
                .map((f) => `${f.name}: ${extractErrorMessage(f.reason)}`)
                .join(". ");

        showToast({
          variant: "error",
          title,
          description,
        });
        return;
      }

      showToast({
        variant: "success",
        title: "Changes saved",
        description: "Assistant updated successfully.",
      });

      // Ensure the assistants list + active user profile reflect the latest
      // server state (e.g. newly uploaded knowledge files / usage changes).
      await invalidateAiAssistantsAndSession({ refetchActive: true });

      onSave(localAssistant);
      onClose();

    } catch (error) {
      console.error("Failed to save assistant changes:", error);
      showToast({
        variant: "error",
        title: "Save failed",
        description: extractErrorMessage(error),
      });
    }
  };

  const handleKnowledgeDelete = useCallback(
    (data: { aiId: string; documentId: number }) => handleDelete(data),
    [handleDelete],
  );

  return {
    localAssistant,
    updateField,
    isSaving,
    handleSaveAction,
    fileManagement: {
      uploadingFiles,
      savedFiles,
      failedFiles,
      isDragOver,
      filesHasChanges,
      handleFilesUpdate,
      removeFile,
      cancelUpload,
      setDragOver,
      handleDelete: handleKnowledgeDelete,
      isDeletingFile,
      deletingFileId,
    },
  };
};
