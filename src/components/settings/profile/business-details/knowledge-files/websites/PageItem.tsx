import DotsMenu from "./DotsMenu";
import ToggleSwitch from "./ToggleSwitch";
import { WebsitePage } from "./utils/types";

interface PageItemProps {
  page: WebsitePage;
  websiteIndex: number;
  isActive: boolean;
  onToggleStatus?: (websiteIndex: number, pageUrl: string) => void;
  showBorder: boolean;
  isEditing?: boolean;
}

export default function PageItem({
  page,
  websiteIndex,
  isActive,
  onToggleStatus,
  showBorder,
  isEditing = false,
}: PageItemProps) {
  return (
    <div className={`border-border border p-[0.8rem] rounded-[0.8rem] flex items-center justify-between ${showBorder ? 'mb-2' : ''}`}>
      <div className="text-text-primary text-[1rem] w-[50%] flex items-center justify-between gap-[2rem]">
        <span>{page.url}</span>
        <span className="bg-input-filled flex text-center items-center justify-center  rounded-full border border-border py-[0.4rem] px-[0.8rem]">
          {page.characters} characters
        </span>
        <span>Updated: {page.updatedAt}</span>
      </div>

    {!isEditing && <div className="flex items-center gap-[2.4rem]">
        <DotsMenu />
        <ToggleSwitch
          isActive={isActive}
          onToggle={() => onToggleStatus?.(websiteIndex, page.url)}
        />
      </div>}
    </div>
  );
}