"use client";

import { useState, useRef } from "react";

export function useCompanyLogo() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const removeLogo = () => {
    setLogo(null);
  };

  return {
    logo,
    fileInputRef,
    handleLogoUpload,
    triggerUpload,
    removeLogo,
    setLogo,
  };
}
