import { WebsitePage } from "../utils/types";
import PageDropdown from "../components/PageDropdown";
import Checkbox from "../../../ui/CheckBox";

interface InactivePageItemProps {
  page: WebsitePage;
  isSelected: boolean;
  onSelect: () => void;
  isLast: boolean;
}

export default function InactivePageItem({
  page,
  isSelected,
  onSelect,
  isLast,
}: InactivePageItemProps) {
  return (
    <div
      className={`flex items-center justify-between px-[0.8rem] py-[1.2rem] ${
        !isLast ? "border-b border-border" : ""
      }`}
    >
      <div className="flex items-center gap-[1rem]">
        <Checkbox checked={isSelected} onChange={onSelect} />
        <p className="text-text-primary text-[1.4rem]">{page.url}</p>
      </div>
      <PageDropdown page={page} />
    </div>
  );
}
