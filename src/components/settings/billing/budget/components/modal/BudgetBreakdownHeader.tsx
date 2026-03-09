"use client";

import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import Heading from "../../../../../ui/Heading";
import ImageComponent from "../../../../../ui/ImageComponent";
import Text from "../../../../../ui/Text";

interface BudgetBreakdownHeaderProps {
  name: string;
  tag: string;
  description: string;
  onClose: () => void;
}

export default function BudgetBreakdownHeader({
  name,
  tag,
  description,
  onClose,
}: BudgetBreakdownHeaderProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="p-[1.6rem] lg:p-[2.4rem] sticky top-0 border-b border-border bg-primary">
      <div className="flex justify-between items-start lg:mb-[0.8rem]">
        <div className="flex items-center gap-[0.8rem]">
          <Heading className=" text-[1.8rem] lg:text-[2.4rem] font-bold text-text-secondary">
            {name}
          </Heading>
          <span className="px-[0.8rem] py-[0.2rem] border border-border rounded-full text-[.7] sm:text-[1rem] text-text-primary font-bold tracking-wider uppercase">
            {tag}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-[3.2rem] h-[3.2rem] flex items-center justify-center rounded-full hover:bg-input-filled transition-colors"
        >
          <ImageComponent
            src={icons.close}
            alt="close"
            width={20}
            height={20}
          />
        </button>
      </div>
      <Text className="text-[1.4rem] text-text-primary font-medium">
        {description}
      </Text>
    </div>
  );
}
