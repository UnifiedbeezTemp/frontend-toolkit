import React, { useState } from "react";
import { SelectionHeader } from "./selection/SelectionHeader";
import { SelectionCard } from "./selection/SelectionCard";
import { getSelectionOptions } from "./selection/SelectionOptions";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import Modal from "../../modal/Modal";
import Button from "../../ui/Button";

interface WhatsAppTemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (type: "create-own" | "discover" | "beezora") => void;
}

type TemplateType = "create-own" | "discover" | "beezora";

export default function WhatsAppTemplateSelectionModal({
  isOpen,
  onClose,
  onContinue,
}: WhatsAppTemplateSelectionModalProps) {
  const [selectedType, setSelectedType] = useState<TemplateType>("create-own");
  const icons = useSupabaseIcons();
  const options = getSelectionOptions();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="p-[1.6rem] sm:p-[2.4rem] rounded-t-[1.6rem] sm:rounded-[1.6rem] w-[80rem] sm:max-w-[95vw]"
      bottomSheet
    >
      <SelectionHeader icons={icons} onClose={onClose} />

      <div className="flex flex-col gap-[0.1rem] mb-[2.4rem]">
        <h3 className="text-[1.6rem] font-bold text-text-secondary">
          Create WhatsApp template
        </h3>
        <p className="text-[1.4rem] text-text-primary">
          Create personalized and interactive WhatsApp templates now.
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-[1.6rem] mb-[3.2rem]">
        {options.map((option) => (
          <SelectionCard
            key={option.id}
            id={option.id}
            title={option.title}
            description={option.description}
            icon={option.icon}
            isActive={selectedType === option.id}
            onClick={() => setSelectedType(option.id as TemplateType)}
            icons={icons}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-[1.6rem]">
        <Button
          variant="secondary"
          onClick={onClose}
          className="flex-1 justify-center py-[1.2rem] text-[1.4rem]"
        >
          Go back
        </Button>
        <Button
          variant="primary"
          onClick={() => onContinue(selectedType)}
          className="flex-1 justify-center highlight-inside border-0 py-[1.2rem] text-[1.4rem]"
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
}
