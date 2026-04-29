import { useState } from "react"
import { useAppDispatch } from "../../../store/hooks/useRedux"
import { store } from "../../../store"
import {
  updateInvitedUserRoleId,
  markInvitationAsSent,
  setInvitedUsers,
} from "../../../store/onboarding/slices/membersSlice"
import { api, useAppMutation } from "../../../api"
import { ApiInvitation } from "../../../types/api/memberTypes"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "../../../components/ui/toast/useToast"
import { transformApiInvitationToTeamMember } from "../utils/transformers"

export const useSendTeamInvitation = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const { showToast } = useToast()
  const [sendingInvitationId, setSendingInvitationId] = useState<string | null>(
    null,
  )
  const {
    mutate: sendInviteToAddedEmail,
    isPending: isSendingInviteToAddedEmail,
  } = useAppMutation<
    {
      invitations: {
        invitationId: string
        roleId: number
      }[]
    },
    {
      message: string
      dispatched: ApiInvitation[]
      failed: ApiInvitation[]
      missing: ApiInvitation[]
      summary: {
        requested: number
        found: number
        missing: number
        dispatched: number
        failed: number
      }
    }
  >(
    async ({ ...payload }) => {
      return await api.post<
        {
          invitations: {
            invitationId: string
            roleId: number
          }[]
        },
        {
          message: string
          dispatched: ApiInvitation[]
          failed: ApiInvitation[]
          missing: ApiInvitation[]
          summary: {
            requested: number
            found: number
            missing: number
            dispatched: number
            failed: number
          }
        }
      >("/invitations/dispatch", payload)
    },
    {
      onSuccess: (data) => {
        const transformedInvitations =
          data?.dispatched?.map((item) =>
            transformApiInvitationToTeamMember(item),
          ) || []
        dispatch(setInvitedUsers([...transformedInvitations]))
        if (data.dispatched.length) {
          const successMessage = data.message
            ? data.message
            : `Failed to invite some team members`
          showToast({
            title: successMessage,
            description: `Failed to send invites to: ${transformedInvitations.map((item) => item.email).join(", ")}`,
            variant: "success",
          })
        }
        if (data.failed.length)
          showToast({
            title: data.message || "Failed to add some emails",
            description: `Failed to invite these team members: ${data.failed.map((item) => item.email).join(", ")}. Are they already part of your team?`,
            variant: "error",
          })
        if (data.missing.length)
          showToast({
            title: data.message || "Failed to add some emails",
            description: `Failed to invite these team members: ${data.failed.map((item) => item.email).join(", ")}. They were not found."`,
            variant: "error",
          })

        queryClient.invalidateQueries({ queryKey: ["invitations"] })
        queryClient.invalidateQueries({ queryKey: ["members"] })
      },
      onError: (error: unknown) => {
        let description = "An unknown error occurred"
        if (
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message?: unknown }).message === "object" &&
          (error as { message?: { message?: unknown } }).message !== null &&
          "message" in (error as { message: { message?: unknown } }).message &&
          typeof (
            (error as { message: { message?: unknown } }).message as {
              message?: unknown
            }
          ).message === "string"
        ) {
          description = (error as { message: { message: string } }).message
            .message
        }

        showToast({
          title: "Failed to send invitation",
          description,
          variant: "error",
        })

        setSendingInvitationId(null)
      },
    },
  )
  const { mutate: sendBulkInvitation, isPending: isSendingBulkInvitation } =
    useAppMutation<
      { email: string; roleId?: number; message?: string; addOnly?: boolean }[],
      {
        message: string
        successful: ApiInvitation[]
        failed: ApiInvitation[]
        summary: {
          total: number
          successful: number
          failed: number
        }
      }
    >(
      async (payload) => {
        return await api.post<
          {
            invitations: { email: string; roleId?: number; message?: string }[]
          },
          {
            message: string
            successful: ApiInvitation[]
            failed: ApiInvitation[]
            summary: {
              total: number
              successful: number
              failed: number
            }
          }
        >(
          `/invitations/bulk` +
            (payload.some((item) => item.addOnly) ? "?addOnly=true" : ""),
          {
            invitations: payload.map((item) => ({
              ...item,
              addOnly: undefined,
            })),
          },
        )
      },
      {
        onSuccess: (data, variables) => {
          const isAddOnly = variables.some((item) => item.addOnly === true)
          const transformedInvitations =
            data?.successful?.map((item) =>
              transformApiInvitationToTeamMember(item),
            ) || []
          dispatch(setInvitedUsers([...transformedInvitations]))
          if (data.successful.length) {
            const successMessage = data.message
              ? data.message
              : `Successfully ${isAddOnly ? "added" : "invited"} your team members`
            showToast({
              title: successMessage,
              description: `${isAddOnly ? "Added" : "Invited"} ${transformedInvitations.map((item) => item.email).join(", ")}`,
              variant: "success",
            })
          }
          if (data.failed.length)
            showToast({
              title: data.message || "Failed to add some emails",
              description: `Already ${isAddOnly ? "added" : "invited"} ${data.failed.map((item) => item.email).join(", ")}.\n ${isAddOnly && "Did you mean to invite them?"}`,
              variant: "error",
            })

          setSendingInvitationId(null)
          queryClient.invalidateQueries({ queryKey: ["invitations"] })
          queryClient.invalidateQueries({ queryKey: ["members"] })
        },
        onError: (error: unknown) => {
          let description = "An unknown error occurred"
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
                message?: unknown
              }
            ).message === "string"
          ) {
            description = (error as { message: { message: string } }).message
              .message
          }

          showToast({
            title: "Failed to send invitation",
            description,
            variant: "error",
          })

          setSendingInvitationId(null)
        },
      },
    )

  const { mutate: sendInvitation, isPending: isSendingInvitation } =
    useAppMutation<
      { email: string; roleId?: number; message?: string; addOnly?: boolean },
      ApiInvitation
    >(
      async ({ addOnly, ...payload }) => {
        return await api.post<
          { email: string; roleId?: number; message?: string },
          ApiInvitation
        >(`/invitations` + (addOnly ? "?addOnly=true" : ""), payload)
      },
      {
        onSuccess: (data, variables) => {
          const currentState = store.getState()
          const draftInvitation = currentState.members.invitedUsers.find(
            (u) => u.email === variables.email && u.status === "draft",
          )

          const apiInvitationIdRaw =
            (data as { invitation?: { id?: string | number } }).invitation
              ?.id ??
            (data as { id?: string | number }).id ??
            null
          const apiInvitationId =
            typeof apiInvitationIdRaw === "string" ||
            typeof apiInvitationIdRaw === "number"
              ? apiInvitationIdRaw
              : null

          const apiRoleIdRaw =
            (data as { invitation?: { roleId?: number } }).invitation?.roleId ??
            (data as { roleId?: number }).roleId ??
            variables.roleId
          const apiRoleId =
            typeof apiRoleIdRaw === "number" && Number.isFinite(apiRoleIdRaw)
              ? apiRoleIdRaw
              : null

          if (draftInvitation && apiInvitationId !== null) {
            dispatch(
              markInvitationAsSent({
                id: draftInvitation.id,
                apiInvitationId,
              }),
            )

            if (apiRoleId !== null) {
              dispatch(
                updateInvitedUserRoleId({
                  id: String(apiInvitationId),
                  roleId: apiRoleId,
                }),
              )
            }
          }

          const successMessage =
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof (data as { message?: unknown }).message === "string"
              ? (data as { message: string }).message
              : "Invitation sent successfully"

          showToast({
            title: successMessage,
            description: `Invited ${variables.email}`,
            variant: "success",
          })

          setSendingInvitationId(null)
          queryClient.invalidateQueries({ queryKey: ["invitations"] })
          queryClient.invalidateQueries({ queryKey: ["members"] })
        },
        onError: (error: unknown) => {
          let description = "An unknown error occurred"
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
                message?: unknown
              }
            ).message === "string"
          ) {
            description = (error as { message: { message: string } }).message
              .message
          }

          showToast({
            title: "Failed to send invitation",
            description,
            variant: "error",
          })

          setSendingInvitationId(null)
        },
      },
    )

  const handleSendInvitation = (
    payload:
      | {
          invitationId: string
          email: string
          roleId: number
        }[]
      | {
          invitationId: string
          email: string
          roleId: number
        },
    addOnly?: boolean,
  ) => {
    const message = addOnly
      ? undefined
      : "You have been invited to join an organisation on UnifiedBeez"
    if (Array.isArray(payload)) {
      sendBulkInvitation(
        payload.map((item) => ({
          email: item.email,
          roleId: item.roleId,
          message,
          addOnly,
        })),
      )
    } else {
      setSendingInvitationId(payload.invitationId)
      sendInvitation({
        email: payload.email,
        roleId: payload.roleId,
        message: addOnly ? undefined : message,
        addOnly,
      })
    }
  }

  const isSendingInvite = (invitationId: string) => {
    return sendingInvitationId === invitationId && isSendingInvitation
  }
  const handleSendInviteToAddedEmail = (
    payload:
      | {
          invitationId: string
          roleId: number
        }[]
      | {
          invitationId: string
          roleId: number
        },
  ) => {
    console.log("meaejrka;sdf", payload)
    if (Array.isArray(payload)) {
      sendInviteToAddedEmail({
        invitations: payload.map((item) => ({
          roleId: item.roleId,
          invitationId: item.invitationId,
        })),
      })
    } else {
      sendInviteToAddedEmail({
        invitations: [
          {
            roleId: payload.roleId,
            invitationId: payload.invitationId,
          },
        ],
      })
    }
  }

  return {
    handleSendInvitation,
    isSendingBulkInvitation,
    isSendingInvite,
    isAnySendingInvite: isSendingInvitation || isSendingBulkInvitation,
    handleSendInviteToAddedEmail,
    x: true,
    isSendingInviteToAddedEmail,
  }
}
