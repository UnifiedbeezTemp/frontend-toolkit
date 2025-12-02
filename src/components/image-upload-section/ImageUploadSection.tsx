import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "../ui/Button";
import { useImageUpload } from "./hooks/useImageUpload";
import { useProfileImage } from "./hooks/useProfileImage";
import Text from "../ui/Text";
import { ImageUploadSectionProps } from "./types";
import Heading from "../ui/Heading";
import { useEffect, useState } from "react";

const sizeClasses = {
  sm: "w-[6rem] h-[6rem]",
  md: "w-[8.6rem] h-[8.6rem]",
  lg: "w-[12rem] h-[12rem]",
  xs: "w-[6rem] h-[6rem]"
};

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

export default function ImageUploadSection({
  image,
  selectedFile,
  onImageSelect,
  title,
  description,
  displayName,
  isEditing,
  type = "profile",
  optional = true,
  size = "md",
}: ImageUploadSectionProps) {
  const icons = useSupabaseIcons();
  const {
    uploadRef,
    captureRef,
    handleUploadClick,
    handleCaptureClick,
    handleSelectImage,
  } = useImageUpload({ onImageSelect });
  const { getInitials, createObjectURL } = useProfileImage();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = createObjectURL(selectedFile);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileSelect = (file: File | undefined) => {
    setFileError(null);

    if (!file) return;

    if (!isValidImageFile(file)) {
      setFileError(
        "Please select a valid image file (JPEG, PNG, GIF, WebP, BMP, TIFF). SVG files are not allowed."
      );
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError(
        "File size too large. Please select an image smaller than 10MB."
      );
      return;
    }

    handleSelectImage(file);
  };

  // Fix camera capture to actually open camera
  const handleCameraCapture = () => {
    if (captureRef.current) {
      // Clear any previous value to ensure change event fires
      captureRef.current.value = '';
      captureRef.current.click();
    }
  };

  const renderImagePreview = () => {
    if (previewUrl) {
      return (
        <ImageComponent
          src={previewUrl}
          alt={`${type} preview`}
          width={500}
          height={500}
          className={`${sizeClasses[size]} rounded-full object-cover object-center`}
        />
      );
    }

    if (image) {
      return (
        <ImageComponent
          src={image}
          alt={`${type} preview`}
          width={500}
          height={500}
          className={`${sizeClasses[size]} rounded-full object-cover object-center`}
        />
      );
    }

    if (type === "logo") {
      return (
        <div
          className={`flex items-center text-[2rem] text-text-primary justify-center w-full h-full bg-border/20 rounded-full`}
        >
          {displayName ? (
            getInitials(displayName)
          ) : (
            <ImageComponent
              src={icons.profileActive}
              alt={`${type} preview`}
              width={500}
              height={500}
              className={`rounded-full object-cover object-center`}
            />
          )}
        </div>
      );
    }

    return (
      <div
        className={`flex items-center text-[2rem] text-text-primary justify-center w-full h-full bg-border/20 rounded-full`}
      >
        {displayName ? (
          getInitials(displayName)
        ) : (
          <ImageComponent
            src={icons.preferenceActive}
            alt={`${type} preview`}
            width={100}
            height={100}
            className={`rounded-full object-cover object-center hidden`}
          />
        )}
      </div>
    );
  };

  const handleRemoveImage = () => {
    onImageSelect(null as any);
    setPreviewUrl(null);
    setFileError(null);
    
    // Clear file inputs
    if (uploadRef.current) uploadRef.current.value = '';
    if (captureRef.current) captureRef.current.value = '';
  };

  const hasImage = previewUrl || image;

  if (!isEditing) {
    return (
      <div className="flex gap-8 items-center">
        <div
          className={`${sizeClasses[size]} border border-border bg-border/20 rounded-full relative`}
        >
          {renderImagePreview()}
        </div>
        <div className="flex-1">
          <Heading size="sm">{title}</Heading>
          <Text className="mt-[.6rem]" size={size}>
            {description}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-5">
        <div
          className={`${sizeClasses[size]} border border-border bg-border/20 rounded-full relative`}
        >
          {renderImagePreview()}

          {/* Remove Image Button (X) - Only show when there's an image */}
          {selectedFile && (
            <button
              onClick={handleRemoveImage}
              className="absolute bottom-[1px] right-[0px] w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors z-10"
              type="button"
            >
              ×
            </button>
          )}

          {!hasImage && (
            <button
              onClick={handleUploadClick}
              className="absolute bottom-[1px] right-[-5px] border-border p-[2px] rounded-full border-[1px] bg-primary hidden sm:block"
            >
              <ImageComponent alt="" src={icons.upload} width={15} height={15} />
            </button>
          )}
        </div>

        <div className="flex-1">
          <Heading size="sm">
            {title}
            {optional && (
              <span className="text-text-primary text-[1.4rem] font-[400]">
                {" "}
                (Optional)
              </span>
            )}
          </Heading>
          <Text className="mt-[.6rem]" size="sm">
            {description}
          </Text>

          {fileError && (
            <Text className="mt-2 text-red-500" size="sm">
              {fileError}
            </Text>
          )}

          <div className="mt-[1.6rem] flex gap-3 hidden sm:flex">
            <Button
              variant="secondary"
              onClick={handleUploadClick}
              className="flex items-center gap-2 py-[.3rem] px-[0.62rem] rounded-[0.62rem] font-[700] text-[1.4rem]"
            >
              <ImageComponent
                src={icons.uploadCloud}
                alt="upload"
                width={16}
                height={16}
              />
              {hasImage ? "Change photo" : "Upload photo"}
            </Button>

            <Button
              variant="secondary"
              onClick={handleCameraCapture}
              className="flex items-center gap-2 py-[.3rem] px-[0.62rem] rounded-[0.62rem] font-[700] text-[1.4rem]"
            >
              <ImageComponent
                src={icons.camera}
                alt="camera"
                width={16}
                height={16}
              />
              Take photo
            </Button>
          </div>

          <input
            ref={uploadRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/tiff"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
          />

          {/* Camera input with capture attribute */}
          <input
            ref={captureRef}
            type="file"
            accept="image/*"
            capture="environment" 
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files?.[0])}
          />
        </div>
      </div>

      <div className="mt-[2.9rem] flex sm:hidden gap-1 md:gap-3">
        <Button
          variant="secondary"
          onClick={handleUploadClick}
          className="flex items-center gap-2 py-[.3rem] px-[0.62rem] rounded-[0.62rem] font-bold text-xs sm:text-md"
        >
          <ImageComponent
            src={icons.uploadCloud}
            alt="upload"
            width={16}
            height={16}
          />
          {hasImage ? "Change photo" : "Upload photo"}
        </Button>

        <Button
          variant="secondary"
          onClick={handleCameraCapture}
          className="flex items-center gap-2 py-[.3rem] px-[0.62rem] rounded-[0.62rem] font-bold text-xs sm:text-md"
        >
          <ImageComponent
            src={icons.camera}
            alt="camera"
            width={16}
            height={16}
          />
          Take photo
        </Button>

      </div>
    </div>
  );
}