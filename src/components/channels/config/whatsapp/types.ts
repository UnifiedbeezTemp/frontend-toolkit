import { Control, UseFormRegisterReturn, UseFormWatch } from "react-hook-form";
import { WhatsAppFormData } from "./hooks/useWhatsAppConfig";
import { Channel } from "../../../../store/onboarding/types/channelTypes";
import { ChannelConnection } from "../../../../types/channelConnectionTypes";

export interface WhatsAppConfigProps {
  channel: Channel;
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export interface WhatsAppFormDesktopProps {
  connection?: ChannelConnection | null;
  onSave: (data: WhatsAppFormData) => void;
  onDelete: () => void;
  isLoading: boolean;
  watch: UseFormWatch<WhatsAppFormData>;
  register: (name: keyof WhatsAppFormData, options?: { required?: boolean }) => UseFormRegisterReturn;
  readConfirmation: boolean;
  setReadConfirmation: (value: boolean) => void;
  profileImageUrl: string | null;
  profileImage: File | null;
  onImageSelect: (file: File) => void;
}

export interface WhatsAppFormMobileProps {
  channel: Channel;
  connection?: ChannelConnection | null;
  onSave: (data: WhatsAppFormData) => void;
  onDelete: () => void;
  onCancel: () => void;
  isLoading: boolean;
  control: Control<WhatsAppFormData>;
  watch: UseFormWatch<WhatsAppFormData>;
  register: (name: keyof WhatsAppFormData, options?: { required?: boolean }) => UseFormRegisterReturn;
  readConfirmation: boolean;
  setReadConfirmation: (value: boolean) => void;
  profileImageUrl: string | null;
  profileImage: File | null;
  onImageSelect: (file: File) => void;
}

