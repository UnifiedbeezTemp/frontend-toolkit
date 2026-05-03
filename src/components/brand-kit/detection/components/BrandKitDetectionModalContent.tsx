"use client";

import { AnimatePresence } from "framer-motion";
import CloseModalButton from "../../../modal/CloseModalButton";
import ModalHeader from "../../../modal/ModalHeader";
import Button from "../../../ui/Button";
import DetectionReveal from "./DetectionReveal";
import DetectionSectionRenderer from "./DetectionSectionRenderer";
import { useBrandKitDetectionSections } from "../hooks/useBrandKitDetectionSections";
import { useBrandKitDetectionViewModel } from "../hooks/useBrandKitDetectionViewModel";
import { useSequentialReveal } from "../hooks/useSequentialReveal";
import type { BrandKitDetectionModalContentProps } from "../types";

export default function BrandKitDetectionModalContent({
  isOpen,
  onDone,
  data,
}: BrandKitDetectionModalContentProps) {
  const viewModel = useBrandKitDetectionViewModel(data);
  const sections = useBrandKitDetectionSections(viewModel);
  const visibleCount = useSequentialReveal(isOpen, sections.length, {
    initialDelayMs: 320,
    stepDelayMs: 620,
  });

  return (
    <div className="flex flex-col min-h-full grad-btn ">
      <ModalHeader
        text="Brand kit imported"
        description="We found brand elements and applied them to your customization."
        className="p-[2rem] sm:p-[2.4rem] pb-[1.6rem] border-b border-border"
        action={<CloseModalButton onClick={onDone} />}
      />

      <div className="px-[1.4rem] sm:px-[2.4rem] pb-[2rem] sm:pb-[2.4rem] pt-[1.6rem] sm:pt-[2.4rem] grid grid-cols-1 xl:grid-cols-4 gap-[1.4rem] xl:gap-[1rem]">
        <AnimatePresence initial={false}>
          {sections.slice(0, visibleCount).map((section) => (
            <DetectionReveal key={section.id}>
              <DetectionSectionRenderer section={section} />
            </DetectionReveal>
          ))}
        </AnimatePresence>
      </div>

      <div className="sticky bottom-0 bg-primary border-t border-border px-[1.4rem] sm:px-[2.4rem] py-[1.4rem] sm:py-[1.8rem]">
        <Button
          onClick={onDone}
          className="w-full h-[4.8rem] sm:h-[5.2rem] rounded-[1.2rem] grad-btn border-0 shadow-xl"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
