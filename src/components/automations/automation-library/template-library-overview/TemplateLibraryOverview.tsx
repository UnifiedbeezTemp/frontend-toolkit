import React, { useState } from "react";
import OverviewCard from "./OverviewCard";
import { getOverviewData } from "./utils/overviewData";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import MoreVerticalIcon from "../../../../assets/icons/MoreVerticalIcon";
import CategoryAutomationsModal from "./CategoryAutomationsModal";

export default function TemplateLibraryOverview() {
  const icons = useSupabaseIcons();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const overviewData = getOverviewData({
    featuredIcon1: icons.featuredIcon1,
    featuredIcon2: icons.featuredIcon2,
    featuredIcon3: icons.featuredIcon3,
    featuredIcon4: icons.featuredIcon4,
  });

  const handleOpenModal = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="flex flex-col w-full mt-[2rem]">
      <div className="flex items-center justify-between border rounded-t-[1rem] bg-primary border-input-stroke p-[1.6rem]">
        <h2 className="text-[2.2rem] font-bold text-text-primary">
          Template Library Overview
        </h2>
        {/* <button className="p-[0.8rem] rounded-[1rem] border border-input-stroke hover:bg-input-stroke transition-colors">
          <MoreVerticalIcon size={24} className="text-text-secondary" />
        </button> */}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 border border-r-0 border-t-0 border-input-stroke rounded-b-[1rem] bg-primary">
        {overviewData.map((data, index) => (
          <OverviewCard key={index} {...data} onOpenModal={handleOpenModal} />
        ))}
      </div>

      <CategoryAutomationsModal
        isOpen={!!selectedCategory}
        onClose={handleCloseModal}
        category={selectedCategory || ""}
      />
    </div>
  );
}
