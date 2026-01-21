"use client"

import Modal from "../../modal/Modal"
import ModalHeader from "../../modal/ModalHeader"
import CloseModalButton from "../../modal/CloseModalButton"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import Text from "../../ui/Text"
import { useCreateNewChatModal } from "./hooks/useCreateNewChatModal"
import ChannelSelector from "./components/ChannelSelector"
import ContactListButton from "./components/ContactListButton"
import { CreateNewChatModalProps } from "./types"

export default function CreateNewChatModal({
  isOpen,
  onClose,
}: CreateNewChatModalProps) {
  const {
    toValue,
    selectedChannel,
    selectedChannelLabel,
    isChannelDropdownOpen,
    channelTriggerRef,
    isFormValid,
    handleToChange,
    handleChannelSelect,
    toggleChannelDropdown,
    closeChannelDropdown,
    handleSubmit,
    handleContactListClick,
  } = useCreateNewChatModal()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[55.3rem] w-full rounded-[1.6rem]"
    >
      <div className="p-6">
        <ModalHeader
          text="Create new chat"
          description=""
          action={<CloseModalButton onClick={onClose} />}
          borderB={false}
          className="pb-2 px-0"
        />

        <div className="border-t border-t-input-stroke pt-6">
          <div className="flex flex-col gap-2 mb-6">
            <Text className="text-[1.6rem] font-bold text-text-primary">
              To
            </Text>
            <Input
              value={toValue}
              onChange={(e) => handleToChange(e.target.value)}
              placeholder="Enter a phone number, email address, or a name of an existing contact"
              className="w-full placeholder:text-md text-md"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Text className="text-[1.6rem] font-bold text-text-primary">
              From
            </Text>
            <ChannelSelector
              selectedChannel={selectedChannel}
              selectedChannelLabel={selectedChannelLabel}
              isOpen={isChannelDropdownOpen}
              onToggle={toggleChannelDropdown}
              onClose={closeChannelDropdown}
              onSelect={handleChannelSelect}
              triggerRef={channelTriggerRef}
            />
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="relative w-full flex justify-center items-center">
              <hr className="absolute w-full h-1 top-1/2 left-1/2 -translate-1/2 border-input-stroke" />
              <Text className="text-md px-2 pb-1.5 text-text-primary relative bg-primary">
                or
              </Text>
            </div>
            <ContactListButton onClick={handleContactListClick} />
          </div>

          <Button
            onClick={() => handleSubmit(onClose)}
            variant="primary"
            className="w-full mt-8 max-w-[16rem]"
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  )
}
