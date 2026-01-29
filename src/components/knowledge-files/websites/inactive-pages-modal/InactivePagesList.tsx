import { WebsitePage } from "../utils/types";
import Checkbox from "../../../ui/CheckBox";
import InactivePageItem from "./InactivePageItem";

interface InactivePagesListProps {
  pages: WebsitePage[];
  selectedUrls: Set<string>;
  onPageSelectionToggle: (pageUrl: string) => void;
  isAllSelected: boolean;
  onToggleAll: () => void;
}

export default function InactivePagesList({
  pages,
  selectedUrls,
  onPageSelectionToggle,
  isAllSelected,
  onToggleAll,
}: InactivePagesListProps) {
  return (
    <div className="border border-border mt-[2.4rem] rounded-[0.8rem]">
      <div className="flex items-center gap-[1rem] px-[0.8rem] py-[1.2rem] border-b border-border bg-input-filled">
        <Checkbox checked={isAllSelected} onChange={onToggleAll} />
        <span className="text-[1.4rem] text-text-secondary font-[700]">
          URLs
        </span>
      </div>

      {pages.map((page, index) => (
        <InactivePageItem
          key={page.url}
          page={page}
          isSelected={selectedUrls.has(page.url)}
          onSelect={() => onPageSelectionToggle(page.url)}
          isLast={index === pages.length - 1}
        />
      ))}
    </div>
  );
}
