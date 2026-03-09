import WebsitePagesSection from "./WebsitePagesSection";
import DotsMenu from "./DotsMenu";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import { Website } from "./utils/types";

interface WebsiteCardProps {
  website: Website;
  index: number;
  onTogglePageStatus?: (websiteIndex: number, pageUrl: string) => void;
  onToggleAllPagesStatus?: (websiteIndex: number, status: "active" | "inactive") => void;
  onOpenInactiveModal?: (websiteIndex: number) => void;
  isEditing?: boolean;
}

export default function WebsiteCard({
  website,
  index,
  onTogglePageStatus,
  onToggleAllPagesStatus,
  onOpenInactiveModal,
  isEditing = false,
}: WebsiteCardProps) {
  const activePages = website.pages.filter(page => page.status === "active");
  const inactivePages = website.pages.filter(page => page.status === "inactive");

  return (
    <div className="border border-border p-[1.6rem] px-[1.8rem] rounded-[0.8rem]">
      <WebsiteHeader website={website} />
      
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
  );
}

function WebsiteHeader({ website }: { website: Website }) {
  const icons = useSupabaseIcons();
  
  return (
    <div className="flex items-center justify-between bg-input-filled border border-border py-[0.4rem] px-[0.8rem] rounded-[0.8rem] mb-4">
      <div className="flex items-center gap-[1.6rem]">
        <div className="bg-primary rounded-[0.6rem] p-[0.4rem]">
          <ImageComponent src={icons.websiteActive} alt="" width={25} height={25} />
        </div>
        <p className="text-[1.4rem] text-text-primary">{website.url}</p>
      </div>
      <DotsMenu />
    </div>
  );
}