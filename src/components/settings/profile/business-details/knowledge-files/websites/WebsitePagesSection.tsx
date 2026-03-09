import Heading from "@/shared/src/components/ui/Heading";
import Button from "@/shared/src/components/ui/Button";
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
}: WebsitePagesSectionProps) {
  if (pages.length === 0) return null;

  return (
    <div className={isActive ? "py-[2.4rem] border-b border-border" : "py-[2.4rem]"}>
      <div className="flex items-center justify-between mb-4">
        <Heading size="xs">{title}</Heading>
        {!isEditing && (isActive ? (
          <Button variant="secondary" className="rounded-[0.8rem] p-[0.8rem] text-[1.4rem]" onClick={onToggleAll}>
            Deactivate all
          </Button>
        ) : showAllButton && (
          <Button variant="secondary" className="rounded-[0.8rem] p-[0.8rem] text-[1.4rem]" onClick={onShowAll}>
            Show all
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {pages.map((page, pageIndex) => (
          <PageItem
            key={`${websiteIndex}-${page.url}`}
            page={page}
            websiteIndex={websiteIndex}
            isActive={isActive}
            onToggleStatus={onTogglePageStatus}
            showBorder={pageIndex < pages.length - 1}
            isEditing={isEditing}
          />
        ))}
      </div>
    </div>
  );
}