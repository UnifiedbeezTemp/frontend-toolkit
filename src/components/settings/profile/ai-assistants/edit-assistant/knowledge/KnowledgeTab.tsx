"use client";

import { useState } from "react";
import { useAssistantWebsites } from "./hooks/useAssistantWebsites";
import { handleFilePreview } from "./hooks/utils/fileHandlers";
import { KnowledgeTabProps } from "./types";
import ConfirmActionModal from "../../../../../modal/ConfirmActionModal";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import Heading from "../../../../../ui/Heading";
import ImageComponent from "../../../../../ui/ImageComponent";
import Text from "../../../../../ui/Text";
import WebsiteCard from "../../../../../knowledge-files/websites/WebsiteCard";
import AddNewPageModal from "../../../../../knowledge-files/websites/add-new-page/AddNewPageModal";
import InactivePagesModal from "../../../../../knowledge-files/websites/inactive-pages-modal/InactivePagesModal";
import FileItem from "../../../../../knowledge-files/files/FileItem";
import FileUploadArea from "../../../../../knowledge-files/files/FileUploadArea";
import TabsSelect from "../../../../../knowledge-files/TabSelect";

export default function KnowledgeTab({
  assistant,
  fileManagement,
}: KnowledgeTabProps) {
  const icons = useSupabaseIcons();
  const [activeTab, setActiveTab] = useState<"files" | "website">("files");

  const {
    websites,
    isAddModalOpen,
    newWebsiteUrl,
    selectedOption,
    urlError,
    inactivePages,
    currentWebsiteIndex,
    isAddingWebsite,
    deleteConfirmOpen,
    websiteToDelete,
    isDeletingWebsite,
    isDeactivatingAllPages,
    isBulkUpdatingPages,
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
  } = useAssistantWebsites(assistant);

  const {
    uploadingFiles,
    savedFiles,
    failedFiles,
    isDragOver,
    handleFilesUpdate,
    removeFile,
    cancelUpload,
    setDragOver,
    handleDelete,
    isDeletingFile,
    deletingFileId,
  } = fileManagement;

  const handleFileRemove = async (id: string, documentId?: number) => {
    if (documentId && assistant) {
      await handleDelete({ aiId: assistant.id, documentId });
    } else {
      removeFile(id);
    }
  };

  return (
    <div className="space-y-[2.4rem] xl:overflow-y-auto xl:max-h-[calc(85.8rem-20rem)] xl:pr-[0.4rem]">
      <TabsSelect activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "website" ? (
        <div className="space-y-[2rem]">
          <div className="border border-border rounded-[0.8rem] p-[1.6rem]">
            <div className="">
              <Heading className="text-[1.6rem] sm:text-[2rem]">
                Add website
              </Heading>
              <Text size="sm" className="text-[1.4rem] sm:text-[1.6rem]">
                Add the url of your business or personal site
              </Text>
            </div>

            <button
              type="button"
              className="py-[2rem] sm:py-[2.4rem] block w-full"
              onClick={() => setIsAddModalOpen(true)}
            >
              <div className="rounded-[1.2rem] border-2 border-dotted h-[18.7rem] cursor-pointer transition-all duration-200 border-border bg-gray-50 flex items-center justify-center">
                <div className="text-[1.4rem] font-[700] text-brand-primary flex items-center gap-[.8rem]">
                  Add page
                  <ImageComponent
                    src={icons.documentGreen}
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </button>

            <div className="space-y-4">
              {websites?.map((website, index) => (
                <WebsiteCard
                  key={website.id}
                  website={website}
                  index={index}
                  onTogglePageStatus={togglePageStatus}
                  onToggleAllPagesStatus={toggleAllPagesStatus}
                  onOpenInactiveModal={openModal}
                  onDelete={handleDeleteClick}
                  isDeleting={
                    isDeletingWebsite && websiteToDelete === website.id
                  }
                  isMobileView={true}
                  isTogglingAllPages={isDeactivatingAllPages}
                  forceMobileStyle={true}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-[2rem]">
          <div className="border border-border rounded-[0.8rem] p-[1.6rem]">
            <div className="">
              <Heading className="text-[1.6rem] sm:text-[2rem]">
                Upload document
              </Heading>
              <Text size="sm" className="text-[1.4rem] sm:text-[1.6rem]">
                Choose a document to get started
              </Text>
            </div>

            <div className="py-[2rem]">
              <FileUploadArea
                onFileUpload={handleFilesUpdate}
                isDragOver={isDragOver}
                onDragOverChange={setDragOver}
              />

              <div className="mt-[0.9rem] sm:mt-[2rem] max-h-[40rem] overflow-y-auto space-y-[0.9rem] sm:space-y-[2rem] pr-[0.4rem]">
                {uploadingFiles.map((file) => (
                  <FileItem
                    key={`uploading-${file.id}`}
                    file={file}
                    onRemove={handleFileRemove}
                    onCancel={cancelUpload}
                  />
                ))}
                {savedFiles.map((file) => (
                  <FileItem
                    key={`saved-${file.documentId || file.id}`}
                    file={file}
                    onRemove={handleFileRemove}
                    onCancel={cancelUpload}
                    onPreview={handleFilePreview}
                    isDeleting={
                      isDeletingFile && deletingFileId === file.documentId
                    }
                  />
                ))}

                {failedFiles.map((file, index) => (
                  <FileItem
                    key={`failed-${file.id}-${index}`}
                    file={file}
                    onRemove={handleFileRemove}
                    onCancel={cancelUpload}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <AddNewPageModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        url={newWebsiteUrl}
        onUrlChange={setNewWebsiteUrl}
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
        onAdd={handleAddWebsite}
        urlError={urlError}
        isLoading={isAddingWebsite}
        bottomSheet
      />

      <InactivePagesModal
        isOpen={currentWebsiteIndex !== null}
        onClose={closeModal}
        onSave={handleSaveInactivePages}
        pages={inactivePages}
        isLoading={isBulkUpdatingPages}
        bottomSheet
      />

      <ConfirmActionModal
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
        }}
        onConfirm={() => {
          if (websiteToDelete !== null) {
            handleDeleteWebsite(websiteToDelete);
          }
        }}
        title="Delete website"
        description="This action cannot be undone. This will permanently delete the website and all its pages."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="danger"
        confirmLoading={isDeletingWebsite}
        bottomSheet
      />
    </div>
  );
}
