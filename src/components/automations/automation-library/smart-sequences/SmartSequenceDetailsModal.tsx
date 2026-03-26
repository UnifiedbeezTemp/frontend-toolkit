"use client";

import React from "react";
import Image from "next/image";
import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import CloseModalButton from "../../../modal/CloseModalButton";
import Button from "../../../ui/Button";
import { SmartSequence } from "./types";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

interface SmartSequenceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sequence: SmartSequence | null;
  onUseSequence: () => void;
}

export default function SmartSequenceDetailsModal({
  isOpen,
  onClose,
  sequence,
  onUseSequence,
}: SmartSequenceDetailsModalProps) {
  const icons = useSupabaseIcons();

  if (!sequence) return null;

  const sequenceIcon =
    icons[sequence.iconKey as keyof typeof icons] || icons.featuredIcon1;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      bottomSheet
      className="max-h-[90dvh] sm:max-h-[85dvh] rounded-ss-[2rem] rounded-se-[2rem] sm:rounded-[1.6rem] sm:max-w-[50rem] p-[2.4rem]"
    >
      <div className="flex flex-col">
        <ModalHeader
          text="Sequence details"
          description="More information about this sequence"
          action={<CloseModalButton onClick={onClose} />}
          borderB
          className="pb-[2.4rem]"
        />

        <div className="flex flex-col gap-[1.6rem] pt-[2.4rem]">
          <span className="self-start px-[1.2rem] py-[0.4rem] rounded-full border border-input-stroke text-[1.1rem] font-semibold text-[var(--dark-base-40)] tracking-wide">
            {sequence.industry}
          </span>

          <h2 className="text-[1.8rem] font-bold text-[var(--text-primary)]">
            {sequence.title}
          </h2>

          <p className="text-[1.4rem] text-[var(--dark-base-70)]">
            {sequence.description}
          </p>
        </div>

        <div className="flex items-center justify-end gap-[1.2rem] pt-[3rem]">
          <Button
            onClick={onClose}
            className="w-fit px-[2rem]"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={onUseSequence}
            className="w-fit grad-btn  px-[2rem]"
          >
            Use Sequences
          </Button>
        </div>
      </div>
    </Modal>
  );
}
