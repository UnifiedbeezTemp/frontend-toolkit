import { useState, useEffect, useMemo } from "react";
import {
  AIAssistant,
  BusinessKnowledgeFile,
} from "@/shared/src/types/aiAssistantTypes";
import { UploadedFile } from "../../../business-details/utils/types";

const mapApiFileToUiFile = (apiFile: BusinessKnowledgeFile): UploadedFile => ({
  id: apiFile.id.toString(),
  name: apiFile.originalName,
  type: apiFile.fileType,
  size: apiFile.fileSize,
  progress: 100,
  status: "completed",
  url: apiFile.filePath,
});

export function useFileManagement(assistant: AIAssistant, isOpen: boolean) {
  const initialFiles = useMemo(
    () => (assistant.businessKnowledgeFiles || []).map(mapApiFileToUiFile),
    [assistant.businessKnowledgeFiles]
  );

  const [files, setFiles] = useState<{
    isDragOver: boolean;
    uploadingFiles: UploadedFile[];
    completedFiles: UploadedFile[];
  }>({
    isDragOver: false,
    uploadingFiles: [],
    completedFiles: initialFiles,
  });

  useEffect(() => {
    if (isOpen) {
      setFiles((prev) => ({
        ...prev,
        completedFiles: (assistant.businessKnowledgeFiles || []).map(
          mapApiFileToUiFile
        ),
      }));
    }
  }, [assistant, isOpen]);

  const handleFilesUpdate = (fileList: FileList) => {
    const newUploadingFiles: UploadedFile[] = Array.from(fileList).map(
      (file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.split("/")[1]?.toUpperCase() || "FILE",
        size: file.size,
        progress: 0,
        status: "uploading" as const,
      })
    );

    setFiles((prev) => ({
      ...prev,
      uploadingFiles: [...prev.uploadingFiles, ...newUploadingFiles],
    }));

    newUploadingFiles.forEach((file) => {
      simulateFileUpload(file.id);
    });
  };

  const simulateFileUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;

      setFiles((prev) => ({
        ...prev,
        uploadingFiles: prev.uploadingFiles.map((file) =>
          file.id === fileId ? { ...file, progress } : file
        ),
      }));

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setFiles((prev) => {
            const completedFile = prev.uploadingFiles.find(
              (f) => f.id === fileId
            );
            if (!completedFile) return prev;

            return {
              ...prev,
              uploadingFiles: prev.uploadingFiles.filter(
                (f) => f.id !== fileId
              ),
              completedFiles: [
                ...prev.completedFiles,
                { ...completedFile, progress: 100, status: "completed" },
              ],
            };
          });
        }, 500);
      }
    }, 200);
  };

  const setDragOver = (isOver: boolean) => {
    setFiles((prev) => ({ ...prev, isDragOver: isOver }));
  };

  const removeFile = (id: string) => {
    setFiles((prev) => ({
      ...prev,
      completedFiles: prev.completedFiles.filter((file) => file.id !== id),
      uploadingFiles: prev.uploadingFiles.filter((file) => file.id !== id),
    }));
  };

  const cancelUpload = (id: string) => {
    setFiles((prev) => ({
      ...prev,
      uploadingFiles: prev.uploadingFiles.filter((file) => file.id !== id),
    }));
  };

  return {
    files,
    handleFilesUpdate,
    setDragOver,
    removeFile,
    cancelUpload,
  };
}
