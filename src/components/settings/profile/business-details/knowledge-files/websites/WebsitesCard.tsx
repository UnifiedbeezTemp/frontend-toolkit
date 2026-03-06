"use client";

import Card from "@/shared/src/components/ui/Card";
import Heading from "@/shared/src/components/ui/Heading";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import Text from "@/shared/src/components/ui/Text";
import AddNewPageModal from "./add-new-page/AddNewPageModal";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import WebsiteCard from "./WebsiteCard";
import InactivePagesModal from "./inactive-pages-modal/InactivePagesModal";
import { PageOption, Website } from "./utils/types";

interface WebsitesCardProps {
  websites: Website[];
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  newWebsiteUrl: string;
  selectedOption: PageOption;
  urlError: string;
  inactivePages: any[];
  currentWebsiteIndex: number | null;
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
  onUrlChange,
  onOptionChange,
  onAddWebsite,
  onTogglePageStatus,
  onToggleAllPagesStatus,
  onOpenInactiveModal,
  onSaveInactivePages,
  onCloseInactiveModal,
}: WebsitesCardProps) {
  const icons = useSupabaseIcons();

  return (
    <>
      <div className="rounded-[0.8rem] p-0 pb-[2.4rem] mt-[1.6rem] border border-border">
        <div className="py-[1.6rem] px-[2.4rem] border-b border-border">
          <Heading>Add website</Heading>
          <Text size="sm">Add the url of your business or personal site</Text>
        </div>

        <button
          className="px-[2.4rem] pt-[2rem] pb-[2.4rem] block w-full"
          onClick={() => setIsAddModalOpen(true)}
        >
          <div className="rounded-[1.2rem] border-2 border-dotted h-[18.7rem] cursor-pointer transition-all duration-200 border-border bg-[#F9FAFB] flex items-center justify-center">
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

        <div className="px-[2.4rem] pt-[2rem] space-y-4">
          {websites.map((website, index) => (
            <WebsiteCard
              key={index}
              website={website}
              index={index}
              onTogglePageStatus={onTogglePageStatus}
              onToggleAllPagesStatus={onToggleAllPagesStatus}
              onOpenInactiveModal={onOpenInactiveModal}
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
      />

      <InactivePagesModal
        isOpen={currentWebsiteIndex !== null}
        onClose={onCloseInactiveModal}
        onSave={onSaveInactivePages}
        pages={inactivePages}
      />
    </>
  );
}
