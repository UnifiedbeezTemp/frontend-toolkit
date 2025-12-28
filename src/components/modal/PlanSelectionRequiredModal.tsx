"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import Modal from "./Modal";

interface PlanSelectionRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlanSelectionRequiredModal({
  isOpen,
  onClose,
}: PlanSelectionRequiredModalProps) {
  const icons = useSupabaseIcons();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" isBlur>
      <div className="flex flex-col items-center text-center p-[2rem]">
        <div className="bg-brand-primary/10 p-[1.5rem] rounded-full mb-[2rem]">
          <ImageComponent
            src={icons.greenCreditCard}
            alt=""
            width={40}
            height={40}
          />
        </div>

        <Heading className="mb-[1rem] text-center">Select this Plan First</Heading>

        <Text className="text-center mb-[3rem] text-[1.2rem]">
          You need to select this plan before you can configure add-ons for it.
        </Text>

        <Button
          variant="primary"
          className="w-full "
          onClick={onClose}
        >
          Got it
        </Button>
      </div>
    </Modal>
  );
}
