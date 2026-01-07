import { useEffect, useRef, useState, useCallback } from "react";
import { UseChatAutoScrollOptions } from "./types";

export default function useChatAutoScroll<
  T extends HTMLElement,
  TMsg = unknown
>(
  messages: TMsg[],
  containerRef: React.RefObject<T | null>,
  { behavior = "smooth", bottomOffset = 30 }: UseChatAutoScrollOptions = {}
) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);

  const hasMounted = useRef(false);
  const prevMsgCount = useRef(messages.length);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

    setIsAtBottom(distanceFromBottom <= bottomOffset);
  }, [bottomOffset, containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll, containerRef]);

  useEffect(() => {
    const isFirstLoad = !hasMounted.current;
    const isNewMessage = messages.length > prevMsgCount.current;

    if (isFirstLoad || (isNewMessage && isAtBottom)) {
      bottomRef.current?.scrollIntoView({ behavior, block: "end" });
    }

    hasMounted.current = true;
    prevMsgCount.current = messages.length;
  }, [messages.length, isAtBottom, behavior]);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior, block: "end" });
  }, [behavior]);

  return { bottomRef, scrollToBottom };
}
