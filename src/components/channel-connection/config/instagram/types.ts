import { Control, UseFormRegisterReturn, UseFormWatch } from "react-hook-form";
import { InstagramFormData } from "./hooks/useInstagramConfig";
import { Channel } from "../../../../store/onboarding/types/channelTypes";
import { ChannelConnection } from "../../../../types/channelConnectionTypes";

export interface InstagramConfigProps {
  channel: Channel;
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export interface InstagramFormDesktopProps {
  connection?: ChannelConnection | null;
  onSave: (data: InstagramFormData) => void;
  onDelete: () => void;
  isLoading: boolean;
  watch: UseFormWatch<InstagramFormData>;
  register: (name: keyof InstagramFormData, options?: { required?: boolean }) => UseFormRegisterReturn;
  readConfirmation: boolean;
  setReadConfirmation: (value: boolean) => void;
  quickReactions: boolean;
  setQuickReactions: (value: boolean) => void;
  mentions: boolean;
  setMentions: (value: boolean) => void;
  conversationStarters: boolean;
  setConversationStarters: (value: boolean) => void;
  profileImageUrl: string | null;
  profileImage: File | null;
  onImageSelect: (file: File) => void;
}

export interface InstagramFormMobileProps {
  channel: Channel;
  connection?: ChannelConnection | null;
  onSave: (data: InstagramFormData) => void;
  onDelete: () => void;
  onCancel: () => void;
  isLoading: boolean;
  control: Control<InstagramFormData>;
  watch: UseFormWatch<InstagramFormData>;
  register: (name: keyof InstagramFormData, options?: { required?: boolean }) => UseFormRegisterReturn;
  readConfirmation: boolean;
  setReadConfirmation: (value: boolean) => void;
  quickReactions: boolean;
  setQuickReactions: (value: boolean) => void;
  mentions: boolean;
  setMentions: (value: boolean) => void;
  conversationStarters: boolean;
  setConversationStarters: (value: boolean) => void;
  profileImageUrl: string | null;
  profileImage: File | null;
  onImageSelect: (file: File) => void;
}

