import Heading from "@/shared/src/components/ui/Heading";
import Text from "@/shared/src/components/ui/Text";
import { BusinessInfo } from "../utils/types";
import TabsSelect from "./TabsSelect";
import FileItem from "./FileItem";
import WebsiteCard from "./websites/WebsiteCard";

interface Props {
  currentInfo: BusinessInfo;
  activeTab: "files" | "website";
  setActiveTab: (tab: "files" | "website") => void;
}

export default function KnowledgeFilesView({
  currentInfo,
  activeTab,
  setActiveTab,
}: Props) {
  return (
    <div className="mt-[2.4rem]">
      <Heading size="sm" className="mb-[0.8rem]">
        Knowledge+ Files
      </Heading>

      <TabsSelect activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-[2rem]">
        {currentInfo.uploadedFiles.length === 0 &&
        currentInfo.websites.length === 0 ? (
          <Text>No files or websites uploaded</Text>
        ) : (
          <div className="space-y-2">
            {(activeTab === "files") &&
              currentInfo.uploadedFiles.map((file) => (
                <FileItem
                  key={file.id}
                  file={file}
                  onRemove={() => {}}
                  onCancel={() => {}}
                  isEditing={true}
                />
              ))}

            {(activeTab === "website" ) &&
              currentInfo.websites.map((website, index) => (
                <WebsiteCard
                  key={index}
                  website={website}
                  index={index}
                  isEditing={true}
                  onTogglePageStatus={() => {}}
                  onToggleAllPagesStatus={() => {}}
                  onOpenInactiveModal={() => {}}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
