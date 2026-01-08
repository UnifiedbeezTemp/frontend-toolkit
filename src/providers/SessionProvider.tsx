"use client";
import { PropsWithChildren } from "react";
import PreLoader from "../components/ui/PreLoader";
import useSession from "./hooks/useSession";
import { UserContext } from "../contexts/UserContext";
import ErrorDisplay from "../components/error-display/ErrorDisplay";

export default function SessionProvider({ children }: PropsWithChildren) {
  const { isPending, isError, data, authStatus, refetch, error } = useSession();

  if (isPending) return <PreLoader />;

  if(authStatus === "unauthenticated") return <></>

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
