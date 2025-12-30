import { useState } from "react";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import { store } from "../../../store";
import {
  updateInvitedUserRoleId,
  markInvitationAsSent,
} from "../../../store/onboarding/slices/membersSlice";
import { api, useAppMutation } from "../../../api";
import { ApiInvitation } from "../../../types/api/memberTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../../components/ui/toast/useToast";

export const useSendTeamInvitation = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [sendingInvitationId, setSendingInvitationId] = useState<string | null>(
    null
  );

  const { mutate: sendInvitation, isPending: isSendingInvitation } =
    useAppMutation<
      { email: string; roleId: number; message: string },
      ApiInvitation
    >(
      async (payload) => {
        return await api.post<
          { email: string; roleId: number; message: string },
          ApiInvitation
        >("/invitations", payload);
      },
      {
        onSuccess: (data, variables) => {
          const currentState = store.getState();
          const draftInvitation = currentState.members.invitedUsers.find(
            (u) => u.email === variables.email && u.status === "draft"
          );

          const apiInvitationIdRaw =
            (data as { invitation?: { id?: string | number } }).invitation
              ?.id ??
            (data as { id?: string | number }).id ??
            null;
          const apiInvitationId =
            typeof apiInvitationIdRaw === "string" ||
            typeof apiInvitationIdRaw === "number"
              ? apiInvitationIdRaw
              : null;

          const apiRoleIdRaw =
            (data as { invitation?: { roleId?: number } }).invitation?.roleId ??
            (data as { roleId?: number }).roleId ??
            variables.roleId;
          const apiRoleId =
            typeof apiRoleIdRaw === "number" && Number.isFinite(apiRoleIdRaw)
              ? apiRoleIdRaw
              : null;

          if (draftInvitation && apiInvitationId !== null) {
            dispatch(
              markInvitationAsSent({
                id: draftInvitation.id,
                apiInvitationId,
              })
            );

            if (apiRoleId !== null) {
              dispatch(
                updateInvitedUserRoleId({
                  id: String(apiInvitationId),
                  roleId: apiRoleId,
                })
              );
            }
          }

          const successMessage =
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof (data as { message?: unknown }).message === "string"
              ? (data as { message: string }).message
              : "Invitation sent successfully";

          showToast({
            title: successMessage,
            description: `Invited ${variables.email}`,
            variant: "success",
          });

          setSendingInvitationId(null);
          queryClient.invalidateQueries({ queryKey: ["invitations"] });
        },
        onError: (error: unknown) => {
          let description = "An unknown error occurred";
          if (
            typeof error === "object" &&
            error !== null &&
            "message" in error &&
            typeof (error as { message?: unknown }).message === "object" &&
            (error as { message?: { message?: unknown } }).message !== null &&
            "message" in
              (error as { message: { message?: unknown } }).message &&
            typeof (
              (error as { message: { message?: unknown } }).message as {
                message?: unknown;
              }
            ).message === "string"
          ) {
            description = (error as { message: { message: string } }).message
              .message;
          }

          showToast({
            title: "Failed to send invitation",
            description,
            variant: "error",
          });

          setSendingInvitationId(null);
        },
      }
    );

  const handleSendInvitation = (
    invitationId: string,
    email: string,
    roleId: number
  ) => {
    setSendingInvitationId(invitationId);
    const message =
      "You have been invited to join an organisation on UnifiedBeez";
    sendInvitation({ email, roleId, message });
  };

  const isSendingInvite = (invitationId: string) => {
    return sendingInvitationId === invitationId && isSendingInvitation;
  };

  return {
    handleSendInvitation,
    isSendingInvite,
  };
};
