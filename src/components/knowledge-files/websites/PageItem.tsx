import ToggleSwitch from "../../ui/ToggleSwitch";
import { WebsitePage } from "./utils/types";
import PageDropdown from "./components/PageDropdown";

interface PageItemProps {
  page: WebsitePage;
  websiteIndex: number;
  isActive: boolean;
  onToggleStatus?: (websiteIndex: number, pageUrl: string) => void;
  showBorder: boolean;
  isEditing?: boolean;
  forceMobileStyle?: boolean;
}

export default function PageItem({
  page,
  websiteIndex,
  isActive,
  onToggleStatus,
  showBorder,
  isEditing = false,
  forceMobileStyle = false,
}: PageItemProps) {
  return (
    <div
      className={`border-border border lg:border p-[0.8rem] rounded-[0.8rem] ${forceMobileStyle ? "" : "sm:flex items-center justify-between"} mb-[1rem] sm:mb-[2rem] lg:mb-[1rem] ${
        showBorder ? "" : ""
      }`}
    >
      <div
        className={
          forceMobileStyle
            ? "text-text-primary text-[1rem]"
            : "sm:hidden text-text-primary text-[1rem]"
        }
      >
        <div className="mb-[0.8rem] flex justify-between items-center">
          <span className="text-[1rem] block">{page.url}</span>
          <span className="text-[1rem]">Updated: {page.updatedAt}</span>
        </div>
        <span className="bg-input-filled text-center items-center justify-center rounded-full border border-border py-[0.4rem] px-[0.8rem] text-[0.9rem]">
          {page.characters} characters
        </span>
      </div>

      {!forceMobileStyle && (
        <div className="hidden sm:grid text-text-primary text-[1rem] sm:w-[75%] lg:w-[70%] gap-[1rem] grid-cols-3 items-center justify-between sm:gap-[2rem]">
          <span className="text-[1rem] block">{page.url}</span>
          <span className="inline-block w-fit ml-[-2rem] bg-input-filled flex text-center items-center justify-center rounded-full border border-border py-[0.4rem] px-[0.8rem]">
            {page.characters} characters
          </span>
          <span className="text-[1rem] block">Updated: {page.updatedAt}</span>
        </div>
      )}

      {!isEditing && (
        <div
          className={`flex items-center gap-[2.4rem] justify-end ${forceMobileStyle ? "mt-[2rem]" : "mt-[2rem] sm:mt-0"}`}
        >
          <PageDropdown page={page} />
          <ToggleSwitch
            isActive={isActive}
            onToggle={() => onToggleStatus?.(websiteIndex, page.url)}
          />
        </div>
      )}
    </div>
  );
}
