import { Channel } from "../../../../store/onboarding/types/channelTypes";
import ChatHeader from "../../../live-chat-test/ChatHeader";
import ChatInput from "../../../live-chat-test/ChatInput";
import ChatMessages from "../../../live-chat-test/ChatMessages";
import CloseModalButton from "../../../modal/CloseModalButton";
import Modal from "../../../modal/Modal";
import Button from "../../../ui/Button";
import Heading from "../../../ui/Heading";
import ImageComponent from "../../../ui/ImageComponent";
import Text from "../../../ui/Text";

interface EditChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  channel: Channel;
}

export default function EditChannelModal({
  isOpen,
  onClose,
  channel,
}: EditChannelModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="lg:p-[4rem] h-[95dvh] rounded-t-[2rem] sm:rounded-[1.6rem] sm:w-[64rem] lg:w-[117rem]"
      bottomSheet
    >
      <div className="flex items-center justify-between border-b border-input-stroke pb-[1rem] sticky top-[0rem] bg-primary z-[100]">
        <div className="flex items-center gap-[1rem]">
          <ImageComponent
            src={channel.icon}
            alt={channel.name}
            width={40}
            height={40}
          />

          <div className="">
            <Heading className="text-[2.4rem]">{channel.name}</Heading>
            <Text className="text-[1.4rem]">
              Edit your {channel.name} settings
            </Text>
          </div>
        </div>

        <CloseModalButton onClick={onClose} />
      </div>

      <div className="lg:flex py-[2.4rem]">
        <div className="w-full h-[100rem]"></div>

        <div className="w-full">
          <div className="mb-[2.4rem]">
            <Heading className="text-[2rem]">
              Test how this AI replies on this channel
            </Heading>
            <Text className="text-[1.2rem]">
              Test how this AI replies on this channel
            </Text>
          </div>
          <div className="flex flex-col h-full max-h-[60rem] border border-input-stroke rounded-[1.6rem]">
            <ChatHeader assistantName="Beezora" />

            <ChatMessages messages={[]} />

            <ChatInput
              inputText={""}
              setInputText={function (text: string): void {
                throw new Error("Function not implemented.");
              }}
              onSendMessage={function (): void {
                throw new Error("Function not implemented.");
              }}
              onKeyPress={function (e: React.KeyboardEvent): void {
                throw new Error("Function not implemented.");
              }}
              disabled={false}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[1rem] sticky bottom-0">
        <Button variant="secondary" className="w-full">
          Go back
        </Button>
        <Button className="w-full">Done</Button>
      </div>
    </Modal>
  );
}
