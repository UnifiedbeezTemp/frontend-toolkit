import { useRef } from "react";

interface UseImageUploadProps {
  onImageSelect: (file: File) => void;
}

export function useImageUpload({ onImageSelect }: UseImageUploadProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const captureRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => uploadRef.current?.click();
  const handleCaptureClick = () => captureRef.current?.click();

  const handleSelectImage = (file?: File) => {
    if (!file) return;
    onImageSelect(file);
  };

  return {
    uploadRef,
    captureRef,
    handleUploadClick,
    handleCaptureClick,
    handleSelectImage,
  };
}