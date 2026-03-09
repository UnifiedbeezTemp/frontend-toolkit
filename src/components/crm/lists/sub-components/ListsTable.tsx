"use client";

import { CRMList } from "../types";
import ListsTableRow from "./ListsTableRow";
import MobileListCard from "./MobileListCard";
import CheckBox from "../../../ui/CheckBox";
import { cn } from "../../../../lib/utils";
import ListsEmptyState from "./ListsEmptyState";
import { TABLE_HEADERS } from "../constants";

interface ListsTableProps {
  lists: CRMList[];
  selectedLists: string[];
  toggleListSelection: (id: string) => void;
  toggleAllSelection: () => void;
  isLoading: boolean;
  onViewDetails: (list: CRMList) => void;
}

export default function ListsTable({
  lists,
  selectedLists,
  toggleListSelection,
  toggleAllSelection,
  isLoading,
  onViewDetails,
}: ListsTableProps) {
  const allSelected = lists.length > 0 && selectedLists.length === lists.length;

  if (isLoading) {
    return (
      <div className="p-[4rem] text-center">
        <p className="text-[1.4rem] text-muted animate-pulse">
          Loading lists...
        </p>
      </div>
    );
  }

  if (lists.length === 0) {
    return (
      <ListsEmptyState message="No lists found. Try adjusting your filters or create a new list." />
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
              {TABLE_HEADERS.map((header, index) => (
                <th
                  key={index}
                  className={cn(
                    "p-[1.6rem] text-[1.2rem] font-bold text-dark-base-70 whitespace-nowrap",
                    index < TABLE_HEADERS.length - 1 &&
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
            {lists.map((list) => (
              <ListsTableRow
                key={list.id}
                list={list}
                isSelected={selectedLists.includes(list.id)}
                onToggle={() => toggleListSelection(list.id)}
                onViewDetails={() => onViewDetails(list)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="flex flex-col gap-[1rem] p-[1rem] sm:hidden">
        {lists.map((list) => (
          <MobileListCard
            key={list.id}
            list={list}
            isSelected={selectedLists.includes(list.id)}
            onToggle={() => toggleListSelection(list.id)}
            onViewDetails={() => onViewDetails(list)}
          />
        ))}
      </div>
    </>
  );
}
