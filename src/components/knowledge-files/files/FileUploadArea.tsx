import { useFileUpload } from "./hooks/useFileUpload";

interface FileUploadAreaProps {
  onFileUpload: (files: FileList) => void;
  isDragOver: boolean;
  onDragOverChange: (isOver: boolean) => void;
}

export default function FileUploadArea({
  onFileUpload,
  isDragOver,
  onDragOverChange,
}: FileUploadAreaProps) {
  const {
    fileInputRef,
    handleClick,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
  } = useFileUpload({
    onFileUpload,
    onDragOverChange,
  });

  return (
    <div
      className={`rounded-[1.2rem] border-2 border-dotted h-[18.7rem] cursor-pointer transition-all duration-200 ${
        isDragOver
          ? "border-brand-primary bg-brand-primary/5 scale-[1.02] shadow-lg"
          : "border-border bg-[#F9FAFB]"
      }`}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        accept=".pdf,.docx,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center justify-center h-[18.7rem]">
        <div className="text-center">
          {isDragOver ? (
            <>
              <div className="text-[1.6rem] font-[700] text-brand-primary mb-2">
                🎉 Drop to upload!
              </div>
              <div className="text-[1.4rem] text-text-primary">
                Release files to upload
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-[1.4rem] font-[700] text-brand-primary">
                  Click to upload
                </span>{" "}
                <span className="text-text-primary text-[1.4rem] font-[400] underline">
                  or drag and drop
                </span>
              </div>
              <p className="text-[1.4rem] text-text-primary mt-2">
                PDF, DOCX, JPG (max 10MB)
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
