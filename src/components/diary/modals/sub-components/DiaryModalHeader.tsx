"use client";

import React, { useRef, useState } from "react";
import CalendarIcon2 from "../../../../assets/icons/CalendarIcon2";
import MoodSelectorDropdown from "../../sub-components/MoodSelectorDropdown";
import Heading from "../../../ui/Heading";
import ClockIcon from "../../../../assets/icons/ClockIcon";

interface DiaryModalHeaderProps {
  name: string;
  date: string;
  time: string;
  mood: string;
  onMoodSelect: (mood: string) => void;
}

export default function DiaryModalHeader({
  name,
  date,
  time,
  mood,
  onMoodSelect,
}: DiaryModalHeaderProps) {
  const [isMoodOpen, setIsMoodOpen] = useState(false);
  const moodRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <div className="flex items-center gap-[1.2rem]">
        <CalendarIcon2 size={24} color="var(--brand-primary)" />
        <Heading size="lg" className="leading-tight">
          {name}
        </Heading>
      </div>

      <div className="flex items-center gap-[1.6rem]">
        <div className="flex items-center gap-[0.6rem] text-text-primary/60">
          <CalendarIcon2 size={16} color="var(--text-primary-2)" />
          <span className="text-[1.4rem]">{date}</span>
        </div>
        <div className="flex items-center gap-[0.6rem] text-text-primary/60">
          <ClockIcon size={16} color="var(--text-primary-2)" />
          <span className="text-[1.4rem]">{time}</span>
        </div>
        <button
          ref={moodRef}
          onClick={() => setIsMoodOpen(true)}
          className="px-[1rem] py-[0.4rem] rounded-[1rem] border border-input-stroke text-[1.2rem] text-text-secondary cursor-pointer hover:bg-input-stroke transition-colors font-[700]"
        >
          {mood}
        </button>
      </div>

      <MoodSelectorDropdown
        isOpen={isMoodOpen}
        onClose={() => setIsMoodOpen(false)}
        triggerRef={moodRef}
        selectedMood={mood}
        onSelectMood={(m) => {
          onMoodSelect(m);
          setIsMoodOpen(false);
        }}
      />
    </div>
  );
}
