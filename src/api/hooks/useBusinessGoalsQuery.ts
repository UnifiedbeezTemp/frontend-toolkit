import { api } from "..";
import { BusinessGoal } from "../../types/businessGoalTypes";
import { useAppQuery } from "../query";

export function useBusinessGoalsQuery() {
  return useAppQuery<BusinessGoal[]>(
    ["goals"],
    () => api.get("/auth/business-goals"),
    {}
  );
}
