import { File } from "../types";
import Text from "../../../ui/Text";
import ImageComponent from "../../../ui/ImageComponent";
import FilesIcon from "../../../../assets/icons/FilesIcon";

interface FilesSectionProps {
  files: File[];
}

export default function FilesSection({ files }: FilesSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="rounded-[0.8rem] p-3 hover:bg-black-5 transition-colors cursor-pointer flex items-center gap-3 border border-input-stroke"
        >
          <div className="relative rounded-[1.4rem] overflow-hidden shrink-0">
          {file.thumbnail && (
            <ImageComponent
              src={file.thumbnail}
              alt={file.name}
              width={44}
              height={44}
              className="rounded"
            />
          )}
          <div className="absolute inset-0 flex justify-center items-center text-brand-primary bg-black/15">
              <FilesIcon/>
          </div>
          </div>
          <div className="flex-1">
            <Text className="text-[1.4rem] font-medium text-dark-base-70">
              {file.name}
            </Text>
            <Text className="text-[1.2rem] text-dark-base-40">
              {file.size} {file.type}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
