"use client";

import Modal from "../../modal/Modal";
import BrandKitDetectionModalContent from "./components/BrandKitDetectionModalContent";
import type { BrandKitDetectionModalProps } from "./types";

export default function BrandKitDetectionModal({
  isOpen,
  onClose,
  data,
}: BrandKitDetectionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xxl"
      isBlur
      className="bg-primary"
    >
      <BrandKitDetectionModalContent
        isOpen={isOpen}
        onDone={onClose}
        data={data}
      />
    </Modal>
  );
}
