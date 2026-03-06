"use client";

import Checkbox from "../../ui/CheckBox";

interface Props {
  currentTheme: "light" | "dark" | "system";
  onThemeChange: (theme: "light" | "dark" | "system") => void;
}

export default function ThemeToggle({ currentTheme, onThemeChange }: Props) {
  const handleLightThemeSelect = () => {
    onThemeChange("light");
  };

  const handleDarkThemeSelect = () => {
    onThemeChange("dark");
  };

  const handleAutoThemeSelect = () => {
    onThemeChange("system");
  };

  return (
    <div className="mt-[1.6rem] flex items-center gap-[1.5rem] sm:gap-[2rem] border-b border-border pb-[1.6rem] flex-wrap md:flex-nowrap">
      {/* Light Theme */}
      <div className="flex flex-col items-center justify-center gap-[0.5rem] flex-1 max-w-[20rem]">
        <button
          type="button"
          onClick={() => onThemeChange("light")}
          className={`px-[1.4rem] py-[1.4rem] rounded-[1rem] bg-primary border min-h-[6rem] sm:h-[8rem] w-full flex flex-col items-center gap-[1.5rem] sm:gap-[2rem] justify-center transition-all duration-300 !cursor-pointer hover:border-brand-primary/50 ${
            currentTheme === "light"
              ? "border-brand-primary shadow-lg"
              : "border-border"
          }`}
        >
          <div className="flex items-center gap-[1rem] w-full justify-center">
            <div className="w-[1rem] h-[1rem] rounded-full grad-btn shrink-0" />
            <div className="h-[0.8rem] sm:h-[1rem] w-[80%] rounded-full bg-input-filled"></div>
          </div>
          <div className="flex items-center gap-[1rem] w-full justify-center">
            <div className="w-[1rem] h-[1rem] rounded-full grad-btn shrink-0" />
            <div className="h-[0.8rem] sm:h-[1rem] w-[80%] rounded-full bg-input-filled"></div>
          </div>
        </button>

        <p className="text-[1.4rem] sm:text-[1.6rem] text-text-primary">
          Light
        </p>
        <Checkbox
          checked={currentTheme === "light"}
          onChange={handleLightThemeSelect}
        />
      </div>

      {/* Dark Theme */}
      <div className="flex flex-col items-center justify-center gap-[0.5rem] flex-1 max-w-[20rem]">
        <button
          type="button"
          onClick={() => onThemeChange("dark")}
          className={`px-[1.4rem] py-[1.4rem] rounded-[1rem] grad-btn border min-h-[6rem] sm:h-[8rem] w-full flex flex-col items-center gap-[1.5rem] sm:gap-[2rem] justify-center transition-all duration-300 !cursor-pointer hover:border-brand-primary/50 ${
            currentTheme === "dark"
              ? "border-brand-primary shadow-lg"
              : "border-border"
          }`}
        >
          <div className="flex items-center gap-[1rem] w-full justify-center">
            <div className="w-[1rem] h-[1rem] rounded-full bg-input-filled shrink-0" />
            <div className="h-[0.8rem] sm:h-[1rem] w-[80%] rounded-full bg-input-filled opacity-30"></div>
          </div>
          <div className="flex items-center gap-[1rem] w-full justify-center">
            <div className="w-[1rem] h-[1rem] rounded-full bg-input-filled shrink-0" />
            <div className="h-[0.8rem] sm:h-[1rem] w-[80%] rounded-full bg-input-filled opacity-30"></div>
          </div>
        </button>

        <p className="text-[1.4rem] sm:text-[1.6rem] text-text-primary">Dark</p>
        <Checkbox
          checked={currentTheme === "dark"}
          onChange={handleDarkThemeSelect}
        />
      </div>

      {/* Auto Theme (Requested Split Visual) */}
      <div className="flex flex-col items-center justify-center gap-[0.5rem] flex-1 max-w-[20rem]">
        <button
          type="button"
          onClick={() => onThemeChange("system")}
          className={`rounded-[1rem] border min-h-[6rem] sm:h-[8rem] w-full flex overflow-hidden transition-all duration-300 !cursor-pointer hover:border-brand-primary/50 ${
            currentTheme === "system"
              ? "border-brand-primary shadow-lg"
              : "border-border"
          }`}
        >
          {/* Left half - Light style */}
          <div className="bg-primary flex-1 flex flex-col items-center gap-[1.5rem] sm:gap-[2rem] justify-center p-[1rem]">
            <div className="flex items-center gap-[0.5rem] w-full justify-center">
              <div className="w-[0.8rem] h-[0.8rem] rounded-full grad-btn shrink-0" />
              <div className="h-[0.6rem] sm:h-[0.8rem] w-[70%] rounded-full bg-input-filled"></div>
            </div>
            <div className="flex items-center gap-[0.5rem] w-full justify-center">
              <div className="w-[0.8rem] h-[0.8rem] rounded-full grad-btn shrink-0" />
              <div className="h-[0.6rem] sm:h-[0.8rem] w-[70%] rounded-full bg-input-filled"></div>
            </div>
          </div>
          {/* Right half - Dark style */}
          <div className="grad-btn flex-1 flex flex-col items-center gap-[1.5rem] sm:gap-[2rem] justify-center p-[1rem]">
            <div className="flex items-center gap-[0.5rem] w-full justify-center">
              <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-input-filled shrink-0" />
              <div className="h-[0.6rem] sm:h-[0.8rem] w-[70%] rounded-full bg-input-filled opacity-30"></div>
            </div>
            <div className="flex items-center gap-[0.5rem] w-full justify-center">
              <div className="w-[0.8rem] h-[0.8rem] rounded-full bg-input-filled shrink-0" />
              <div className="h-[0.6rem] sm:h-[0.8rem] w-[70%] rounded-full bg-input-filled opacity-30"></div>
            </div>
          </div>
        </button>

        <p className="text-[1.4rem] sm:text-[1.6rem] text-text-primary">Auto</p>
        <Checkbox
          checked={currentTheme === "system"}
          onChange={handleAutoThemeSelect}
        />
      </div>
    </div>
  );
}
