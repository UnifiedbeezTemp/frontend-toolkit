import { Control, UseFormRegisterReturn, UseFormWatch } from "react-hook-form";
import { PlaceholderFormData } from "./hooks/usePlaceholderConfig";
import { Channel } from "../../../../store/onboarding/types/channelTypes";
import { ChannelConnection } from "../../../../types/channelConnectionTypes";

export interface PlaceholderConfigProps {
  channel: Channel;
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export interface PlaceholderFormDesktopProps {
  connection?: ChannelConnection | null;
  onSave: (data: PlaceholderFormData) => void;
  onDelete: () => void;
  isLoading: boolean;
  watch: UseFormWatch<PlaceholderFormData>;
  register: (name: keyof PlaceholderFormData, options?: { required?: boolean }) => UseFormRegisterReturn;
}

export interface PlaceholderFormMobileProps {
  channel: Channel;
  connection?: ChannelConnection | null;
  onSave: (data: PlaceholderFormData) => void;
  onDelete: () => void;
  onCancel: () => void;
  isLoading: boolean;
  control: Control<PlaceholderFormData>;
  watch: UseFormWatch<PlaceholderFormData>;
  register: (name: keyof PlaceholderFormData, options?: { required?: boolean }) => UseFormRegisterReturn;
}

