import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Language, languages } from "../../../../data/languages";
import { useTheme } from "../../../../providers";

export function usePreferenceSettings() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    languages[0],
  );
  const [currentAutoSave, setCurrentAutoSave] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language") || "en";
    const language =
      languages.find((lang) => lang.code === savedLang) || languages[0];
    const autoSave = localStorage.getItem("auto-save") === "true";

    setCurrentLanguage(language);
    setCurrentAutoSave(autoSave);
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  const handleLanguageChange = async (language: Language) => {
    setCurrentLanguage(language);
    if (i18n && typeof i18n.changeLanguage === "function") {
      await i18n.changeLanguage(language.code);
    }
    localStorage.setItem("preferred-language", language.code);
    document.documentElement.lang = language.code;
  };

  const handleAutoSaveChange = (autoSave: boolean) => {
    setCurrentAutoSave(autoSave);
    localStorage.setItem("auto-save", autoSave.toString());
  };

  return {
    currentTheme: theme,
    currentLanguage,
    currentAutoSave,
    handleThemeChange,
    handleLanguageChange,
    handleAutoSaveChange,
  };
}
