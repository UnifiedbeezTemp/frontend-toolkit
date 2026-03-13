import Text from "@/shared/src/components/ui/Text";
import FileItem from "./FileItem";
import FileUploadArea from "./FileUploadArea";
import Heading from "@/shared/src/components/ui/Heading";
import { UploadedFile } from "../utils/types";

interface Props {
  handleFilesUpdate: (files: FileList) => void;
  isDragOver: boolean;
  uploadingFiles: UploadedFile[];
  completedFiles: UploadedFile[];
  setDragOver: (isOver: boolean) => void;
  removeFile: (id: string) => void;
  cancelUpload: (id: string) => void;
}

export default function FilesCard({
  handleFilesUpdate,
  isDragOver,
  uploadingFiles,
  completedFiles,
  setDragOver,
  removeFile,
  cancelUpload,
}: Props) {
  return (
    <div className="rounded-[0.8rem] border border-border p-0 mt-[1.6rem]">
      <div className="py-[1.6rem] px-[2.4rem] border-b border-border">
        <Heading>Upload document</Heading>
        <Text size="sm">Choose a document to get started</Text>
      </div>

      <div className="px-[2.4rem] pt-[2rem] pb-[2.4rem]">
        <FileUploadArea
          onFileUpload={handleFilesUpdate}
          isDragOver={isDragOver}
          onDragOverChange={setDragOver}
        />

        <div className="mt-[2rem] space-y-[2rem]">
          {uploadingFiles.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onRemove={removeFile}
              onCancel={cancelUpload}
            />
          ))}

          {completedFiles.map((file, idx) => (
            <FileItem
              key={idx}
              file={file}
              onRemove={removeFile}
              onCancel={cancelUpload}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
