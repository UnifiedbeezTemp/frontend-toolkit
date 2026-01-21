"use client";

import React from "react";
import Modal from "../modal/Modal";
import ComparisonTable from "./ComparisonTable";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Heading from "../ui/Heading";

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan?: (planId: string) => void;
}

export default function ComparisonModal({
  isOpen,
  onClose,
  onSelectPlan,
}: ComparisonModalProps) {
  const icons = useSupabaseIcons();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="fullscreen"
      className="h-[96dvh] rounded-[2.5rem] flex lg:block items-center justify-center"
    >
      <div className="">
        <div className="max-w-[138rem] mx-auto my-auto">
          <ComparisonTable onSelectPlan={onSelectPlan} />
        </div>
      </div>
    </Modal>
  );
}
