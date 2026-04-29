"use client";
import { PropsWithChildren } from "react";
import QueryClientProvider from "./QueryClientProvider";
import SessionProvider from "./SessionProvider";
import AuthSessionExpiredProvider from "./AuthSessionExpiredProvider";
import { ToastProvider } from "../components/ui/toast/ToastProvider";
export { ThemeProvider, useTheme } from "./ThemeProvider";
export { default as AuthSessionExpiredProvider } from "./AuthSessionExpiredProvider";
export type { AuthSessionExpiredProviderProps } from "./AuthSessionExpiredProvider";
export { ToastProvider, useToast } from "../components/ui/toast/ToastProvider";

export default function AllProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <ToastProvider>
        <AuthSessionExpiredProvider>
          <SessionProvider>{children}</SessionProvider>
        </AuthSessionExpiredProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
