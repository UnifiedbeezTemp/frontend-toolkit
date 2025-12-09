import { useEffect, useRef, useState, useCallback } from "react";
import { UseChatAutoScrollOptions } from "./types";

export default function useChatAutoScroll<T extends HTMLElement>(
  messages: any[],
  containerRef: React.RefObject<T>,
  { behavior = "smooth", bottomOffset = 30 }: UseChatAutoScrollOptions = {}
) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);

  const prevMsgCount = useRef(messages.length);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const distanceFromBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight;

    setIsAtBottom(distanceFromBottom < bottomOffset);
  }, [containerRef, bottomOffset]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [containerRef, handleScroll]);

  useEffect(() => {
    const el = containerRef.current;
    const isNewMessage = messages.length > prevMsgCount.current;

    if (isNewMessage && isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior, block: "end" });
    }

    prevMsgCount.current = messages.length;
  }, [messages, isAtBottom, behavior, containerRef]);

  return { bottomRef };
}
