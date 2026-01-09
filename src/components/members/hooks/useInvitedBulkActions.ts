"use client";

import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  setInvitedSelection,
  updateInvitedUserRoleBulk,
  markInvitationsPendingBulk,
  selectFilteredInvitedUsers,
  selectSelectedInvitedUsers,
} from "../../../store/onboarding/slices/membersSlice";
import { api } from "../../../api";
import { ApiRole } from "../../../types/api/memberTypes";
import { useToast } from "../../ui/toast/ToastProvider";
import { useQueryClient } from "@tanstack/react-query";

interface BulkInvitationResponse {
  message: string;
  successful: Array<{
    email: string;
    role: string;
    expiresAt: string;
    userId: number;
  }>;
  failed: Array<{
    email: string;
    error: string;
  }>;
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

interface UseInvitedBulkActionsParams {
  roles: ApiRole[];
  enable: boolean;
}

export function useInvitedBulkActions({
  roles,
  enable,
}: UseInvitedBulkActionsParams) {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const invited = useAppSelector(selectFilteredInvitedUsers);
  const selectedInvited = useAppSelector(selectSelectedInvitedUsers);
  const [isSending, setIsSending] = useState(false);
  const [failedInvitations, setFailedInvitations] = useState<
    Array<{ email: string; error: string }>
  >([]);

  const defaultRole = roles.find((r) => r.isDefault) ?? roles[0];

  const selectAll = useCallback(() => {
    if (!enable) return;
    dispatch(
      setInvitedSelection({ ids: invited.map((u) => u.id), selected: true })
    );
  }, [dispatch, invited, enable]);

  const clearSelection = useCallback(() => {
    if (!enable) return;
    dispatch(
      setInvitedSelection({ ids: invited.map((u) => u.id), selected: false })
    );
  }, [dispatch, invited, enable]);

  const assignRole = useCallback(
    (roleId: number) => {
      if (!enable) return;
      const role = roles.find((r) => r.id === roleId) ?? defaultRole;
      if (!role) return;
      if (selectedInvited.length === 0) return;
      dispatch(
        updateInvitedUserRoleBulk({
          ids: selectedInvited.map((u) => u.id),
          role: role.type,
          roleId: role.id,
        })
      );
    },
    [dispatch, selectedInvited, roles, defaultRole, enable]
  );

  const bulkSend = useCallback(async () => {
    if (!enable || selectedInvited.length === 0 || isSending) return;
    try {
      setIsSending(true);
      setFailedInvitations([]);

      const invitations = selectedInvited.map((inv) => {
        const roleId = inv.roleId ?? defaultRole?.id ?? roles[0]?.id ?? 0;
        return { email: inv.email, roleId };
      });

      const response = await api.post<
        { invitations: Array<{ email: string; roleId: number }> },
        BulkInvitationResponse
      >("/invitations/bulk", { invitations });

      if (response.failed && response.failed.length > 0) {
        setFailedInvitations(response.failed);
      }

      const successfulEmails = response.successful.map((s) => s.email);
      const successfulInvitationIds = selectedInvited
        .filter((inv) => successfulEmails.includes(inv.email))
        .map((inv) => inv.id);

      if (successfulInvitationIds.length > 0) {
        dispatch(markInvitationsPendingBulk({ ids: successfulInvitationIds }));
      }

      await queryClient.invalidateQueries({ queryKey: ["invitations"] });

      if (response.summary.failed > 0) {
        showToast({
          title: response.message,
          description: `${response.summary.successful} sent, ${response.summary.failed} failed`,
          variant: "warning",
        });
      } else {
        showToast({
          title: "Invitations sent",
          description: `${response.summary.successful} invite(s) moved to pending.`,
          variant: "success",
        });
      }
    } catch (error) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
          ? (error as { message: string }).message
          : "Failed to send bulk invitations";
      let errorDescription: string = message;
      if (typeof error === "object" && error !== null && "message" in error) {
        const errWithMessage = error as { message?: unknown };
        if (
          typeof errWithMessage.message === "object" &&
          errWithMessage.message !== null &&
          "message" in errWithMessage.message &&
          typeof (errWithMessage.message as { message?: unknown }).message ===
            "string"
        ) {
          errorDescription = (errWithMessage.message as { message: string })
            .message;
        } else if (typeof errWithMessage.message === "string") {
          errorDescription = errWithMessage.message;
        }
      }
      showToast({
        title: "Error",
        description: errorDescription,
        variant: "error",
      });
    } finally {
      setIsSending(false);
    }
  }, [
    selectedInvited,
    defaultRole,
    dispatch,
    showToast,
    queryClient,
    enable,
    isSending,
    roles,
  ]);

  return {
    invited,
    selectedInvited,
    selectAll,
    clearSelection,
    assignRole,
    bulkSend,
    defaultRoleId: defaultRole?.id ?? 0,
    isSending,
    failedInvitations,
  };
}
