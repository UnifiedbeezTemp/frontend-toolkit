"use client";

import ImageComponent from "../ui/ImageComponent";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";

interface ChatHeaderProps {
  assistantName?: string;
  onRefresh: () => void;
}

export default function ChatHeader({
  assistantName,
  onRefresh,
}: ChatHeaderProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="bg-[linear-gradient(267deg,var(--brand-primary)_-12.17%,var(--brand-secondary)_125.17%)] px-[3.2rem] py-[1.6rem] flex items-center justify-between w-full rounded-ss-[1.4rem] rounded-se-[1.4rem]">
      <p className="text-white font-[700] text-[2rem]">{assistantName || <>Beezora</>} Live Test</p>

      <button
        onClick={onRefresh}
        className="p-[0.8rem] rounded-[0.8rem] bg-white text-[1.4rem] text-brand-primary flex items-center gap-[0.8rem] hover:scale-90 transition-all"
      >
        <ImageComponent
          src={icons.refreshGreen}
          alt="Refresh"
          width={20}
          height={20}
        />
        Refresh
      </button>
    </div>
  );
}
