import { useState } from "react";
import { useSessionsQuery } from "./useSessionsQuery";
import { useSessionMutations } from "./useSessionMutations";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useToast } from "../../ui/toast/useToast";

export const useSessionsModal = () => {
  const { showToast } = useToast();
  const { data: sessions, isLoading, isError, refetch } = useSessionsQuery();
  const {
    terminateSession,
    terminateAllOthers,
    cleanupSessions,
    isTerminating,
    isTerminatingAll,
    isCleaningUp,
  } = useSessionMutations();

  const handleTerminateSession = async (sessionId: string) => {
    try {
      await terminateSession(sessionId);
      showToast({
        title: "Session Terminated",
        description: "The session has been successfully terminated.",
        variant: "success",
      });
    } catch (error) {
      showToast({
        title: "Action Failed",
        description: extractErrorMessage(error, "Failed to terminate session"),
        variant: "error",
      });
    }
  };

  const handleTerminateAll = async () => {
    try {
      await terminateAllOthers();
      showToast({
        title: "All Sessions Terminated",
        description: "All other sessions have been logged out.",
        variant: "success",
      });
    } catch (error) {
      showToast({
        title: "Action Failed",
        description: extractErrorMessage(error, "Failed to terminate sessions"),
        variant: "error",
      });
    }
  };

  const handleCleanup = async () => {
    try {
      await cleanupSessions();
      showToast({
        title: "Cleanup Successful",
        description: "Expired sessions have been removed.",
        variant: "success",
      });
    } catch (error) {
      showToast({
        title: "Cleanup Failed",
        description: extractErrorMessage(error, "Failed to cleanup sessions"),
        variant: "error",
      });
    }
  };

  return {
    sessions,
    isLoading,
    isError,
    refetch,
    handleTerminateSession,
    handleTerminateAll,
    handleCleanup,
    isTerminating,
    isTerminatingAll,
    isCleaningUp,
  };
};
