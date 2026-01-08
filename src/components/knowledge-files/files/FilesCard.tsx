import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import { UploadedFile } from "../types";
import FileItem from "./FileItem";
import FileUploadArea from "./FileUploadArea";

interface Props {
  handleFilesUpdate: (files: FileList) => void;
  isDragOver: boolean;
  uploadingFiles: UploadedFile[];
  completedFiles: UploadedFile[];
  setDragOver: (isOver: boolean) => void;
  removeFile: (id: string, documentId?: number) => void;
  cancelUpload: (id: string) => void;
  deletingFileId?: string | null;
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
}: Props) {
  return (
    <div className="rounded-[0.8rem] p-0 mt-[1.6rem] bg-primary border border-input-stroke">
      <div className="py-[1.6rem] px-[2.4rem] border-b border-input-stroke">
        <Heading className="text-[1.8rem] sm:text-[2rem]">Upload document</Heading>
        <Text size="sm">Choose a document to get started</Text>
      </div>

      <div className="px-[1rem] lg:px-[2.4rem] pt-[2rem] pb-[2.4rem] lg:pb-[2.4rem]">
        <FileUploadArea
          onFileUpload={handleFilesUpdate}
          isDragOver={isDragOver}
          onDragOverChange={setDragOver}
        />

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
