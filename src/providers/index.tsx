"use client";
import { PropsWithChildren } from "react";
import QueryClientProvider from "./QueryClientProvider";
import SessionProvider from "./SessionProvider";
import { ToastProvider } from "../components/ui/toast/ToastProvider";

export default function AllProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider>
      <ToastProvider>
        <SessionProvider>{children}</SessionProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
