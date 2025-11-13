export interface ImageUploadSectionProps {
  image: string | null;
  selectedFile: File | null;
  onImageSelect: (file: File) => void;
  title: string;
  description: string;
  displayName?: string;
  isEditing: boolean;
  type?: "profile" | "logo" | "banner";
  optional?: boolean;
  size?: "sm" | "md" | "lg";
}
