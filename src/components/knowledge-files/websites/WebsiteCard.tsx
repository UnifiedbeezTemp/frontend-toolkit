import { useState } from "react";
import WebsitePagesSection from "./WebsitePagesSection";
import DotsMenu from "./DotsMenu";
import { Website } from "./utils/types";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";

interface WebsiteCardProps {
  website: Website;
  index: number;
  onTogglePageStatus?: (websiteIndex: number, pageUrl: string) => void;
  onToggleAllPagesStatus?: (websiteIndex: number, status: "active" | "inactive") => void;
  onOpenInactiveModal?: (websiteIndex: number) => void;
  isEditing?: boolean;
}

type ActiveTab = "active" | "inactive";

export default function WebsiteCard({
  website,
  index,
  onTogglePageStatus,
  onToggleAllPagesStatus,
  onOpenInactiveModal,
  isEditing = false,
}: WebsiteCardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("active");

  const activePages = website.pages.filter(page => page.status === "active");
  const inactivePages = website.pages.filter(page => page.status === "inactive");
  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="border border-border py-[1rem] px-[0.6rem] lg:p-[1.6rem] lg:px-[1.8rem] rounded-[0.8rem]">
      <WebsiteHeader website={website} />

     {website.pages.length > 0 && <div className="lg:hidden py-[2rem] flex items-center">
        <button 
          className={`border-b-[2px] w-full text-[1.4rem] pb-[1.2rem] font-[700] transition-colors ${
            activeTab === "active" 
              ? "border-brand-primary text-brand-primary" 
              : "border-border text-input-stroke"
          }`}
          onClick={() => handleTabClick("active")}
        >
          Active ({activePages.length})
        </button>
        <button 
          className={`border-b-[2px] w-full text-[1.4rem] pb-[1.2rem] font-[700] transition-colors ${
            activeTab === "inactive" 
              ? "border-brand-primary text-brand-primary" 
              : "border-border text-input-stroke"
          }`}
          onClick={() => handleTabClick("inactive")}
        >
          Inactive ({inactivePages.length})
        </button>
      </div>}
      
      <div className="lg:hidden">
        {activeTab === "active" ? (
          <WebsitePagesSection
            title="Active pages"
            pages={activePages}
            websiteIndex={index}
            isActive={true}
            onTogglePageStatus={onTogglePageStatus}
            onToggleAll={() => onToggleAllPagesStatus?.(index, "inactive")}
            isEditing={isEditing}
          />
        ) : (
          <WebsitePagesSection
            title="Inactive pages"
            pages={inactivePages}
            websiteIndex={index}
            isActive={false}
            onTogglePageStatus={onTogglePageStatus}
            showAllButton
            onShowAll={() => onOpenInactiveModal?.(index)}
            isEditing={isEditing}
          />
        )}
      </div>

      <div className="hidden lg:block">
        <WebsitePagesSection
          title="Active pages"
          pages={activePages}
          websiteIndex={index}
          isActive={true}
          onTogglePageStatus={onTogglePageStatus}
          onToggleAll={() => onToggleAllPagesStatus?.(index, "inactive")}
          isEditing={isEditing}
        />
        
        {inactivePages.length > 0 && (
          <WebsitePagesSection
            title="Inactive pages"
            pages={inactivePages}
            websiteIndex={index}
            isActive={false}
            onTogglePageStatus={onTogglePageStatus}
            showAllButton
            onShowAll={() => onOpenInactiveModal?.(index)}
            isEditing={isEditing}
          />
        )}
      </div>
    </div>
  );
}

function WebsiteHeader({ website }: { website: Website }) {
  const icons = useSupabaseIcons();
  
  return (
    <div className="flex items-center justify-between bg-input-filled border border-border py-[0.4rem] px-[0.8rem] rounded-[0.8rem] mb-4">
      <div className="flex items-center gap-[.6rem] sm:gap-[1.6rem]">
        <div className="bg-primary rounded-[0.6rem] p-[0.4rem]">
          <ImageComponent src={icons.websiteActive} alt="" width={25} height={25} />
        </div>
        <p className="text-[1.4rem] text-text-primary">{website.url}</p>
      </div>
      <DotsMenu />
    </div>
  );
}