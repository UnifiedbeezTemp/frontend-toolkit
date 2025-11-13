import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "../ui/Button";
import { useImageUpload } from "./hooks/useImageUpload";
import { useProfileImage } from "./hooks/useProfileImage";
import Text from "../ui/Text";
import { ImageUploadSectionProps } from "./types";
import Heading from "../ui/Heading";

const sizeClasses = {
  sm: "w-[6rem] h-[6rem]",
  md: "w-[8.6rem] h-[8.6rem]",
  lg: "w-[12rem] h-[12rem]",
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
  const { getInitials } = useProfileImage();

  const renderImagePreview = () => {
    if (image) {
      return (
        <ImageComponent
          src={image}
          alt={`${type} preview`}
          width={50}
          height={50}
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
              width={50}
              height={50}
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
            width={10}
            height={10}
            className={`rounded-full object-cover object-center`}
          />
        )}
      </div>
    );
  };

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
          <Text className="mt-[.6rem]" size="sm">
            {description}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-8 items-center">
      <div
        className={`${sizeClasses[size]} border border-border bg-border/20 rounded-full relative`}
      >
        {renderImagePreview()}

        <button
          onClick={handleUploadClick}
          className="absolute bottom-[1px] right-[-5px] border-border p-[2px] rounded-full border-[1px] bg-primary"
        >
          <ImageComponent alt="" src={icons.upload} width={15} height={15} />
        </button>
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

        <div className="mt-[1.6rem] flex gap-3">
          <Button
            variant="secondary"
            onClick={handleUploadClick}
            className="flex items-center gap-2 py-[.3rem] px-[0.62rem] rounded-[0.62rem]"
          >
            <ImageComponent
              src={icons.uploadCloud}
              alt="upload"
              width={16}
              height={16}
            />
            Upload photo
          </Button>

          <Button
            variant="secondary"
            onClick={handleCaptureClick}
            className="flex items-center gap-2 py-[.3rem] px-[0.62rem] rounded-[0.62rem]"
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
          accept="image/*"
          className="hidden"
          onChange={(e) => handleSelectImage(e.target.files?.[0])}
        />

        <input
          ref={captureRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={(e) => handleSelectImage(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
