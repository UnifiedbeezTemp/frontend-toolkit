import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import { UploadedFile } from "../types";
import FileItem from "./FileItem";
import FileUploadArea from "./FileUploadArea";
import Button from "../../ui/Button";

interface Props {
  handleFilesUpdate: (files: FileList) => void;
  isDragOver: boolean;
  uploadingFiles: UploadedFile[];
  completedFiles: UploadedFile[];
  setDragOver: (isOver: boolean) => void;
  removeFile: (id: string, documentId?: number) => void;
  cancelUpload: (id: string) => void;
  deletingFileId?: string | null;
  hasUnsavedFiles: boolean;
  unsavedFilesCount: number;
  onSaveUnsavedFiles: () => void;
  isSubmitting: boolean;
}

export default function FilesCard({
  handleFilesUpdate,
  isDragOver,
  uploadingFiles,
  completedFiles,
  setDragOver,
  removeFile,
  cancelUpload,
  deletingFileId,
  hasUnsavedFiles,
  unsavedFilesCount,
  onSaveUnsavedFiles,
  isSubmitting,
}: Props) {
  return (
    <div className="rounded-[0.8rem] p-0 mt-[1.6rem] bg-primary border border-input-stroke">
      <div className="py-[1.6rem] px-[2.4rem] border-b border-input-stroke">
        <Heading className="text-[1.8rem] sm:text-[2rem]">
          Upload document
        </Heading>
        <Text size="sm">Choose a document to get started</Text>
      </div>

      <div className="px-[1rem] lg:px-[2.4rem] pt-[2rem] pb-[2.4rem] lg:pb-[2.4rem]">
        <FileUploadArea
          onFileUpload={handleFilesUpdate}
          isDragOver={isDragOver}
          onDragOverChange={setDragOver}
        />

        {(uploadingFiles.length > 0 || hasUnsavedFiles) && (
          <div className="mt-6 flex items-center justify-between p-4 bg-brand-primary/5 border border-brand-primary/20 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col">
              <span className="text-[1.4rem] font-medium text-brand-primary">
                { "Unsaved files detected"}
              </span>
              <span className="text-[1.2rem] text-brand-primary/70">
                {hasUnsavedFiles
                  ? `${unsavedFilesCount} file${unsavedFilesCount > 1 ? "s" : ""} ready to be saved`
                  : "Please wait for uploads to complete"}
              </span>
            </div>
            <Button
              onClick={onSaveUnsavedFiles}
              loading={isSubmitting}
              disabled={isSubmitting || !hasUnsavedFiles}
              className="px-6 py-2  text-[1.4rem] font-semibold rounded-md hover:bg-brand-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-sm shadow-brand-primary/20"
            >
              Save Files
            </Button>
          </div>
        )}

        <div className="mt-[0.9rem] sm:mt-[2rem] space-y-[0.9rem] sm:space-y-[2rem]">
          {uploadingFiles.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onRemove={removeFile}
              onCancel={cancelUpload}
              isDeleting={deletingFileId === file.id}
            />
          ))}

          {completedFiles.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onRemove={removeFile}
              onCancel={cancelUpload}
              isDeleting={deletingFileId === file.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
