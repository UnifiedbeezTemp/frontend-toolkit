"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { UploadedFile } from "@/shared/src/components/knowledge-files/types";
import { useUser } from "@/shared/src/contexts/UserContext";
import { api, useAppMutation } from "@/shared/src/api";
import { useToast } from "@/shared/src/components/ui/toast/useToast";
import { extractErrorMessage } from "@/shared/src/utils/extractErrorMessage";

export const useKnowledgeFiles = () => {
  const { user, refetch } = useUser();
  const { showToast } = useToast();

  const [uploadingFiles, setUploadingFiles] = useState<UploadedFile[]>([]);
  const [completedFiles, setCompletedFiles] = useState<UploadedFile[]>([]);
  const [fileMap, setFileMap] = useState<Map<string, File>>(new Map());
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string>("");
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

  const uploadingFilesRef = useRef<UploadedFile[]>([]);
  const completedFilesRef = useRef<UploadedFile[]>([]);

  useEffect(() => {
    uploadingFilesRef.current = uploadingFiles;
  }, [uploadingFiles]);

  useEffect(() => {
    completedFilesRef.current = completedFiles;
  }, [completedFiles]);

  const simulateFileUpload = useCallback((fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;

      setUploadingFiles((prev) => {
        const updated = prev.map((f) =>
          f.id === fileId ? { ...f, progress } : f
        );
        uploadingFilesRef.current = updated;
        return updated;
      });

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploadingFiles((prev) => {
            const file = prev.find((f) => f.id === fileId);
            const filtered = prev.filter((f) => f.id !== fileId);
            uploadingFilesRef.current = filtered;

            if (file) {
              setCompletedFiles((prevCompleted) => {
                const exists = prevCompleted.some((f) => f.id === fileId);
                if (exists) {
                  return prevCompleted;
                }

                const completedFile: UploadedFile = {
                  ...file,
                  progress: 100,
                  status: "saved",
                };

                const updated = [...prevCompleted, completedFile];
                completedFilesRef.current = updated;
                return updated;
              });
            }

            return filtered;
          });
        }, 500);
      }
    }, 200);
  }, []);

  const preloadBusinessFiles = useCallback(() => {
    const businessFiles = user?.businessFiles ?? [];

    const mapped: UploadedFile[] = businessFiles.map((f) => ({
      id: String(f.id),
      name: f.originalName,
      type: f.fileType,
      size: f.fileSize,
      progress: 100,
      status: f.processingStatus === "COMPLETED" ? "saved" : "pending",
      url: f.filePath,
      filePath: f.filePath,
      isFromBackend: true,
      documentId: f.id,
    }));
    setCompletedFiles(mapped);
  }, [user]);

  useEffect(() => {
    preloadBusinessFiles();
  }, [preloadBusinessFiles]);

  const handleFilesUpdate = useCallback(
    (files: FileList) => {
      const existingNames = new Set([
        ...uploadingFilesRef.current.map((f) => `${f.name}-${f.size}`),
        ...completedFilesRef.current.map((f) => `${f.name}-${f.size}`),
      ]);

      const newFiles = Array.from(files).filter(
        (file) => !existingNames.has(`${file.name}-${file.size}`)
      );

      if (newFiles.length === 0) {
        return;
      }

      const newUploadingFiles: UploadedFile[] = newFiles.map((file) => {
        const id = Math.random().toString(36).substr(2, 9);
        return {
          id,
          name: file.name,
          type: file.type.split("/")[1]?.toUpperCase() || "FILE",
          size: file.size,
          progress: 0,
          status: "pending",
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
          prev.map((f) => `${f.name}-${f.size}`)
        );

        const trulyNew = newUploadingFiles.filter(
          (f) =>
            !existingIds.has(f.id) &&
            !existingNamesInState.has(`${f.name}-${f.size}`)
        );

        if (trulyNew.length === 0) {
          return prev;
        }

        const updated = [...prev, ...trulyNew];
        uploadingFilesRef.current = updated;

        trulyNew.forEach((uploadedFile) => {
          simulateFileUpload(uploadedFile.id);
        });

        return updated;
      });
    },
    [simulateFileUpload]
  );

  const { mutate: deleteFileMutation } = useAppMutation<string, void>(
    async (documentId) => {
      await api.delete(`/auth/business-files/${documentId}`);
    },
    {
      onSuccess: (_, documentId) => {
        setCompletedFiles((prev) => {
          const updated = prev.filter(
            (file) => String(file.documentId) !== documentId
          );
          completedFilesRef.current = updated;
          return updated;
        });
        setDeletingFileId(null);
        refetch();
      },
      onError: (err) => {
        setDeletingFileId(null);
        showToast({
          variant: "error",
          title: "Deletion failed",
          description: extractErrorMessage(
            err,
            "Could not delete file. Please try again."
          ),
        });
      },
    }
  );

  const removeFile = useCallback(
    (id: string, documentId?: number) => {
      if (documentId) {
        setDeletingFileId(id);
        deleteFileMutation(String(documentId));
        return;
      }

      setUploadingFiles((prev) => {
        const updated = prev.filter((file) => file.id !== id);
        uploadingFilesRef.current = updated;
        return updated;
      });
      setCompletedFiles((prev) => {
        const updated = prev.filter((file) => file.id !== id);
        completedFilesRef.current = updated;
        return updated;
      });
      setFileMap((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      setValidationError("");
    },
    [deleteFileMutation]
  );

  const cancelUpload = useCallback((id: string) => {
    setUploadingFiles((prev) => {
      const updated = prev.filter((file) => file.id !== id);
      uploadingFilesRef.current = updated;
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

  const errorMessage =
    validationError || (deletingFileId ? "Failed to delete file" : undefined);

  return {
    uploadingFiles,
    completedFiles,
    isDragOver,
    handleFilesUpdate,
    removeFile,
    cancelUpload,
    setDragOver,
    deletingFileId,
    validationError,
    errorMessage,
    isValid: completedFiles.length > 0,
    fileMap,
  };
};
