import { useState } from "react";
import WebsitePagesSection from "./WebsitePagesSection";
import { Website } from "./utils/types";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import WebsiteDropdown from "./components/WebsiteDropdown";
import Player from "lottie-react";
import animationData from "../../../animations/Preloader.json";

interface WebsiteCardProps {
  website: Website;
  index: number;
  onTogglePageStatus?: (websiteIndex: number, pageUrl: string) => void;
  onToggleAllPagesStatus?: (
    websiteIndex: number,
    status: "active" | "inactive",
  ) => void;
  onOpenInactiveModal?: (websiteIndex: number) => void;
  onDelete?: (websiteId: number) => void;
  isDeleting?: boolean;
  isEditing?: boolean;
  isMobileView?: boolean;
  isTogglingAllPages?: boolean;
  forceMobileStyle?: boolean;
}

type ActiveTab = "active" | "inactive";

export default function WebsiteCard({
  website,
  index,
  onTogglePageStatus,
  onToggleAllPagesStatus,
  onOpenInactiveModal,
  onDelete,
  isDeleting = false,
  isEditing = false,
  isMobileView = false,
  isTogglingAllPages = false,
  forceMobileStyle = false,
}: WebsiteCardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("active");

  const activePages = website.pages.filter((page) => page.status === "active");
  const inactivePages = website.pages.filter(
    (page) => page.status === "inactive",
  );
  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
  };
  const isEntireAndPending =
    website.crawlType === "ENTIRE_SITE" &&
    website.discoveryStatus === "PENDING";

  return (
    <div
      className={`border border-border py-[1rem] px-[0.6rem] rounded-[0.8rem] ${
        isMobileView ? "" : "lg:p-[1.6rem] lg:px-[1.8rem]"
      }`}
    >
      <WebsiteHeader
        website={website}
        onDelete={onDelete ? () => onDelete(website.id) : undefined}
        isDeleting={isDeleting}
      />

      {isEntireAndPending && (
        <div className="mb-4">
          <Player
            autoplay
            loop
            animationData={animationData}
            style={{ height: 100 }}
          />
          <p className="text-[1.2rem] text-text-primary mt-[0.6rem] text-center">
            Discovering pages... this might take a while!
          </p>
        </div>
      )}

      {website.pages.length > 0 && (
        <div className="lg:hidden py-[2rem] flex items-center">
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
        </div>
      )}

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
            isTogglingAll={isTogglingAllPages}
            forceMobileStyle={forceMobileStyle}
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
            forceMobileStyle={forceMobileStyle}
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
          isTogglingAll={isTogglingAllPages}
          forceMobileStyle={forceMobileStyle}
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
            forceMobileStyle={forceMobileStyle}
          />
        )}
      </div>
    </div>
  );
}

function WebsiteHeader({
  website,
  onDelete,
  isDeleting = false,
}: {
  website: Website;
  onDelete?: () => void;
  isDeleting?: boolean;
}) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex items-center justify-between bg-input-filled border border-border py-[0.4rem] px-[0.8rem] rounded-[0.8rem] mb-4">
      <div className="flex items-center gap-[.6rem] sm:gap-[1.6rem]">
        <div className="bg-primary rounded-[0.6rem] p-[0.4rem]">
          <ImageComponent
            src={icons.websiteActive}
            alt=""
            width={25}
            height={25}
          />
        </div>
        <p className="text-[1.4rem] text-text-primary">
          {website.displayName || website.url}
        </p>
      </div>
      {onDelete ? (
        <WebsiteDropdown onDelete={onDelete} isDeleting={isDeleting} />
      ) : null}
    </div>
  );
}
