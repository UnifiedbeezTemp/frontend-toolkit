import { CRMTag } from "../types";
import { TagPill } from "../../../inbox/components/TagPill";
import Button from "../../../ui/Button";
import CheckBox from "../../../ui/CheckBox";
import { getCategoryLabel } from "../utils";

interface TagsTableRowProps {
  tag: CRMTag;
  isSelected: boolean;
  onToggle: () => void;
  onViewDetails: () => void;
}

export default function TagsTableRow({
  tag,
  isSelected,
  onToggle,
  onViewDetails,
}: TagsTableRowProps) {
  return (
    <tr className="group hover:bg-input-filled transition-colors">
      <td className="p-[1.6rem]">
        <CheckBox
          checked={isSelected}
          onChange={onToggle}
          className="w-[1.8rem] h-[1.8rem] rounded-[0.4rem]"
        />
      </td>
      <td className="p-[1.6rem] border-r border-border">
        <TagPill label={tag.label} className="rounded-[.8rem] p-[.8rem] text-[1.4rem]" />
      </td>
      <td className="p-[1.6rem] border-r border-border">
        <span className="text-[1.4rem] text-dark-base-70 font-medium">
          {getCategoryLabel(tag.category)}
        </span>
      </td>
      <td className="p-[1.6rem] border-r border-border">
        <span className="text-[1.4rem] text-dark-base-70 font-medium">
          {tag.autoFillTag}
        </span>
      </td>
      <td className="p-[1.6rem]">
        <Button
          variant="secondary"
          className="h-[3.6rem] px-[1.2rem] text-[1.2rem] font-semibold border-border text-dark-base-70 hover:bg-accent rounded-[0.8rem] whitespace-nowrap"
          onClick={onViewDetails}
        >
          View details
        </Button>
      </td>
    </tr>
  );
}
