import React from "react";
import TagsCategoryTabs from "./sub-components/TagsCategoryTabs";
import TagsTableHeader from "./sub-components/TagsTableHeader";
import TagsTable from "./sub-components/TagsTable";
import { useTags } from "./hooks/useTags";
import Button from "../ui/Button";

interface TagsProps {
  onClose?: () => void;
}

export default function Tags({ onClose }: TagsProps) {
  useTags();

  return (
    <div className="flex flex-col h-full bg-primary overflow-hidden  px-[1.4rem] sm:px-[2.4rem]">
      <div className="flex flex-col bg-primary">
        <div className="pt-[1rem]">
          <TagsCategoryTabs />
        </div>
      </div>

      <div className="flex-1 border border-input-stroke mt-[1.6rem] rounded-[1.6rem]">
        <TagsTableHeader />
        <TagsTable />
      </div>
    </div>
  );
}
