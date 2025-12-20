import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/useRedux";
import { 
  updateMemberRole, 
  updateInvitedUserRole, 
  updateInvitedUserRoleId, 
  toggleMemberSelection,
  cancelInvitation,
  removeMember,
} from "../../../../store/onboarding/slices/membersSlice";
import { TeamMember } from "../../../../store/onboarding/types/memberTypes";
import { useAuth } from "../../../../contexts/authContext";
import { api, useAppMutation } from "../../../../api";
import { store } from "../../../../store";

export const useUserItem = (
  type: "invited" | "members",
  userId: string,
  onSendInvite?: (invitationId: string, email: string, roleId: number) => void
) => {
  const dispatch = useAppDispatch();
  const supabaseIcons = useSupabaseIcons();
  const { user: currentUser } = useAuth();
  const invitedUsers = useAppSelector((state) => state.members.invitedUsers);
  const members = useAppSelector((state) => state.members.members);
  const roles = useAppSelector((state) => state.members.roles);
  const invitedStatusFilter = useAppSelector((state) => state.members.statusFilterInvited);
  
  const queryClient = useQueryClient();
  
  const currentMember =
    type === "members"
      ? members.find((m) => m.id === userId)
      : invitedUsers.find((u) => u.id === userId);
  
  const isCurrentUser = currentMember?.email === currentUser?.email;
  const isOwner = currentMember?.role === "OWNER" || currentMember?.isOwner;

  const { mutate: cancelInvitationMutation, isPending: isCancelingInvitation } = useAppMutation<
    string,
    void
  >(
    async (invitationId) => {
      return await api.delete(`/invitations/${invitationId}`);
    },
    {
      onSuccess: (_, invitationId) => {
        dispatch(cancelInvitation(invitationId));
        queryClient.invalidateQueries({ queryKey: ["invitations"] });
      },
    }
  );

  const { mutate: removeMemberMutation, isPending: isRemovingMember } = useAppMutation<
    string,
    void
  >(
    async (memberId) => {
      return await api.delete(`/team/members/${memberId}`);
    },
    {
      onSuccess: (_, memberId) => {
        dispatch(removeMember(memberId));
        queryClient.invalidateQueries({ queryKey: ["members"] });
      },
    }
  );

  const { mutate: assignRoleMutation, isPending: isAssigningRole } = useAppMutation<
    { userId: string; roleId: number },
    void
  >(
    async (payload) => {
      return await api.post("/team/assign-role", payload);
    },
    {
      onSuccess: (_, variables) => {
        const currentState = store.getState();
        const member = currentState.members.members.find(
          (m) => m.id === variables.userId
        );
        if (member) {
          const role = roles.find((r) => r.id === variables.roleId);
          if (role) {
            dispatch(updateMemberRole({ id: member.id, role: role.type }));
          }
        }
        queryClient.invalidateQueries({ queryKey: ["members"] });
      },
    }
  );

  const getStatusStyles = useCallback((status: string) => {
    switch (status) {
      case "pending":
        return "text-warning border-warning bg-warning/10";
      case "denied":
        return "text-destructive border-destructive bg-destructive/10";
      case "draft":
        return "text-text-primary border-input-stroke bg-border/50";
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
      if (isCurrentUser) {
        return;
      }
      removeMemberMutation(userId);
    } else {
      cancelInvitationMutation(userId);
    }
  }, [type, userId, isCurrentUser, removeMemberMutation, cancelInvitationMutation]);

  const handleToggle = useCallback(() => {
    if (type === "invited" && invitedStatusFilter !== "draft") {
      return;
    }
    dispatch(toggleMemberSelection(userId));
  }, [type, invitedStatusFilter, userId, dispatch]);

  const handleSendInvite = useCallback(() => {
    const user = invitedUsers.find((u) => u.id === userId);
    if (user && user.status === "draft" && onSendInvite) {
      const role = roles.find((r) => r.type === user.role);
      const roleId = role?.id || user.roleId || 0;
      onSendInvite(userId, user.email, roleId);
    }
  }, [userId, invitedUsers, roles, onSendInvite]);

  const handleRoleChangeWithId = useCallback(
    (role: string) => {
      if (type === "members") {
        if (isCurrentUser && isOwner) {
          return;
        }
        
        const roleObj = roles.find((r) => r.type === role);
        
        if (roleObj) {
          assignRoleMutation({ userId, roleId: roleObj.id });
        } else {
          dispatch(updateMemberRole({ id: userId, role }));
        }
      } else {
        dispatch(updateInvitedUserRole({ id: userId, role }));
        const user = invitedUsers.find((u) => u.id === userId);
        if (user && user.status === "draft") {
          const roleObj = roles.find((r) => r.type === role);
          if (roleObj) {
            dispatch(updateInvitedUserRoleId({ id: userId, roleId: roleObj.id }));
          }
        }
      }
    },
    [type, userId, dispatch, invitedUsers, roles, isCurrentUser, isOwner, assignRoleMutation]
  );

  return {
    handleRoleChange: handleRoleChangeWithId,
    handleRemove,
    handleToggle,
    handleSendInvite,
    getStatusStyles,
    supabaseIcons,
    isCurrentUser,
    isOwner,
    isRemoving: isRemovingMember,
    isCanceling: isCancelingInvitation,
    isAssigningRole,
  };
};
