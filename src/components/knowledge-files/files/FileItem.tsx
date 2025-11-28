import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { UploadedFile } from "../types";
import Text from "../../ui/Text";

interface FileItemProps {
  file: UploadedFile;
  onRemove: (fileId: string) => void;
  onCancel: (fileId: string) => void;
  isEditing?: boolean;
}

export default function FileItem({
  file,
  onRemove,
  onCancel,
  isEditing = false,
}: FileItemProps) {
  const icons = useSupabaseIcons();

  const getFileTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "bg-destructive";
      case "png":
      case "jpg":
      case "jpeg":
        return "bg-[#1671D9]";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="border-border border py-[1.6rem] px-[0.8rem] rounded-[0.8rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1rem]">
          <div className="relative shrink-0 flex-3">
            <ImageComponent
              src={icons.document}
              width={30}
              height={30}
              alt=""
            />
            <div
              className={`absolute ${getFileTypeColor(
                file.type
              )} text-white w-full flex items-center justify-center text-center text-[.8rem] px-[2px] rounded-[1px] top-[50%]`}
            >
              {file.type}
            </div>
          </div>
          <Text className="text-[1.2rem] sm:text-[1.6rem] truncate whitespace-nowrap max-w-[20rem] sm:max-w-[200rem]">{file.name}</Text>
        </div>

        {!isEditing && (
          <button
            onClick={() =>
              file.status === "uploading"
                ? onCancel(file.id)
                : onRemove(file.id)
            }
            className="bg-muted text-white rounded-full shrink-0 text-[1rem] flex items-center justify-center h-[2rem] w-[2rem] hover:bg-destructive transition-colors"
          >
            <span className="mb-[3px]">×</span>
          </button>
        )}
      </div>

      {file.status === "uploading" && (
        <div className="flex items-center justify-between gap-[1rem] mt-[1.6rem] text-[1.4rem] font-[500] text-text-primary">
          <span>Uploading</span>
          <div className="flex items-center gap-2 flex-1">
            <div className="bg-border rounded-full h-[.7rem] mt-[3px] w-full overflow-hidden">
              <div
                className="bg-warning h-full w-full transition-all duration-300"
                style={{ width: `${file.progress}%` }}
              />
            </div>
            <span>{Math.round(file.progress)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
