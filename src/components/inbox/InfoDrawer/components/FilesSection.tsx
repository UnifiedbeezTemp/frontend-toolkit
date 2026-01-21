import { File } from "../types"
import Text from "../../../ui/Text"
import ImageComponent from "../../../ui/ImageComponent"

interface FilesSectionProps {
  files: File[]
}

export default function FilesSection({ files }: FilesSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="bg-gray-50 rounded-[0.8rem] p-3 hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-3"
        >
          {file.thumbnail && (
            <ImageComponent
              src={file.thumbnail}
              alt={file.name}
              width={40}
              height={40}
              className="rounded"
            />
          )}
          <div className="flex-1">
            <Text className="text-[1.4rem] font-medium text-text-primary">
              {file.name}
            </Text>
            <Text className="text-[1.2rem] text-text-secondary">
              {file.size} {file.type}
            </Text>
          </div>
        </div>
      ))}
    </div>
  )
}
