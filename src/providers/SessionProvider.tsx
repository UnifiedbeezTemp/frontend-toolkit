"use client";
import { PropsWithChildren } from "react";
import PreLoader from "../components/ui/PreLoader";
import useSession from "./hooks/useSession";
import { ToastProvider } from "../components/ui/toast/ToastProvider";
import { UserContext } from "../contexts/UserContext";
import ErrorDisplay from "../components/error-display/ErrorDisplay";
import { error } from "console";

export default function SessionProvider({ children }: PropsWithChildren) {
  const { isPending, isError, data, authStatus, refetch, error } = useSession();

  if (isPending) return <PreLoader />;

  if (isError)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <ErrorDisplay
          message={error?.message?.message}
          onRetry={refetch}
          onReportError={() => {}}
          onGoToHomepage={() => {}}
        />
      </div>
    );

  return (
    <UserContext.Provider
      value={{ user: data || null, status: authStatus, refetch }}
    >
      {children}
    </UserContext.Provider>
  );
}
