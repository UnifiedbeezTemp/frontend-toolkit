import { useState, useEffect } from "react";
import { useKnowledgeFiles } from "./hooks/useKnowledgeFiles";
import { useWebsites } from "./hooks/useWebsites";
import TabsSelect from "../../../../knowledge-files/TabSelect";
import FilesCard from "../../../../knowledge-files/files/FilesCard";
import WebsitesCard from "../../../../knowledge-files/websites/WebsitesCard";

interface Props {
  onFilesChange?: (fileMap: Map<string, File>) => void;
}

export default function KnowledgeFiles({ onFilesChange }: Props) {
  const [activeTab, setActiveTab] = useState<"files" | "website">("files");

  const {
    uploadingFiles,
    completedFiles,
    isDragOver,
    handleFilesUpdate,
    removeFile,
    cancelUpload,
    setDragOver,
    deletingFileId,
    fileMap,
  } = useKnowledgeFiles();

  const {
    websites,
    isAddModalOpen,
    newWebsiteUrl,
    selectedOption,
    urlError,
    inactivePages,
    currentWebsiteIndex,
    deleteConfirmOpen,
    websiteToDelete,
    isDeletingWebsite,
    isDeactivatingAllPages,
    isBulkUpdatingPages,
    isAddingWebsite,
    setIsAddModalOpen,
    setNewWebsiteUrl,
    setSelectedOption,
    setDeleteConfirmOpen,
    handleAddWebsite,
    handleDeleteClick,
    handleDeleteWebsite,
    togglePageStatus,
    toggleAllPagesStatus,
    openModal,
    closeModal,
    handleSaveInactivePages,
  } = useWebsites();

  useEffect(() => {
    onFilesChange?.(fileMap);
  }, [fileMap, onFilesChange]);

  return (
    <div className="mt-[2.4rem]">
      <div className="mb-[1.6rem]">
        <TabsSelect activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {activeTab === "files" ? (
        <FilesCard
          handleFilesUpdate={handleFilesUpdate}
          isDragOver={isDragOver}
          uploadingFiles={uploadingFiles}
          completedFiles={completedFiles}
          setDragOver={setDragOver}
          removeFile={removeFile}
          cancelUpload={cancelUpload}
          deletingFileId={deletingFileId}
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
          deleteConfirmOpen={deleteConfirmOpen}
          websiteToDelete={websiteToDelete}
          isDeletingWebsite={isDeletingWebsite}
          isDeactivatingAllPages={isDeactivatingAllPages}
          isBulkUpdatingPages={isBulkUpdatingPages}
          isAddingWebsite={isAddingWebsite}
          onUrlChange={setNewWebsiteUrl}
          onOptionChange={setSelectedOption}
          onAddWebsite={handleAddWebsite}
          onTogglePageStatus={togglePageStatus}
          onToggleAllPagesStatus={toggleAllPagesStatus}
          onOpenInactiveModal={openModal}
          onSaveInactivePages={handleSaveInactivePages}
          onCloseInactiveModal={closeModal}
          onDeleteClick={handleDeleteClick}
          onDeleteWebsite={handleDeleteWebsite}
          setDeleteConfirmOpen={setDeleteConfirmOpen}
        />
      )}
    </div>
  );
}
