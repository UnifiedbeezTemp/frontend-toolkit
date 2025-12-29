import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  setRoles,
  setSelectedRole,
} from "../../../store/onboarding/slices/membersSlice";
import { api, useAppQuery } from "../../../api";
import { ApiRole } from "../../../types/api/memberTypes";

export const useTeamRoles = () => {
  const dispatch = useAppDispatch();
  const { selectedRole } = useAppSelector((state) => state.members);

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    error: rolesError,
    refetch: refetchRoles,
  } = useAppQuery<ApiRole[]>(["roles"], () => api.get("/roles"), {});

  useEffect(() => {
    if (rolesData && rolesData.length > 0) {
      dispatch(setRoles(rolesData));
      if (!selectedRole || selectedRole === "owner") {
        const defaultRole =
          rolesData.find((r) => r.type === "OWNER") ||
          rolesData.find((r) => r.isActive) ||
          rolesData[0];
        if (defaultRole) {
          dispatch(setSelectedRole(defaultRole.type));
        }
      }
    }
  }, [rolesData, dispatch, selectedRole]);

  return {
    rolesData,
    isLoadingRoles,
    rolesError,
    refetchRoles,
  };
};
