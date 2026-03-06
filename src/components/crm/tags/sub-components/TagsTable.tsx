"use client";

import { CRMTag } from "../types";
import TagsTableRow from "./TagsTableRow";
import MobileTagCard from "./MobileTagCard";
import CheckBox from "../../../ui/CheckBox";
import { cn } from "../../../../lib/utils";
import TagsEmptyState from "./TagsEmptyState";
import { TAG_TABLE_HEADERS } from "../constants";

interface TagsTableProps {
  tags: CRMTag[];
  selectedTags: string[];
  toggleTagSelection: (id: string) => void;
  toggleAllSelection: () => void;
  isLoading: boolean;
  onViewDetails: (tag: CRMTag) => void;
}

export default function TagsTable({
  tags,
  selectedTags,
  toggleTagSelection,
  toggleAllSelection,
  isLoading,
  onViewDetails,
}: TagsTableProps) {
  const allSelected = tags.length > 0 && selectedTags.length === tags.length;

  if (isLoading) {
    return (
      <div className="p-[4rem] text-center">
        <p className="text-[1.4rem] text-muted animate-pulse">
          Loading tags...
        </p>
      </div>
    );
  }

  if (tags.length === 0) {
    return (
      <TagsEmptyState message="No tags found. Try adjusting your filters or add a new tag." />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="w-full overflow-x-auto custom-scrollbar hidden sm:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-input-filled">
              <th className="p-[1.6rem] w-[4.8rem]">
                <CheckBox
                  checked={allSelected}
                  onChange={toggleAllSelection}
                  className="w-[1.8rem] h-[1.8rem] rounded-[0.4rem]"
                />
              </th>
              {TAG_TABLE_HEADERS.map((header, index) => (
                <th
                  key={index}
                  className={cn(
                    "p-[1.6rem] text-[1.2rem] font-bold text-dark-base-70 whitespace-nowrap",
                    index < TAG_TABLE_HEADERS.length - 1 &&
                      "border-r border-border",
                    header.className,
                  )}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tags.map((tag) => (
              <TagsTableRow
                key={tag.id}
                tag={tag}
                isSelected={selectedTags.includes(tag.id)}
                onToggle={() => toggleTagSelection(tag.id)}
                onViewDetails={() => onViewDetails(tag)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="flex flex-col gap-[1rem] p-[1rem] sm:hidden">
        {tags.map((tag) => (
          <MobileTagCard
            key={tag.id}
            tag={tag}
            isSelected={selectedTags.includes(tag.id)}
            onToggle={() => toggleTagSelection(tag.id)}
            onViewDetails={() => onViewDetails(tag)}
          />
        ))}
      </div>
    </>
  );
}
