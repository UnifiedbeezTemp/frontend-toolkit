import { useState } from "react";
import { UploadedFile } from "../../utils/types";

export function useFileUpload(initialFiles: UploadedFile[] = []) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadedFile[]>([]);
  const [completedFiles, setCompletedFiles] = useState<UploadedFile[]>(initialFiles);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = (files: FileList) => {
    const newUploadingFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.split("/")[1]?.toUpperCase() || "FILE",
      size: file.size,
      progress: 0,
      status: "uploading" as const,
    }));

    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);

    newUploadingFiles.forEach((file) => {
      simulateFileUpload(file.id);
    });
  };

  const simulateFileUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      setUploadingFiles(prev =>
        prev.map(file => 
          file.id === fileId ? { ...file, progress } : file
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploadingFiles(prev => {
            const completedFile = prev.find(f => f.id === fileId);
            if (!completedFile) return prev;
            
            return prev.filter(f => f.id !== fileId);
          });
        }, 500);
      }
    }, 200);
  };

  const removeFile = (id: string) => {
    setCompletedFiles(prev => prev.filter(file => file.id !== id));
    setUploadingFiles(prev => prev.filter(file => file.id !== id));
  };

  const cancelUpload = (id: string) => {
    setUploadingFiles(prev => prev.filter(file => file.id !== id));
  };

  const setDragOver = (isOver: boolean) => {
    setIsDragOver(isOver);
  };

  const getAllFiles = () => [...completedFiles, ...uploadingFiles];

  return {
    isDragOver,
    uploadingFiles,
    completedFiles,
    handleFileUpload,
    removeFile,
    cancelUpload,
    setDragOver,
    getAllFiles,
  };
}