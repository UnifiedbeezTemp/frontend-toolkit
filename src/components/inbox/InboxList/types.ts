import { ReactNode } from "react";
import { InboxType } from "../types";

export interface InboxSearchAndFiltersProps {
  inboxType?: InboxType;
}

export interface InboxListTopToolBarProps {
  title: string;
  onTitleClick?: () => void;
  onLeftClick?: () => void;
  className?: string;
  selectedInboxType?: InboxType;
  onInboxTypeChange?: (type: InboxType) => void;
}

export interface SubItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface LabelConversationItemProps {
  label: string;
  icon?: ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
  subItems?: SubItem[];
  footerAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export interface GeneralInboxConversationItemProps {
  onClick?: () => void;
  className?: string;
  unreadCount?: number;
  preview?: string;
  timestamp?: string;
  tag?: string | ReactNode;
  name: string;
  leading: ReactNode;
  isActive?: boolean;
}

export interface TeamInboxConversationItemProps {
  onClick?: () => void;
  className?: string;
  unreadCount?: number;
  preview?: string;
  timestamp?: string;
  name: string;
  leading: ReactNode;
  isActive?: boolean;
  isGroup?: boolean;
  participants?: string[];
  participantAvatars?: string[];
}
