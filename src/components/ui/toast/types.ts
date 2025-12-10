export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastPayload {
  id?: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastContextValue {
  showToast: (payload: ToastPayload) => void;
  removeToast: (id: string) => void;
}

