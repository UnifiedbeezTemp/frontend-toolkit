import {
  Control,
  FieldValues,
  UseFormRegisterReturn,
  UseFormWatch,
} from "react-hook-form";
import { FacebookFormData } from "./hooks/useFacebookConfig";
import { Channel } from "../../../../store/onboarding/types/channelTypes";
import { ChannelConnection } from "../../../../types/channelConnectionTypes";

export interface FacebookConfigProps {
  channel: Channel;
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export interface FacebookFormProps {
  channel: Channel;
  connection?: ChannelConnection | null;
  onSave: (data: FacebookFormData) => void;
  onDelete: () => void;
  onCancel?: () => void;
  isLoading: boolean;
  watch: UseFormWatch<FacebookFormData>;
  register: (
    name: keyof FacebookFormData,
    options?: { required?: boolean }
  ) => UseFormRegisterReturn;
  readConfirmation: boolean;
  setReadConfirmation: (value: boolean) => void;
  profileImageUrl: string | null;
  profileImage: File | null;
  onImageSelect: (file: File) => void;
}
