import ImageUploadSection from "@/shared/src/components/image-upload-section/ImageUploadSection";

interface ProfileImageSectionProps {
  profileImage: string | null;
  selectedFile: File | null;
  onImageSelect: (file: File | null) => void;
  fullName: string;
  isEditing: boolean;
}

export default function ProfileImageSection({
  profileImage,
  selectedFile,
  onImageSelect,
  fullName,
  isEditing,
}: ProfileImageSectionProps) {
  return (
    <ImageUploadSection
      image={profileImage}
      selectedFile={selectedFile}
      onImageSelect={onImageSelect}
      title="Profile image"
      description="The image is displayed on your UnifiedBeez account."
      displayName={fullName}
      isEditing={isEditing}
      type="profile"
      optional={true}
    />
  );
}
