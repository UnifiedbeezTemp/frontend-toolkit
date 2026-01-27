import { useRef, useState, useEffect, useCallback } from "react";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const isValidImageFile = (file: File): boolean => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return false;
  }
  if (
    file.type === "image/svg+xml" ||
    file.name.toLowerCase().endsWith(".svg")
  ) {
    return false;
  }

  return true;
};

interface UseImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedFile: File | null;
  createObjectURL: (file: File) => string;
}

export function useImageUpload({
  onImageSelect,
  selectedFile,
  createObjectURL,
}: UseImageUploadProps) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const lastFileRef = useRef<File | null>(null);

  useEffect(() => {
    if (selectedFile === lastFileRef.current) return;

    lastFileRef.current = selectedFile;

    if (selectedFile) {
      const url = createObjectURL(selectedFile);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile, createObjectURL]);

  const handleUploadClick = useCallback(() => uploadRef.current?.click(), []);
  const handleCameraCapture = useCallback(() => setIsCameraModalOpen(true), []);
  const closeCameraModal = useCallback(() => setIsCameraModalOpen(false), []);

  const handleSelectImage = useCallback(
    (file?: File | null) => {
      onImageSelect(file || null);
    },
    [onImageSelect],
  );

  const handleFileSelect = useCallback(
    (file: File | undefined) => {
      setFileError(null);

      if (!file) return;

      if (!isValidImageFile(file)) {
        setFileError(
          "Please select a valid image file (JPEG, PNG, GIF, WebP, BMP, TIFF). SVG files are not allowed.",
        );
        return;
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setFileError(
          "File size too large. Please select an image smaller than 10MB.",
        );
        return;
      }

      handleSelectImage(file);
    },
    [handleSelectImage],
  );

  const handleRemoveImage = useCallback(() => {
    onImageSelect(null);
    setPreviewUrl(null);
    setFileError(null);

    if (uploadRef.current) uploadRef.current.value = "";
  }, [onImageSelect]);

  return {
    uploadRef,
    isCameraModalOpen,
    previewUrl,
    fileError,
    handleUploadClick,
    handleCameraCapture,
    closeCameraModal,
    handleFileSelect,
    handleRemoveImage,
  };
}
