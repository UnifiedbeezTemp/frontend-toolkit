import Modal from "../../../modal/Modal";
import ModalHeader from "../../../modal/ModalHeader";
import CloseModalButton from "../../../modal/CloseModalButton";
import { CRMList } from "../types";
import { getChannelColor, getChannelIcon } from "../utils";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";
import { cn } from "../../../../lib/utils";
import ListPlaceholderIcon from "../../../../assets/icons/ListPlaceholderIcon";
import { LIST_DETAIL_FIELDS } from "../constants";

interface ListDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: CRMList | null;
}

export default function ListDetailsModal({
  isOpen,
  onClose,
  list,
}: ListDetailsModalProps) {
  const icons = useSupabaseIcons();

  if (!list) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      className="lg:w-[56rem] p-[1.6rem] sm:p-[2.4rem]"
      bottomSheet
    >
      <ModalHeader
        text="List Details"
        description="View the details and configuration of this list."
        action={<CloseModalButton onClick={onClose} />}
        className="pb-[1.6rem]"
      />

      <div className="flex flex-col gap-[2.4rem] pt-[1.6rem]">
        <div className="flex items-center gap-[1.6rem]">
          <ListPlaceholderIcon size={56} color="var(--muted)" />
          <div className="flex flex-col gap-[0.4rem]">
            <h3 className="text-[1.8rem] font-bold text-text-primary">
              {list.name}
            </h3>
            <p className="text-[1.3rem] text-muted font-medium">{list.label}</p>
          </div>
        </div>

        <div className="flex items-center gap-[0.8rem]">
          <div
            className={cn(
              "flex items-center gap-[0.8rem] border w-fit px-[1rem] py-[0.5rem] rounded-full",
              getChannelColor(list.marketingChannel),
            )}
          >
            <ImageComponent
              src={getChannelIcon(list.marketingChannel, icons)}
              alt={list.marketingChannel}
              width={18}
              height={18}
            />
            <span className="text-[1.2rem] font-medium">
              {list.marketingChannel}
            </span>
          </div>
          <span className="text-[1.2rem] text-muted px-[0.8rem] py-[0.4rem] rounded-full border border-border bg-input-filled">
            {list.category}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.6rem] border-t border-border pt-[2rem]">
          {LIST_DETAIL_FIELDS(list).map((field) => (
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
            {new Date(list.createdAt).toLocaleDateString("en-US", {
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
