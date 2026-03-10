import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import CloseModalButton from "../../../modal/CloseModalButton";
import { CRMTag } from "../types";
import { TagPill } from "../../../inbox/components/TagPill";
import { TAG_DETAIL_FIELDS } from "../constants";
import { getCategoryLabel } from "../utils";

interface TagDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tag: CRMTag | null;
}

export default function TagDetailsModal({
  isOpen,
  onClose,
  tag,
}: TagDetailsModalProps) {
  if (!tag) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      className="lg:w-[56rem] p-[1.6rem] sm:p-[2.4rem]"
      bottomSheet
    >
      <ModalHeader
        text="Tag Details"
        description="View the details and configuration of this tag."
        action={<CloseModalButton onClick={onClose} />}
        className="pb-[1.6rem]"
      />

      <div className="flex flex-col gap-[2.4rem] pt-[1.6rem]">
        <div className="flex items-center gap-[1.6rem]">
          <TagPill
            label={tag.label}
            className="text-[1.4rem] px-[1.2rem] py-[0.6rem]"
            tagIconSize={14}
          />
        </div>

        <div className="flex items-center gap-[0.8rem]">
          <span className="text-[1.3rem] text-muted px-[0.8rem] py-[0.4rem] rounded-full border border-border bg-input-filled">
            {getCategoryLabel(tag.category)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.6rem] border-t border-border pt-[2rem]">
          {TAG_DETAIL_FIELDS(tag).map((field) => (
            <div
              key={field.label}
              className="flex flex-col gap-[0.4rem] p-[1.2rem] rounded-[1.2rem] bg-input-filled border border-border"
            >
              <span className="text-[1.2rem] text-muted font-medium uppercase tracking-wide">
                {field.label}
              </span>
              <span className="text-[1.5rem] text-text-primary font-semibold">
                {field.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[0.4rem] p-[1.2rem] rounded-[1.2rem] bg-input-filled border border-border">
          <span className="text-[1.2rem] text-muted font-medium uppercase tracking-wide">
            Created At
          </span>
          <span className="text-[1.5rem] text-text-primary font-semibold">
            {new Date(tag.createdAt).toLocaleDateString("en-US", {
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
