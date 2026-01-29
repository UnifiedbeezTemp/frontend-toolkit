import { useLongPress } from "../../../../hooks/useLongPress";
import React from "react";

interface useMessageWrapperProps {
  messageId: string;
  onLongPress: (messageId: string, element: HTMLElement) => void;
}

export const useMessageWrapper = ({ messageId, onLongPress }: useMessageWrapperProps) => {
  const longPressHandlers = useLongPress({
    onLongPress: (e: React.TouchEvent | React.MouseEvent) => {
      if (e.currentTarget instanceof HTMLElement) {
        onLongPress(messageId, e.currentTarget);
      }
    },
  });

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget instanceof HTMLElement) {
      onLongPress(messageId, e.currentTarget);
    }
  };

  return {
    longPressHandlers,
    handleContextMenu,
  };
};
