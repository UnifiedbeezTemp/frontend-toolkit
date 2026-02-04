"use client";
import { PropsWithChildren } from "react";
import { useEffect } from "react";
import PreLoader from "../components/ui/PreLoader";
import useSession from "./hooks/useSession";
import { UserContext } from "../contexts/UserContext";
import ErrorDisplay from "../components/error-display/ErrorDisplay";
import SessionExpiredModal from "../components/session/SessionExpiredModal";
import { redirectToLogin } from "../utils/redirectToLogin";

export default function SessionProvider({ children }: PropsWithChildren) {
  const {
    isPending,
    isError,
    data,
    authStatus,
    refetch,
    error,
    showSessionExpired,
  } = useSession();

  useEffect(() => {
    if (authStatus === "unauthenticated" && !showSessionExpired) {
      redirectToLogin();
    }
  }, [authStatus, showSessionExpired]);

  if (isPending) return <PreLoader />;

  if (showSessionExpired) {
    return <SessionExpiredModal isOpen={true} />;
  }

  if (authStatus === "unauthenticated") {
    return <PreLoader />;
  }

  if (isError && error?.status !== 401) {
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
  }

  return (
    <UserContext.Provider
      value={{ user: data || null, status: authStatus, refetch }}
    >
      {children}
    </UserContext.Provider>
  );
}
