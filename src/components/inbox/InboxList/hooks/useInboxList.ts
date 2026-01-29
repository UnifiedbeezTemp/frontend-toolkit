import { useRouter } from "next/navigation";
import { useToggle } from "../../../../hooks/useToggle";
import { useConversations } from "../../context/ConversationContext";
import { InboxType } from "../../types";

export interface useInboxListProps {
  onInboxTypeChange: (type: InboxType) => void;
}

export const useInboxList = ({ onInboxTypeChange }: useInboxListProps) => {
  const {
    filteredGeneralConversations,
    filteredTeamConversations,
    markAsRead,
  } = useConversations();
  const router = useRouter();
  
  const {
    setTrue: openSideDrawer,
    value: isSideDrawerOpen,
    setFalse: closeSideDrawer,
  } = useToggle();

  const handleInboxTypeChange = (type: InboxType) => {
    onInboxTypeChange(type);
    router.push("/inbox");
  };

  const handleConversationClick = (conversationId: string) => {
    markAsRead(conversationId);
    router.push(`/inbox/${conversationId}`);
  };

  return {
    filteredGeneralConversations,
    filteredTeamConversations,
    isSideDrawerOpen,
    openSideDrawer,
    closeSideDrawer,
    handleInboxTypeChange,
    handleConversationClick,
  };
};
