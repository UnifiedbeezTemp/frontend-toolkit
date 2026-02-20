import React from "react";
import TagsTableRow from "./TagsTableRow";
import Checkbox from "../../ui/CheckBox";
import { useTagsTable } from "../hooks/useTagsTable";
import PaginationV2 from "../../ui/PaginationV2";

export default function TagsTable() {
  const {
    currentTags,
    filteredTags,
    currentPage,
    totalPages,
    handlePageChange,
    isAllSelected,
    handleSelectAll,
  } = useTagsTable(10);

  if (filteredTags.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <p className="text-[1.8rem] font-bold text-text-primary mb-2">
          No tags found
        </p>
        <p className="text-[1.4rem] text-text-primary">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[60rem]">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-input-stroke bg-input-filled">
              <th className="py-4 px-4 w-10">
                <Checkbox
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  size="sm"
                />
              </th>
              <th className="py-4 px-4 text-[1.2rem] font-bold text-text-primary uppercase border-input-stroke">
                Tag Name
              </th>
              <th className="py-4 px-4 text-[1.2rem] font-bold text-text-primary uppercase border-input-stroke">
                Type
              </th>
              <th className="py-4 px-4 text-[1.2rem] font-bold text-text-primary uppercase">
                Auto-Fill Tag
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTags.map((tag) => (
              <TagsTableRow key={tag.id} tag={tag} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-[1.6rem] sm:p-[2.4rem]">
        <PaginationV2
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
