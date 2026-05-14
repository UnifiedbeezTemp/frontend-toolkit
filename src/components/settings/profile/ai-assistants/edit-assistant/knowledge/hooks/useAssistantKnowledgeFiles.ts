"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { UploadedFile } from "../../../../../../knowledge-files/types";
import type {
  AIAssistant,
  AssistantKnowledgeFileSummary,
  BusinessKnowledgeFile,
} from "../../../../../../../types/aiAssistantTypes";
import { UseAssistantKnowledgeFilesReturn } from "../types";
import { useToast } from "../../../../../../ui/toast/useToast";
import {
  convertBusinessFileToUploadedFile,
  generateUniqueFileId,
} from "./utils/fileUtils";

export function useAssistantKnowledgeFiles(
  assistant: AIAssistant | null,
): UseAssistantKnowledgeFilesReturn {
  const { showToast } = useToast();
  const [uploadingFiles, setUploadingFiles] = useState<UploadedFile[]>([]);
  const [savedFiles, setSavedFiles] = useState<UploadedFile[]>([]);
  const [failedFiles, setFailedFiles] = useState<UploadedFile[]>([]);
  const [fileMap, setFileMap] = useState<Map<string, File>>(new Map());
  const [isDragOver, setIsDragOver] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const uploadingFilesRef = useRef<UploadedFile[]>([]);

  useEffect(() => {
    uploadingFilesRef.current = uploadingFiles;
  }, [uploadingFiles]);

  useEffect(() => {
    if (
      assistant?.knowledgeFiles &&
      Array.isArray(assistant.knowledgeFiles)
    ) {
      const toUploadedFile = (
        file: BusinessKnowledgeFile | AssistantKnowledgeFileSummary,
      ): UploadedFile => {
        if ("userId" in file) {
          return convertBusinessFileToUploadedFile(file);
        }

        return {
          id: file.id.toString(),
          documentId: file.id,
          name: file.fileName,
          size: file.fileSize,
          type: file.fileType,
          progress: 100,
          status: "saved",
          isFromBackend: true,
          filePath: file.filePath,
          url: file.filePath,
        };
      };

      const saved = assistant.knowledgeFiles.map(toUploadedFile);
      setSavedFiles(saved);

      setUploadingFiles((prev) => {
        const savedNames = new Set(saved.map((f) => f.name));
        const updated = prev.filter((f) => !savedNames.has(f.name));
        uploadingFilesRef.current = updated;
        return updated;
      });

      setFailedFiles((prev) => {
        const savedNames = new Set(saved.map((f) => f.name));
        return prev.filter((f) => !savedNames.has(f.name));
      });
    } else {
      setSavedFiles([]);
    }
  }, [assistant?.knowledgeFiles]);

  useEffect(() => {
    setUploadingFiles([]);
    setFailedFiles([]);
    setFileMap(new Map());
    setHasChanges(false);
  }, [assistant?.id]);

  useEffect(() => {
    setHasChanges(uploadingFiles.length > 0);
  }, [uploadingFiles]);

  const handleFilesUpdate = useCallback(
    (files: FileList) => {
      const allowedFiles = Array.from(files).filter(
        (file) => !file.type.startsWith("image/"),
      );

      if (allowedFiles.length !== files.length) {
        showToast({
          variant: "warning",
          title: "File type not supported",
          description: "Images are not allowed. Please upload documents only.",
        });
      }

      if (allowedFiles.length === 0) return;

      const existingNames = new Set([
        ...uploadingFilesRef.current.map((f) => `${f.name}-${f.size}`),
        ...savedFiles.map((f) => `${f.name}-${f.size}`),
        ...failedFiles.map((f) => `${f.name}-${f.size}`),
      ]);

      const newFiles = allowedFiles.filter(
        (file) => !existingNames.has(`${file.name}-${file.size}`),
      );

      if (newFiles.length === 0) {
        return;
      }

      const newUploadingFiles: UploadedFile[] = newFiles.map((file) => {
        const id = generateUniqueFileId();
        return {
          id,
          name: file.name,
          type: file.type.split("/")[1]?.toUpperCase() || "FILE",
          size: file.size,
          progress: 0,
          status: "pending" as const,
        };
      });

      setFileMap((prevFileMap) => {
        const newFileMap = new Map(prevFileMap);
        newFiles.forEach((file, index) => {
          newFileMap.set(newUploadingFiles[index].id, file);
        });
        return newFileMap;
      });

      setUploadingFiles((prev) => {
        const existingIds = new Set(prev.map((f) => f.id));
        const existingNamesInState = new Set(
          prev.map((f) => `${f.name}-${f.size}`),
        );

        const trulyNew = newUploadingFiles.filter(
          (f) =>
            !existingIds.has(f.id) &&
            !existingNamesInState.has(`${f.name}-${f.size}`),
        );

        if (trulyNew.length === 0) {
          return prev;
        }

        const updated = [...prev, ...trulyNew];
        uploadingFilesRef.current = updated;

        return updated;
      });
    },
    [savedFiles, failedFiles],
  );

  const handleUploadResults = useCallback(
    (
      results: Array<{
        success: boolean;
        file: string;
        error?: string;
        documentId?: number;
      }>,
    ) => {
      const successfulFileNames = new Set(
        results.filter((r) => r.success).map((r) => r.file),
      );

      setFailedFiles((prevFailed) => {
        return prevFailed.filter((file) => !successfulFileNames.has(file.name));
      });

      setUploadingFiles((prev) => {
        const updated: UploadedFile[] = [];
        const newFailed: UploadedFile[] = [];
        const processedFileNames = new Set<string>();

        results.forEach((result) => {
          processedFileNames.add(result.file);

          const uploadingFile = prev.find((f) => f.name === result.file);

          if (uploadingFile) {
            if (!result.success) {
              newFailed.push({
                ...uploadingFile,
                id: `failed-${Date.now()}-${Math.random()
                  .toString(36)
                  .substr(2, 9)}`,
                status: "error",
                error: result.error || "Upload failed",
                progress: 100,
              });
            }
          }
        });

        prev.forEach((uploadingFile) => {
          if (!processedFileNames.has(uploadingFile.name)) {
            updated.push(uploadingFile);
          }
        });

        uploadingFilesRef.current = updated;

        setFailedFiles((prevFailed) => {
          const existingNames = new Set(prevFailed.map((f) => f.name));
          const uniqueNewFailed = newFailed.filter(
            (f) =>
              !existingNames.has(f.name) && !successfulFileNames.has(f.name),
          );
          return [...prevFailed, ...uniqueNewFailed];
        });

        return updated;
      });

      setFileMap((prev) => {
        const newMap = new Map(prev);
        results.forEach((result) => {
          if (result.success) {
            const entries = Array.from(newMap.entries());
            const entry = entries.find(
              ([_, file]) => file.name === result.file,
            );
            if (entry) {
              newMap.delete(entry[0]);
            }
          }
        });
        return newMap;
      });
    },
    [],
  );

  const removeFile = useCallback((id: string, documentId?: number) => {
    setUploadingFiles((prev) => {
      const updated = prev.filter((file) => file.id !== id);
      uploadingFilesRef.current = updated;
      return updated;
    });

    setFailedFiles((prev) => {
      const updated = prev.filter((file) => file.id !== id);
      return updated;
    });

    if (documentId !== undefined) {
      setSavedFiles((prev) =>
        prev.filter((file) => file.documentId !== documentId),
      );
    } else {
      setSavedFiles((prev) => prev.filter((file) => file.id !== id));
    }

    setFileMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  const cancelUpload = useCallback((id: string) => {
    setUploadingFiles((prev) => {
      const updated = prev.filter((file) => file.id !== id);
      uploadingFilesRef.current = updated;
      return updated;
    });
    setFailedFiles((prev) => {
      const updated = prev.filter((file) => file.id !== id);
      return updated;
    });
    setFileMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  const setDragOver = useCallback((isOver: boolean) => {
    setIsDragOver(isOver);
  }, []);

  const getFilesFormData = useCallback((): FormData => {
    const formData = new FormData();
    uploadingFiles.forEach((uploadingFile) => {
      const actualFile = fileMap.get(uploadingFile.id);
      if (actualFile) {
        formData.append("files", actualFile);
      }
    });
    return formData;
  }, [uploadingFiles, fileMap]);

  return {
    uploadingFiles,
    savedFiles,
    failedFiles,
    isDragOver,
    hasChanges,
    handleFilesUpdate,
    removeFile,
    cancelUpload,
    setDragOver,
    getFilesFormData,
    handleUploadResults,
    hasFiles:
      savedFiles.length > 0 ||
      uploadingFiles.length > 0 ||
      failedFiles.length > 0,
  };
}
