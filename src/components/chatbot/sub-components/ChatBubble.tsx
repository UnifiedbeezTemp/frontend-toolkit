import { ChatMessage } from "../types";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
      {message.senderName && !isUser && (
        <span className="text-[1.2rem] text-muted font-bold mb-[0.4rem] px-[0.4rem]">
          {message.senderName}
        </span>
      )}

      <div
        className={`max-w-[85%] px-[1.6rem] py-[1.2rem] rounded-[1.6rem] text-[1.4rem] leading-[2.2rem] shadow-sm ${
          isUser
            ? "grad-btn text-white rounded-br-[0.4rem]"
            : "bg-input-filled border border-border text-text-primary rounded-bl-[0.4rem]"
        }`}
      >
        <p className="whitespace-pre-line">{message.text}</p>
      </div>

      <span className="text-[1.1rem] text-muted mt-[0.6rem] px-[0.4rem] font-medium">
        {message.timestamp}
      </span>
    </div>
  );
}
