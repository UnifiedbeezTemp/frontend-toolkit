"use client";

import { createContext, useContext } from "react";
import { BrandKitContextType } from "../types/brandKitTypes";

export const BrandKitContext = createContext<BrandKitContextType | undefined>(
  undefined,
);

export function useBrandKit() {
  const context = useContext(BrandKitContext);
  if (context === undefined) {
    throw new Error("useBrandKit must be used within a BrandKitProvider");
  }
  return context;
}
