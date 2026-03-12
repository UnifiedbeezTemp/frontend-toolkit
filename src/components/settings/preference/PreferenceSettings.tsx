"use client";

import SettingsSectionHeader from "../SettingsSectionHeader";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import AutoSaveToggle from "./AutoSaveToggle";
import { usePreferenceSettings } from "./hooks/usePreferenceSettings";
import Heading from "../../ui/Heading";

export default function PreferenceSettings() {
  const {
    currentTheme,
    currentLanguage,
    currentAutoSave,
    handleThemeChange,
    handleLanguageChange,
    handleAutoSaveChange,
  } = usePreferenceSettings();

  return (
    <div className="mt-[1.5rem] px-[1.6rem] lg:px-0">
      <SettingsSectionHeader hideEdit title="Preference" />

      <div className="mt-[1.6rem]">
        <p className="font-[700] text-text-secondary text-[1.4rem] sm:text-[1.6rem]">
          Select mode
        </p>
        <ThemeToggle
          currentTheme={currentTheme as "light" | "dark" | "system"}
          onThemeChange={handleThemeChange}
        />
      </div>

      <div className="py-[1.6rem] border-b border-inactive-color">
        <Heading size="sm">Language</Heading>
        <LanguageSelector
          selectedLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      <AutoSaveToggle
        autoSave={currentAutoSave}
        onAutoSaveChange={handleAutoSaveChange}
      />
    </div>
  );
}
