"use client";

import ImageComponent from "../ui/ImageComponent";
import Text from "../ui/Text";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  const icons = useSupabaseIcons();

  return (
    <button
      onClick={onClick}
      className="bg-primary w-fit px-[1rem] py-[0.6rem] rounded-[0.6rem] flex items-center gap-[0.8rem] mb-[2rem] hover:opacity-90 transition-opacity border border-input-stroke shadow-sm"
    >
      <ImageComponent
        src={icons.arrowLeft1}
        alt="back"
        width={25}
        height={25}
        className=""
      />
      <Text className="text-[1.4rem] font-bold text-text-primary">Go back</Text>
    </button>
  );
}
