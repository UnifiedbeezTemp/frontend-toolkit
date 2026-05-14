import { useEffect, useRef, useState, useCallback } from "react";
import { UseChatAutoScrollOptions } from "./types";

function scrollElementToBottom(
  element: HTMLElement | null,
  behavior: ScrollBehavior,
) {
  if (!element) return false;

  element.scrollTo({
    top: element.scrollHeight,
    behavior,
  });
  return true;
}

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
    const nextIsAtBottom = distanceFromBottom <= bottomOffset;

    setIsAtBottom((current) =>
      current === nextIsAtBottom ? current : nextIsAtBottom,
    );
  }, [bottomOffset, containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll, containerRef]);

  useEffect(() => {
    const isFirstLoad = !hasMounted.current;
    const isNewMessage = messages.length > prevMsgCount.current;

    if (isFirstLoad || (isNewMessage && isAtBottom)) {
      const didScrollContainer = scrollElementToBottom(
        containerRef.current,
        behavior,
      );

      if (!didScrollContainer) {
        bottomRef.current?.scrollIntoView({ behavior, block: "end" });
      }
    }

    hasMounted.current = true;
    prevMsgCount.current = messages.length;
  }, [messages.length, isAtBottom, behavior, containerRef]);

  const scrollToBottom = useCallback(() => {
    const didScrollContainer = scrollElementToBottom(
      containerRef.current,
      behavior,
    );

    if (!didScrollContainer) {
      bottomRef.current?.scrollIntoView({ behavior, block: "end" });
    }
  }, [behavior, containerRef]);

  return { bottomRef, scrollToBottom };
}
