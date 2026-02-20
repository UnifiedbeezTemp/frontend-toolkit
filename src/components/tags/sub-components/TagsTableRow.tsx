import React from "react";
import { Tag } from "../../../store/slices/tagSlice";
import Checkbox from "../../ui/CheckBox";
import { TagPill } from "../../inbox/components/TagPill";
import { cn } from "../../../lib/utils";
import { useTagsTable } from "../hooks/useTagsTable";
import { CATEGORY_MAP } from "../utils/tagConstants";

interface TagsTableRowProps {
  tag: Tag;
}

export default function TagsTableRow({ tag }: TagsTableRowProps) {
  const { selectedTags, toggleTagSelection } = useTagsTable();
  const isSelected = selectedTags.includes(tag.id);

  const categoryInfo = CATEGORY_MAP[tag.category];

  return (
    <tr
      className={cn(
        "border-b border-input-stroke hover:bg-input-filled/50 transition-colors",
        isSelected && "bg-brand-primary/5",
      )}
    >
      <td className="py-4 px-4 w-10">
        <Checkbox
          checked={isSelected}
          onChange={() => toggleTagSelection(tag.id)}
          size="sm"
        />
      </td>
      <td className="py-4 px-4 border-r border-input-stroke">
        <TagPill
          label={tag.label}
          showIcon={true}
          tagIconSize={20}
          className="rounded-[0.4rem] text-[1.4rem]"
        />
      </td>
      <td className="py-4 px-4 border-r border-input-stroke">
        <div className="flex items-center gap-2 text-text-primary">
          <span className="text-[1.6rem]">{categoryInfo.emoji}</span>
          <span className="text-[1.4rem]">{categoryInfo.label}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-[1.4rem] text-text-primary font-mono bg-input-filled/20">
        {tag.autoFillTag}
      </td>
    </tr>
  );
}
