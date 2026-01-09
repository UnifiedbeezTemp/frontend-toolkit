import { api } from "..";
import { BusinessObjective } from "../../types/businessObjectiveTypes";
import { useAppQuery } from "../query";

export function useBusinessObjectivesQuery() {
  return useAppQuery<BusinessObjective[]>(
    ["objectives"],
    () => api.get("/auth/business-objectives"),
    {}
  );
}
