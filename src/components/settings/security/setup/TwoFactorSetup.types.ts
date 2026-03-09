import {
  TwoFactorSetupResponse,
  Verify2FASetupResponse,
} from "@/shared/src/api/services/auth/types";

export interface TwoFactorSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  setupData: TwoFactorSetupResponse | null;
  verifyData: Verify2FASetupResponse | null;
  confirmSaved: boolean;
  setConfirmSaved: (saved: boolean) => void;
  token: string;
  setToken: (token: string) => void;
  step: "setup" | "backup" | "verify" | "success";
  setStep: (step: "setup" | "backup" | "verify" | "success") => void;
  onVerify: () => void;
  isVerifying: boolean;
  copyToClipboard: (text: string) => void;
}

export interface SetupStepProps {
  setupData: TwoFactorSetupResponse;
  confirmSaved: boolean;
  setConfirmSaved: (saved: boolean) => void;
  copyToClipboard: (text: string) => void;
}

export interface VerifyStepProps {
  token: string;
  setToken: (token: string) => void;
}

export interface SuccessStepProps {
  setupData: TwoFactorSetupResponse;
  verifyData: Verify2FASetupResponse | null;
  copyToClipboard: (text: string) => void;
}

export interface BackupCodesDisplayProps {
  codes: string[];
  copyToClipboard: (text: string) => void;
  variant?: "yellow" | "gray";
}
