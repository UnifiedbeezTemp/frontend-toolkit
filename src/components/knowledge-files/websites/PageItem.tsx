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
        <div className="mb-[0.8rem] flex justify-between gap-[.5rem] items-center">
          <span className="text-[1rem] block truncate">
            {page.url} {page.url} {page.url}
          </span>
          <span className="bg-input-filled text-center items-center justify-center rounded-full border border-border py-[0.4rem] px-[0.8rem] text-[0.9rem] whitespace-nowrap">
            {page.characters} characters
          </span>
        </div>
      </div>

      {!forceMobileStyle && (
        <div className="hidden sm:grid text-text-primary text-[1rem] sm:w-[75%] lg:w-[70%] gap-[1rem] grid-cols-5 items-center justify-between sm:gap-[2rem]">
          <span className="text-[1rem] block col-span-2 whitespace-nowrap truncate">
            {page.url}
          </span>
          <span className="inline-block w-fit ml-[-2rem] bg-input-filled flex text-center items-center justify-center rounded-full border border-border py-[0.4rem] px-[0.8rem]">
            {page.characters} characters
          </span>
          <span className="text-[1rem] block whitespace-nowrap truncate col-span-2">
            Updated: {page.updatedAt}
          </span>
        </div>
      )}

      {!isEditing && (
        <div
          className={`flex items-center sm:gap-[2.4rem] justify-between sm:justify-end ${forceMobileStyle ? "mt-[4rem]" : "mt-[4rem] sm:mt-0"}`}
        >
          <span className="text-[1rem] sm:hidden whitespace-nowrap truncate">
            Updated: {page.updatedAt}
          </span>

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
