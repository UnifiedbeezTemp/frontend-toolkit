import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "../ui/Button";
import { useImageUpload } from "./hooks/useImageUpload";
import { useProfileImage } from "./hooks/useProfileImage";
import Text from "../ui/Text";
import { ImageUploadSectionProps } from "./types";
import Heading from "../ui/Heading";
import React from "react";
import ImageComponent from "../ui/ImageComponent";
import CameraModal from "./components/CameraModal";
import { ImagePreview } from "./components/ImagePreview";
import ImageCropper from "./components/ImageCropper";

const sizeClasses = {
  sm: "w-[6rem] h-[6rem]",
  md: "w-[8.6rem] h-[8.6rem]",
  lg: "w-[12rem] h-[12rem]",
  xs: "w-[6rem] h-[6rem]",
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
  const { getInitials, createObjectURL } = useProfileImage();

  const {
    uploadRef,
    isCameraModalOpen,
    previewUrl,
    fileError,
    handleUploadClick,
    handleCameraCapture,
    closeCameraModal,
    handleFileSelect,
    handleRemoveImage,
    isCropperOpen,
    imageToCrop,
    closeCropper,
    handleCropComplete,
  } = useImageUpload({ onImageSelect, selectedFile, createObjectURL });

  const hasImage = previewUrl || image;

  if (!isEditing) {
    return (
      <div className="flex gap-8 items-center">
        <div
          className={`${sizeClasses[size]} border border-border bg-border/20 rounded-full relative`}
        >
          <ImagePreview
            previewUrl={previewUrl}
            image={image}
            type={type}
            displayName={displayName}
            getInitials={getInitials}
            icons={icons}
            sizeClasses={sizeClasses}
            size={size}
          />
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
          <ImagePreview
            previewUrl={previewUrl}
            image={image}
            type={type}
            displayName={displayName}
            getInitials={getInitials}
            icons={icons}
            sizeClasses={sizeClasses}
            size={size}
          />

          {selectedFile && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute bottom-[1px] right-[0px] w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold hover:bg-red-600 transition-colors z-10"
            >
              ×
            </button>
          )}

          {!hasImage && (
            <button
              type="button"
              onClick={handleUploadClick}
              className="absolute bottom-[1px] right-[-5px] border-border p-[2px] rounded-full border-[1px] bg-primary hidden sm:block"
            >
              <ImageComponent
                alt=""
                src={icons.upload}
                width={15}
                height={15}
              />
            </button>
          )}
        </div>

        {isCropperOpen && imageToCrop && (
          <ImageCropper
            imageSrc={imageToCrop}
            onCropComplete={handleCropComplete}
            onCancel={closeCropper}
          />
        )}

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
          <Text className="lg:mt-[.6rem]" size="sm">
            {description}
          </Text>

          {fileError && (
            <Text className="mt-2 text-destructive" size="sm">
              {fileError}
            </Text>
          )}

          <div className="mt-[1.6rem] flex gap-3 hidden sm:flex">
            <Button
              type="button"
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
              type="button"
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
        </div>
      </div>

      <div className="pt-4 mt-2.5 lg:mt-[2.9rem] flex sm:hidden gap-3">
        <Button
          type="button"
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
          type="button"
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

      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={closeCameraModal}
        onCapture={(file) => handleFileSelect(file)}
      />
    </div>
  );
}
