"use client";

import Modal from "./Modal";
import CloseModalButton from "./CloseModalButton";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import { cn } from "../../lib/utils";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "../ui/ImageComponent";

type ConfirmTone = "danger" | "primary" | "warning";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmTone;
  confirmLoading?: boolean;
}

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  tone = "danger",
  confirmLoading = false,
}: ConfirmActionModalProps) {
  const icons = useSupabaseIcons();
  
  const toneClasses: Record<ConfirmTone, string> = {
    danger: "bg-destructive/10 text-destructive border-destructive/20",
    primary: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
    warning: "bg-warning/10 text-warning border-warning/20",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[90%] max-w-[36rem] rounded-[1.2rem]"
    >
      <div className="p-[2.4rem]">
        <div className="flex items-center justify-between mb-[1.6rem]">
          <div
            className={cn(
              "flex items-center justify-center rounded-full w-[5rem] h-[5rem]",
              toneClasses[tone]
            )}
          >
            <div className="flex items-center justify-center rounded-full w-[3.5rem] h-[3.5rem] bg-destructive/20 text-[1.8rem] font-[700]">
              <ImageComponent src={icons.trashRed} alt="trash" width={20} height={20} />
            </div>
          </div>
          <CloseModalButton
            onClick={onClose}
            className="bg-input-filled px-[.88rem]"
          />
        </div>

        <div className="mb-[2.4rem]">
          <Heading className="text-[1.8rem] mb-[0.2rem] font-[700]">
            {title}
          </Heading>
          {description ? (
            <Text size="sm" className="text-text-secondary">
              {description}
            </Text>
          ) : null}
        </div>

        <div className="flex items-center gap-[1.2rem]">
          <Button
            variant="secondary"
            className="flex-1 text-[1.6rem]"
            onClick={onClose}
            disabled={confirmLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={tone === "danger" ? "danger" : "primary"}
            className="flex-1 text-[1.6rem]"
            onClick={onConfirm}
            loading={confirmLoading}
            disabled={confirmLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

