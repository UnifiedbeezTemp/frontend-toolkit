"use client";

import Modal from "../../../components/modal/Modal";
import CloseModalButton from "../../../components/modal/CloseModalButton";
import Button from "../../../components/ui/Button";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import ImageComponent from "../../../components/ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

interface DeleteChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  channelName?: string;
  isLoading?: boolean;
}

export default function DeleteChannelModal({
  isOpen,
  onClose,
  onConfirm,
  channelName = "channel",
  isLoading = false,
}: DeleteChannelModalProps) {
  const icons = useSupabaseIcons();

  const handleDelete = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[90%] w-[35.2rem] rounded-[1.2rem]"
    >
      <div className="p-[2.4rem]">
        <div className="flex items-center justify-between mb-[1.6rem]">
          <div className="flex items-center justify-center bg-destructive/5 rounded-full w-[5rem] h-[5rem]">
            <div className="flex items-center justify-center bg-destructive/20 rounded-full w-[3.5rem] h-[3.5rem]">
              <ImageComponent
                src={icons.trashRed}
                alt="Delete"
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
          <Heading className="text-[1.6rem] mb-[0.2rem] font-[700]">
            Are you sure you want to delete {channelName} integration?
          </Heading>
          <Text size="sm" className="text-text-secondary">
            Are you sure you want to delete this. This action cannot be undone.
          </Text>
        </div>

        <div className="flex items-center gap-[1.2rem]">
          <Button
            variant="secondary"
            className="flex-1 text-[1.6rem]"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="flex-1 text-[1.6rem]"
            onClick={handleDelete}
            loading={isLoading}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
