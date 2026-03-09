import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import CloseModalButton from "../../../modal/CloseModalButton";
import { MergeField } from "../types";
import { FIELD_DETAIL_FIELDS } from "../constants";

interface FieldDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: MergeField | null;
}

export default function FieldDetailsModal({
  isOpen,
  onClose,
  field,
}: FieldDetailsModalProps) {
  if (!field) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      className="lg:w-[56rem] p-[1.6rem] sm:p-[2.4rem]"
      bottomSheet
    >
      <ModalHeader
        text="Field Details"
        description=""
        action={<CloseModalButton onClick={onClose} />}
        className="pb-[1.6rem]"
      />

      <div className="flex flex-col gap-[2.4rem] pt-[1.6rem]">
        <div className="flex items-center gap-[1rem]">
          {field.required && (
            <span className="w-[1rem] h-[1rem] rounded-full bg-brand-primary shrink-0" />
          )}
          <span className="text-[1.8rem] text-text-primary font-semibold">
            {field.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.6rem] border-t border-border pt-[2rem]">
          {FIELD_DETAIL_FIELDS(field).map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-[0.4rem] p-[1.2rem] rounded-[1.2rem] bg-input-filled border border-border"
            >
              <span className="text-[1.2rem] text-muted font-medium uppercase tracking-wide">
                {item.label}
              </span>
              <span className="text-[1.5rem] text-text-primary font-semibold break-all">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[0.4rem] p-[1.2rem] rounded-[1.2rem] bg-input-filled border border-border">
          <span className="text-[1.2rem] text-muted font-medium uppercase tracking-wide">
            Created At
          </span>
          <span className="text-[1.5rem] text-text-primary font-semibold">
            {new Date(field.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </Modal>
  );
}
