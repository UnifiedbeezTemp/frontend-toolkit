import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import PageItem from "./PageItem";
import { WebsitePage } from "./utils/types";

interface WebsitePagesSectionProps {
 title: string;
  pages: WebsitePage[];
  websiteIndex: number;
  isActive: boolean;
  onTogglePageStatus?: (websiteIndex: number, pageUrl: string) => void;
  onToggleAll?: () => void;
  showAllButton?: boolean;
  onShowAll?: () => void;
  isEditing?: boolean;
  isTogglingAll?: boolean;
  forceMobileStyle?: boolean;
}

export default function WebsitePagesSection({
  title,
  pages,
  websiteIndex,
  isActive,
  onTogglePageStatus,
  onToggleAll,
  showAllButton = false,
  onShowAll,
  isEditing = false,
  isTogglingAll = false,
  forceMobileStyle = false,
}: WebsitePagesSectionProps) {
  if (pages.length === 0) return null;

  return (
    <div className={isActive ? "py-[2.4rem] lg:border-b border-border" : "py-[2.4rem]"}>
      <div className="flex items-center justify-between mb-[1.6rem] lg:mb-4">
        <Heading  className="text-[1.4rem]">{title}</Heading>
        {!isEditing && (isActive ? (
          <Button 
            variant="secondary" 
            className="rounded-[0.8rem] p-[0.8rem] text-[1.4rem]" 
            onClick={onToggleAll}
            loading={isTogglingAll}
            disabled={isTogglingAll}
          >
            Deactivate all
          </Button>
        ) : showAllButton && (
          <Button 
            variant="secondary" 
            className="rounded-[0.8rem] p-[0.8rem] text-[1.4rem]" 
            onClick={onShowAll}
          >
            Show all
          </Button>
        ))}
      </div>

      <div className="max-h-[40rem] overflow-y-auto space-y-2 sm:space-y-[2rem] pr-[0.4rem]">
        {pages.map((page, pageIndex) => (
          <PageItem
            key={page.id}
            page={page}
            websiteIndex={websiteIndex}
            isActive={isActive}
            onToggleStatus={onTogglePageStatus}
            showBorder={pageIndex < pages.length - 1}
            isEditing={isEditing}
            forceMobileStyle={forceMobileStyle}
          />
        ))}
      </div>
    </div>
  );
}