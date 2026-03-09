"use client";

import React from "react";
import Modal from "../../modal/Modal";
import CloseModalButton from "../../modal/CloseModalButton";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import { useAvailableAddonsByPlan } from "../hooks/useAvailableAddonsByPlan";
import { usePlanBadgeConfig } from "../hooks/usePlanBadgeConfig";
import { PreviewAddonItem } from "./PreviewAddonItem";
import { AddonSkeletonList } from "./AddonSkeletonList";
import { AddonErrorState } from "./AddonErrorState";
import { AddonEmptyState } from "./AddonEmptyState";

interface AvailableAddonsPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: string | null;
}

export const AvailableAddonsPreviewModal: React.FC<
  AvailableAddonsPreviewModalProps
> = ({ isOpen, onClose, planType }) => {
  const { addons, loading, hasError, refetch } = useAvailableAddonsByPlan(
    isOpen ? planType : null,
  );
  const { badge, title } = usePlanBadgeConfig(planType);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="px-[1.6rem] sm:px-[2.5rem] py-[2.4rem] rounded-t-[2.6rem] sm:rounded-[1.6rem] sm:w-[67.6rem]"
      bottomSheet
    >
      <div className="flex items-center justify-between mb-[2rem] sticky top-0 z-[11]">
        <div className="w-[4rem]"></div>
        <CloseModalButton onClick={onClose} className="" />
      </div>

      <div className="flex flex-col items-center mb-[3rem]">
        {badge}
        <Heading className="text-[2rem] sm:text-[2.4rem] mt-[1.6rem]">
          {title} Plan Add-ons
        </Heading>
        <Text className="mt-[0.6rem] text-center text-[1.4rem]">
          Choose an add-on to your selected plan, add only what you need, and
          scale as you grow.
        </Text>
      </div>

      <div className="mb-[2rem]">
        <Heading className="text-[1.8rem] mb-[1.6rem] sticky top-0 bg-primary z-[10]">
          Add-ons
        </Heading>

        {loading ? (
          <AddonSkeletonList />
        ) : hasError ? (
          <AddonErrorState onRetry={refetch} />
        ) : addons.length === 0 ? (
          <AddonEmptyState />
        ) : (
          <div className="flex flex-col gap-[1.6rem]">
            {addons.map((addon) => (
              <PreviewAddonItem key={addon.id} addon={addon} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
