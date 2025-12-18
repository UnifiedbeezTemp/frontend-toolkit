"use client";

import AddNewPageModal from "./add-new-page/AddNewPageModal";
import WebsiteCard from "./WebsiteCard";
import InactivePagesModal from "./inactive-pages-modal/InactivePagesModal";
import ConfirmActionModal from "../../modal/ConfirmActionModal";
import { PageOption, Website } from "./utils/types";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import ImageComponent from "../../ui/ImageComponent";

interface WebsitesCardProps {
  websites: Website[];
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  newWebsiteUrl: string;
  selectedOption: PageOption;
  urlError: string;
  inactivePages: any[];
  currentWebsiteIndex: number | null;
  deleteConfirmOpen: boolean;
  websiteToDelete: number | null;
  isDeletingWebsite: boolean;
  isDeactivatingAllPages: boolean;
  isBulkUpdatingPages: boolean;
  isAddingWebsite: boolean;
  onUrlChange: (url: string) => void;
  onOptionChange: (option: PageOption) => void;
  onAddWebsite: () => void;
  onTogglePageStatus: (websiteIndex: number, pageUrl: string) => void;
  onToggleAllPagesStatus: (
    websiteIndex: number,
    status: "active" | "inactive"
  ) => void;
  onOpenInactiveModal: (websiteIndex: number) => void;
  onSaveInactivePages: (selectedUrls: string[]) => void;
  onCloseInactiveModal: () => void;
  onDeleteClick: (websiteId: number) => void;
  onDeleteWebsite: (websiteId: number) => void;
  setDeleteConfirmOpen: (open: boolean) => void;
}

export default function WebsitesCard({
  websites,
  isAddModalOpen,
  setIsAddModalOpen,
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
  onUrlChange,
  onOptionChange,
  onAddWebsite,
  onTogglePageStatus,
  onToggleAllPagesStatus,
  onOpenInactiveModal,
  onSaveInactivePages,
  onCloseInactiveModal,
  onDeleteClick,
  onDeleteWebsite,
  setDeleteConfirmOpen,
}: WebsitesCardProps) {
  const icons = useSupabaseIcons();

  return (
    <>
      <div className="rounded-[0.8rem] p-0 pb-[2.4rem] mt-[1.6rem] border border-border bg-primary">
        <div className="py-[1.6rem] px-[2.4rem] border-b border-border">
          <Heading className="text-[1.6rem] sm:text-[2rem]">Add website</Heading>
          <Text size="sm" className="text-[1.4rem] sm:text-[1.6rem]">Add the url of your business or personal site</Text>
        </div>

        <button
          className="px-[1.2rem] sm:px-[1.7rem] md:px-[2.4rem] py-[2rem] sm:py-[2.4rem] block w-full"
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

        <div className="px-[1.2rem] lg:px-[2.4rem] sm:pt-[2rem] space-y-4">
          {websites.map((website, index) => (
            <WebsiteCard
              key={website.id}
              website={website}
              index={index}
              onTogglePageStatus={onTogglePageStatus}
              onToggleAllPagesStatus={onToggleAllPagesStatus}
              onOpenInactiveModal={onOpenInactiveModal}
              onDelete={onDeleteClick}
              isDeleting={isDeletingWebsite && websiteToDelete === website.id}
              isMobileView={true}
              isTogglingAllPages={isDeactivatingAllPages}
              forceMobileStyle={false}
            />
          ))}
        </div>
      </div>

      <AddNewPageModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        url={newWebsiteUrl}
        onUrlChange={onUrlChange}
        selectedOption={selectedOption}
        onOptionChange={onOptionChange}
        onAdd={onAddWebsite}
        urlError={urlError}
        isLoading={isAddingWebsite}
      />

      <InactivePagesModal
        isOpen={currentWebsiteIndex !== null}
        onClose={onCloseInactiveModal}
        onSave={onSaveInactivePages}
        pages={inactivePages}
        isLoading={isBulkUpdatingPages}
      />

      <ConfirmActionModal
        isOpen={deleteConfirmOpen}
        onClose={() => {
          setDeleteConfirmOpen(false);
        }}
        onConfirm={() => {
          if (websiteToDelete !== null) {
            onDeleteWebsite(websiteToDelete);
          }
        }}
        title="Delete website"
        description="This action cannot be undone. This will permanently delete the website and all its pages."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        tone="danger"
        confirmLoading={isDeletingWebsite}
      />
    </>
  );
}
