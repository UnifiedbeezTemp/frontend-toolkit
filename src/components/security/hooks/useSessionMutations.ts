import { api, useAppMutation } from "../../../api";
import { useQueryClient } from "@tanstack/react-query";

export const useSessionMutations = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: terminateSession, isPending: isTerminating } =
    useAppMutation(
      (sessionId: string) => api.delete(`/sessions/${sessionId}`),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["sessions"] });
        },
      }
    );

  const { mutateAsync: _terminateAllOthers, isPending: isTerminatingAll } =
    useAppMutation<void, unknown>(() => api.delete("/sessions"), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
      },
    });

  const { mutateAsync: _cleanupSessions, isPending: isCleaningUp } =
    useAppMutation<void, unknown>(() => api.post("/sessions/cleanup"), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
      },
    });

  const terminateAllOthers = () => _terminateAllOthers(undefined);
  const cleanupSessions = () => _cleanupSessions(undefined);

  return {
    terminateSession,
    terminateAllOthers,
    cleanupSessions,
    isTerminating,
    isTerminatingAll,
    isCleaningUp,
  };
};
