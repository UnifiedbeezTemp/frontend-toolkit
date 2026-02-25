"use client";
import { useState } from "react";

export default function ChannelTabs() {
  const [activeTab, setActiveTab] = useState("Channels");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    scrollToSection(tab);
  };

  return (
    <div className="border border-border rounded-[15px] p-[0.8rem] bg-primary mx-auto flex gap-[1.6rem] items-center justify-between mt-[5rem] lg:mt-[2rem]">
      {["Channels", "Automations", "Campaigns"].map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`rounded-[1rem] sm:px-4 py-[0.8rem] text-sm font-bold transition-all text-[1.4rem] duration-300 w-full ${
            tab === activeTab
              ? "bg-primary text-text-primary border-border border"
              : "text-muted hover:bg-primary/80 hover:text-text-primary"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
