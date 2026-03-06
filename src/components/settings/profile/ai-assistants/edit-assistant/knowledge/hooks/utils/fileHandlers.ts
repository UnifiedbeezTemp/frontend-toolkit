import { UploadedFile } from "../../../../../../../knowledge-files/types";

export const handleFilePreview = (file: UploadedFile) => {
  if (file.url) {
    window.open(file.url, "_blank");
  }
};
