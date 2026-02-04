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
      className="max-w-[144rem] rounded-[2.5rem] mx-auto overflow-hidden"
    >
      <div className="max-w-[138rem] mx-auto">
        <ComparisonTable onSelectPlan={onSelectPlan} />
      </div>
    </Modal>
  );
}
