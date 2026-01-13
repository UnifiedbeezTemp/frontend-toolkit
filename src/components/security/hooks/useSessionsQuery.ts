import { api, useAppQuery } from "../../../api";
import { Session } from "../../../types/sessionTypes";

export const useSessionsQuery = () => {
  return useAppQuery<Session[]>(["sessions"], () => api.get("/sessions"), {
    enabled: true,
    refetchOnWindowFocus: true,
  });
};
