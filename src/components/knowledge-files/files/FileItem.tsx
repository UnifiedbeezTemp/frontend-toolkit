"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Text from "../../ui/Text";
import Loader from "../../ui/Loader";
import { FileItemProps } from "./types";
import { getFileTypeColor } from "./utils/fileUtils";
import { useFileItemHandlers } from "./hooks/useFileItemHandlers";

export default function FileItem({
  file,
  onRemove,
  onCancel,
  onPreview,
  isDeleting = false,
}: FileItemProps) {
  const icons = useSupabaseIcons();
  const { hasError, isSaved, handleRemove } = useFileItemHandlers({
    file,
    onRemove,
    onCancel,
    onPreview,
    isDeleting,
  });

  return (
    <div
      className={`border-border border py-[1.6rem] px-[0.8rem] rounded-[0.8rem] ${file.error ? "border-destructive border-2 bg-destructive/10" : ""} ${isSaved && onPreview && !isDeleting ? "cursor-pointer hover:bg-muted/20 transition-colors" : ""}`}
    >
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
              )} text-white w-full flex items-center justify-center text-center text-[.8rem] px-[2px] rounded-[1px] top-[50%] overflow-hidden`}
            >
              {file.type}
            </div>
          </div>
          <Text className="text-[1.2rem] sm:text-[1.6rem] truncate whitespace-nowrap max-w-[20rem] sm:max-w-[200rem]">{file.name}</Text>
        </div>

        {isDeleting ? (
          <div className="bg-muted text-white rounded-full shrink-0 text-[1rem] flex items-center justify-center h-[2rem] w-[2rem] opacity-50">
            <Loader className="w-[1.2rem] h-[1.2rem] border-white" />
          </div>
        ) : (
          <button
            onClick={handleRemove}
            className="bg-muted text-white rounded-full shrink-0 text-[1rem] flex items-center justify-center h-[2rem] w-[2rem] hover:bg-destructive transition-colors"
            type="button"
          >
            <span className="mb-[3px]">×</span>
          </button>
        )}
      </div>

      {hasError && file.error && (
        <div className="mt-[1.6rem] text-[1.4rem] font-[600] text-destructive">
          <span className="block">{file.error}</span>
        </div>
      )}
    </div>
  );
}
