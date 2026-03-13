"use client";

import React from "react";
import ImageComponent from "../../../../../ui/ImageComponent";
import Modal from "../../../../../modal/Modal";
import CloseModalButton from "../../../../../modal/CloseModalButton";
import Text from "../../../../../ui/Text";
import {
  useSupabaseIcons,
  useSupabaseImages,
} from "../../../../../../lib/supabase/useSupabase";

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
}

export default function DocumentPreviewModal({
  isOpen,
  onClose,
  documentTitle,
}: DocumentPreviewModalProps) {
  const images = useSupabaseImages();
  const icons = useSupabaseIcons() as Record<string, string>;

  const previewImageSrc = images.img1;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      bottomSheet={true}
      className="max-w-[90rem] !rounded-[1rem] p-[1.6rem] sm:p-[2.4rem] bg-primary shadow-2xl"
    >
      <div className="flex flex-col gap-[2.4rem]">
        <div className="flex items-center justify-between w-full border-b border-input-stroke pb-[1.2rem]">
          <button className="flex items-center gap-[0.8rem] text-dark-base-40 hover:text-dark-base-100 transition-colors">
            <ImageComponent
              src={icons.download}
              alt="Download"
              width={16}
              height={16}
              className="opacity-40"
            />
            <Text className="text-[1.4rem] font-bold uppercase tracking-tight">
              Download
            </Text>
          </button>
          <CloseModalButton onClick={onClose} />
        </div>

        <div className="w-full aspect-video rounded-[1rem] overflow-hidden bg-input-filled border border-input-stroke">
          <ImageComponent
            src={previewImageSrc}
            alt={documentTitle}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Modal>
  );
}
