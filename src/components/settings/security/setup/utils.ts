export const downloadBackupCodes = (codes: string[]) => {
  const element = document.createElement("a");
  const file = new Blob([codes.join("\n")], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "backup-codes.txt";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const MODAL_CONTENT = {
  setup: {
    title: "Set up Two-Factor Authentication",
    description: "Secure your account with an authenticator app",
  },
  backup: {
    title: "Save your backup codes",
    description:
      "Save these emergency backup codes somewhere safe. If you lose your device, you can use the backup codes to sign in.",
  },
  verify: {
    title: "Set up Two-Factor Authentication",
    description: "Secure your account with an authenticator app",
  },
  success: {
    title: "Two-Factor Authentication Enabled",
    description:
      "Your account is now protected with an extra layer of security.",
  },
};

export const handleOtpInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number,
  token: string,
  setToken: (token: string) => void,
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>,
) => {
  const value = e.target.value;
  if (!/^\d*$/.test(value)) return;

  const newValue = token.split("");
  newValue[index] = value.slice(-1);
  const updatedToken = newValue.join("");
  setToken(updatedToken);

  if (value && index < 5) {
    inputRefs.current[index + 1]?.focus();
  }
};

export const handleOtpKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number,
  token: string,
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>,
) => {
  if (e.key === "Backspace" && !token[index] && index > 0) {
    inputRefs.current[index - 1]?.focus();
  }
};

export const handleOtpPaste = (
  e: React.ClipboardEvent,
  setToken: (token: string) => void,
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>,
) => {
  e.preventDefault();
  const pasteData = e.clipboardData
    .getData("text")
    .slice(0, 6)
    .replace(/\D/g, "");
  setToken(pasteData);
  if (pasteData.length > 0) {
    const focusIndex = Math.min(pasteData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  }
};

export const getBackButtonAction = (
  step: string,
  onClose: () => void,
  setStep: (step: "setup" | "backup" | "verify" | "success") => void,
) => {
  if (step === "setup") return onClose;
  if (step === "backup") return () => setStep("setup");
  return () => setStep("backup");
};
