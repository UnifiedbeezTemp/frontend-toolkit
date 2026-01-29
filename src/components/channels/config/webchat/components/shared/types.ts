import { UseFormRegisterReturn, UseFormWatch, Control } from "react-hook-form";
import { WebchatFormData } from "../../hooks/useWebchatConfig";
import { ChannelConnection } from "../../../../../../types/channelConnectionTypes";

export interface WebchatFormSharedProps {
  connection?: ChannelConnection | null;
  onSave: (data: WebchatFormData) => void;
  onDelete: () => void;
  isLoading: boolean;
  watch: UseFormWatch<WebchatFormData>;
  register: (name: keyof WebchatFormData, options?: { required?: boolean }) => UseFormRegisterReturn;
  control?: Control<WebchatFormData>;
}

