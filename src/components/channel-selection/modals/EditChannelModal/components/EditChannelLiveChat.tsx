import ChatHeader from "../../../../live-chat-test/ChatHeader";
import ChatInput from "../../../../live-chat-test/ChatInput";
import ChatMessages from "../../../../live-chat-test/ChatMessages";
import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";
import PreLoader from "../../../../ui/PreLoader";
import { useTestChat } from "../../../../channel-account-ai-config/test-chat/hooks/useTestChat";
import { AIConfigParams } from "../../../../channel-account-ai-config/services/aiConfigService";
import { AIAssistant } from "../../../../../types/aiAssistantTypes";

interface EditChannelLiveChatProps {
  params: AIConfigParams;
  selectedAssistant: AIAssistant | null;
}

export default function EditChannelLiveChat({
  params,
  selectedAssistant,
}: EditChannelLiveChatProps) {
  const {
    messages,
    inputText,
    setInputText,
    isTyping,
    typingText,
    isInitializing,
    handleSendMessage,
    handleKeyPress,
    handleRefresh,
  } = useTestChat({
    channelId: params.channelId,
    aiId: params.aiId,
    connectionId: Number(params.connectionId),
    metadata: params.metadata,
  });

  const assistantName = selectedAssistant?.name || "Beezora";

  if (isInitializing) {
    return (
      <div className="w-full">
        <div className="mb-[2.4rem]">
          <Heading className="text-[2rem]">Test your AI Assistant</Heading>
          <Text className="text-[1.2rem] text-text-secondary">
            Interact with your AI to verify its behavior and responses on this
            channel.
          </Text>
        </div>
        <PreLoader isPage={false} height={150} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-[2.4rem]">
        <Heading className="text-[2rem]">Test your AI Assistant</Heading>
        <Text className="text-[1.2rem] text-text-secondary">
          Interact with your AI to verify its behavior and responses on this
          channel.
        </Text>
      </div>
      <div className="flex flex-col h-full min-h-[60rem] border border-input-stroke rounded-[1.6rem]">
        <ChatHeader assistantName={assistantName} onRefresh={handleRefresh} />

        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          typingText={typingText}
          assistantName={assistantName}
        />

        <ChatInput
          inputText={inputText}
          setInputText={setInputText}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
          disabled={isInitializing}
        />
      </div>
    </div>
  );
}
