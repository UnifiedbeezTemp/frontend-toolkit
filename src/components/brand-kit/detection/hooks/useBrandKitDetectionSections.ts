import { useMemo } from "react";
import type {
  BrandKitDetectionSection,
  BrandKitDetectionViewModel,
} from "../types";

export const useBrandKitDetectionSections = (
  viewModel: BrandKitDetectionViewModel,
): BrandKitDetectionSection[] => {
  return useMemo(() => {
    const sections: BrandKitDetectionSection[] = [];

    if (viewModel.logoUrl) {
      sections.push({ id: "logo", logoUrl: viewModel.logoUrl });
    }

    if (viewModel.fonts.length > 0) {
      sections.push({ id: "fonts", fonts: viewModel.fonts });
    }

    if (viewModel.colors.length > 0) {
      sections.push({ id: "colors", colors: viewModel.colors });
    }

    if (viewModel.socials.length > 0) {
      sections.push({ id: "socials", socials: viewModel.socials });
    }

    if (sections.length === 0) {
      sections.push({ id: "empty" });
    }

    return sections;
  }, [viewModel.colors, viewModel.fonts, viewModel.logoUrl, viewModel.socials]);
};

