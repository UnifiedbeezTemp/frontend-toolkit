import Heading from "@/shared/src/components/ui/Heading";
import { BusinessInfo, UploadedFile } from "../utils/types";
import TabsSelect from "./TabsSelect";
import FilesCard from "./FilesCard";
import WebsitesCard from "./websites/WebsitesCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useWebsites } from "./websites/hooks/useWebsites";
import { useInactivePagesModal } from "./websites/hooks/useInactivePagesModal";
import { Website } from "./websites/utils/types";

interface Props {
  currentInfo: BusinessInfo;
  updateEditingFiles: (files: UploadedFile[]) => void;
  updateEditingWebsites: (websites: Website[]) => void;
}

export default function KnowledgeFilesEdit({
  currentInfo,
  updateEditingFiles,
  updateEditingWebsites,
}: Props) {
  const [activeTab, setActiveTab] = useState<"files" | "website">("files");
  const [uploadingFiles, setUploadingFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const {
    websites,
    newWebsiteUrl,
    selectedOption,
    urlError,
    setNewWebsiteUrl,
    setSelectedOption,
    addWebsite,
    togglePageStatus,
    toggleAllPagesStatus,
  } = useWebsites(currentInfo.websites || []);

  const { currentWebsiteIndex, openModal, closeModal } = useInactivePagesModal();

  useEffect(() => {
    updateEditingWebsites(websites);
  }, [websites, updateEditingWebsites]); 

  const handleFilesUpdate = (files: FileList) => {
    const newUploadingFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.split("/")[1]?.toUpperCase() || "FILE",
      size: file.size,
      progress: 0,
      status: "uploading" as const,
    }));

    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);

    newUploadingFiles.forEach((file) => {
      simulateFileUpload(file);
    });
  };

  const simulateFileUpload = (file: UploadedFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      setUploadingFiles(prev =>
        prev.map(f => f.id === file.id ? { ...f, progress } : f)
      );

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploadingFiles(prev => prev.filter(f => f.id !== file.id));
          
          const completedFile = { ...file, progress: 100, status: "completed" as const };
          updateEditingFiles([...currentInfo.uploadedFiles, completedFile]);
        }, 500);
      }
    }, 200);
  };

  const removeFile = (id: string) => {
    setUploadingFiles(prev => prev.filter(file => file.id !== id));
    updateEditingFiles(currentInfo.uploadedFiles.filter(file => file.id !== id));
  };

  const cancelUpload = (id: string) => {
    setUploadingFiles(prev => prev.filter(file => file.id !== id));
  };

  const setDragOver = (isOver: boolean) => {
    setIsDragOver(isOver);
  };

  const handleAddWebsite = () => {
    if (addWebsite()) {
      setIsAddModalOpen(false);
    }
  };

  const handleSaveInactivePages = (selectedUrls: string[]) => {
    if (currentWebsiteIndex !== null) {
      selectedUrls.forEach((pageUrl) => {
        togglePageStatus(currentWebsiteIndex, pageUrl);
      });
    }
    closeModal();
  };

  const currentWebsite = currentWebsiteIndex !== null ? websites[currentWebsiteIndex] : null;
  const inactivePages = currentWebsite
    ? currentWebsite.pages.filter((page) => page.status === "inactive")
    : [];

  return (
    <div className="mt-[2.4rem]">
      <Heading size="sm" className="mb-[0.8rem]">
        Knowledge+ Files
      </Heading>

      <TabsSelect activeTab={activeTab} setActiveTab={setActiveTab} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "files" ? (
            <FilesCard
              handleFilesUpdate={handleFilesUpdate}
              isDragOver={isDragOver}
              uploadingFiles={uploadingFiles}
              completedFiles={currentInfo.uploadedFiles}
              setDragOver={setDragOver}
              removeFile={removeFile}
              cancelUpload={cancelUpload}
            />
          ) : (
            <WebsitesCard
              websites={websites}
              isAddModalOpen={isAddModalOpen}
              setIsAddModalOpen={setIsAddModalOpen}
              newWebsiteUrl={newWebsiteUrl}
              selectedOption={selectedOption}
              urlError={urlError}
              inactivePages={inactivePages}
              currentWebsiteIndex={currentWebsiteIndex}
              onUrlChange={setNewWebsiteUrl}
              onOptionChange={setSelectedOption}
              onAddWebsite={handleAddWebsite}
              onTogglePageStatus={togglePageStatus}
              onToggleAllPagesStatus={toggleAllPagesStatus}
              onOpenInactiveModal={openModal}
              onSaveInactivePages={handleSaveInactivePages}
              onCloseInactiveModal={closeModal}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}