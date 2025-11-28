import { WebsitePage } from "../utils/types";
import DotsMenu from "../DotsMenu";
import Checkbox from "../../../ui/CheckBox";

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
        <Checkbox
          checked={isAllSelected}
          onChange={onToggleAll}
        />
        <span className="text-[1.4rem] text-text-secondary font-[700]">URLs</span>
      </div>

      {pages.map((page, index) => (
        <div
          key={page.url}
          className={`flex items-center justify-between px-[0.8rem] py-[1.2rem] ${
            index < pages.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div className="flex items-center gap-[1rem]">
            <Checkbox
              checked={selectedUrls.has(page.url)}
              onChange={() => onPageSelectionToggle(page.url)}
            />
            <p className="text-text-primary text-[1.4rem]">{page.url}</p>
          </div>
          <DotsMenu />
        </div>
      ))}
    </div>
  );
}