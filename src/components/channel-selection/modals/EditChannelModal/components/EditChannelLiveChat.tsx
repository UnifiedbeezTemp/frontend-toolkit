import ChatHeader from "../../../../live-chat-test/ChatHeader";
import ChatInput from "../../../../live-chat-test/ChatInput";
import ChatMessages from "../../../../live-chat-test/ChatMessages";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";

export default function EditChannelLiveChat() {
  return (
    <div className="w-full">
      <div className="mb-[2.4rem]">
        <Heading className="text-[2rem]">Test your AI Assistant</Heading>
        <Text className="text-[1.2rem] text-text-secondary">
          Interact with your AI to verify its behavior and responses on this
          channel.
        </Text>
      </div>
      <div className="flex flex-col h-full max-h-[60rem] border border-input-stroke rounded-[1.6rem]">
        <ChatHeader
          assistantName="Beezora"
          onRefresh={function (): void {
            throw new Error("Function not implemented.");
          }}
        />

        <ChatMessages
          messages={[]}
          isTyping={false}
          typingText={""}
          assistantName={""}
        />

        <ChatInput
          inputText={""}
          setInputText={function (text: string): void {
            // TODO: Implement state management
          }}
          onSendMessage={function (): void {
            // TODO: Implement messaging logic
          }}
          onKeyPress={function (e: React.KeyboardEvent): void {
            // TODO: Implement key press logic
          }}
          disabled={false}
        />
      </div>
    </div>
  );
}
