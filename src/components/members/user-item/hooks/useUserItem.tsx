import { useCallback } from "react";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { useAppDispatch } from "../../../../store/hooks/useRedux";
import { updateMemberRole, updateInvitedUserRole, removeMember, cancelInvitation, toggleMemberSelection } from "../../../../store/onboarding/slices/membersSlice";
export const useUserItem = (type: "invited" | "members", userId: string) => {
  const dispatch = useAppDispatch();
  const supabaseIcons = useSupabaseIcons();

  const getStatusStyles = useCallback((status: string) => {
    switch (status) {
      case "pending":
        return "text-warning border-warning bg-warning/10";
      case "denied":
        return "text-destructive border-destructive bg-destructive/10";
      default:
        return "text-text-primary border-input-stroke bg-border/50";
    }
  }, []);

  const handleRoleChange = useCallback(
    (role: string) => {
      if (type === "members") {
        dispatch(updateMemberRole({ id: userId, role }));
      } else {
        dispatch(updateInvitedUserRole({ id: userId, role }));
      }
    },
    [type, userId, dispatch]
  );

  const handleRemove = useCallback(() => {
    if (type === "members") {
      dispatch(removeMember(userId));
    } else {
      dispatch(cancelInvitation(userId));
    }
  }, [type, userId, dispatch]);

  const handleToggle = useCallback(() => {
    dispatch(toggleMemberSelection(userId));
  }, [userId, dispatch]);

  return {
    handleRoleChange,
    handleRemove,
    handleToggle,
    getStatusStyles,
    supabaseIcons,
  };
};
