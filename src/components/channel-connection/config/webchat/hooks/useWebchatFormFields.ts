import { useState, useRef } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useWebchatMode } from "./useWebchatMode";
import { ApiWebsite } from "../../../../../types/websiteTypes";
import { WebchatFormData } from "./useWebchatConfig";

interface UseWebchatFormFieldsProps {
  watch: UseFormWatch<WebchatFormData>;
  setValue: UseFormSetValue<WebchatFormData>;
  websites: ApiWebsite[];
  variant?: "desktop" | "mobile";
}

export function useWebchatFormFields({
  watch,
  setValue,
  websites,
  variant = "desktop",
}: UseWebchatFormFieldsProps) {
  const isMobile = variant === "mobile";

  const labelSize = isMobile ? "text-[1.4rem]" : "text-[1.6rem]";
  const inputSize = isMobile
    ? "text-[1.4rem] placeholder:text-[1.4rem]"
    : "text-[1.6rem] placeholder:text-[1.6rem]";

  const currentUrl = watch("websiteUrl");
  const { mode, setMode } = useWebchatMode(websites, currentUrl);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleWebsiteSelect = (url: string) => {
    if (setValue) {
      setValue("websiteUrl", url, { shouldDirty: true });
    }
    setIsDropdownOpen(false);
  };

  const selectedWebsite = websites.find((w) => w.baseUrl === currentUrl);
  const displayValue =
    selectedWebsite?.displayName ||
    selectedWebsite?.baseUrl ||
    "Select a website";

  return {
    isMobile,
    labelSize,
    inputSize,
    mode,
    setMode,
    isDropdownOpen,
    setIsDropdownOpen,
    triggerRef,
    handleWebsiteSelect,
    selectedWebsite,
    displayValue,
    currentUrl,
  };
}
