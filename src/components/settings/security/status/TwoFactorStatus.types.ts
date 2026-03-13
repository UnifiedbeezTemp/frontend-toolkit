import { TwoFactorStatusResponse } from "../../../../api/services/auth/types";

export interface TwoFactorStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: TwoFactorStatusResponse | null | undefined;
  isLoading: boolean;
  onRegenerate: () => void;
  isRegenerating: boolean;
  onDisable: () => void;
  regeneratedCodes?: string[] | null;
  onClearRegenerated?: () => void;
  copyToClipboard: (text: string) => void;
}

export interface RegeneratedSuccessStepProps {
  regeneratedCodes: string[];
  copyToClipboard: (text: string) => void;
}

export interface StatusManagementStepProps {
  status: TwoFactorStatusResponse;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export interface StatusItemProps {
  label: string;
  value: string | number;
  description?: string;
  badge?: string;
}
