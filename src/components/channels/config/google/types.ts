import { Control, UseFormRegisterReturn, UseFormWatch } from "react-hook-form";
import { GoogleFormData } from "./hooks/useGoogleConfig";
import { Channel } from "../../../../store/onboarding/types/channelTypes";
import { ChannelConnection } from "../../../../types/channelConnectionTypes";

export interface GoogleConfigProps {
  channel: Channel;
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export interface GoogleFormDesktopProps {
  connection?: ChannelConnection | null;
  onSave: (data: GoogleFormData) => void;
  onDelete: () => void;
  isLoading: boolean;
  watch: UseFormWatch<GoogleFormData>;
  register: (name: keyof GoogleFormData, options?: { required?: boolean }) => UseFormRegisterReturn;
  readConfirmation: boolean;
  setReadConfirmation: (value: boolean) => void;
}

export interface GoogleFormMobileProps {
  channel: Channel;
  connection?: ChannelConnection | null;
  onSave: (data: GoogleFormData) => void;
  onDelete: () => void;
  onCancel: () => void;
  isLoading: boolean;
  control: Control<GoogleFormData>;
  watch: UseFormWatch<GoogleFormData>;
  readConfirmation: boolean;
  setReadConfirmation: (value: boolean) => void;
}

