"use client";

import Modal from "./Modal";
import CloseModalButton from "./CloseModalButton";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import { cn } from "../../lib/utils";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ImageComponent from "../ui/ImageComponent";
import type { ReactNode } from "react";

type ConfirmTone = "danger" | "primary" | "warning";

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmTone;
  confirmLoading?: boolean;
  bottomSheet?: boolean;
  iconSrc?: string;
  iconAlt?: string;
}

export default function ConfirmActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  children,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  tone = "danger",
  confirmLoading = false,
  bottomSheet = false,
  iconSrc,
  iconAlt = "icon",
}: ConfirmActionModalProps) {
  const icons = useSupabaseIcons();

  const toneClasses: Record<ConfirmTone, string> = {
    danger: "bg-destructive/10 text-destructive border-destructive/20",
    primary: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
    warning: "bg-warning/10 text-warning border-warning/20",
  };

  const innerToneClasses: Record<ConfirmTone, string> = {
    danger: "bg-destructive/20",
    primary: "bg-brand-primary/20",
    warning: "bg-warning/20",
  };

  const resolvedIconSrc =
    iconSrc ??
    (tone === "danger"
      ? icons.trashRed
      : tone === "warning"
        ? icons.warning
        : icons.check);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-full sm:w-[90%] max-w-[40rem] rounded-t-[1.2rem] sm:rounded-[1.2rem]"
      bottomSheet={bottomSheet}
    >
      <div className="p-[2.4rem]">
        <div className="flex items-center justify-between mb-[1.6rem]">
          <div
            className={cn(
              "flex items-center justify-center rounded-full w-[5rem] h-[5rem]",
              toneClasses[tone]
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full w-[3.5rem] h-[3.5rem] text-[1.8rem] font-[700]",
                innerToneClasses[tone],
              )}
            >
              <ImageComponent
                src={resolvedIconSrc}
                alt={iconAlt}
                width={20}
                height={20}
              />
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
          {children ? <div className="mt-[1.6rem]">{children}</div> : null}
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
