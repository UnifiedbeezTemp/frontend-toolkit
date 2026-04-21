import { useEffect } from "react"

import { api, useAppMutation, useAppQuery } from "../../../api"
import { ApiRole } from "../../../types/api/memberTypes"
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux"
import {
  setRoles,
  setSelectedRole,
} from "../../../store/onboarding/slices/membersSlice"
import {
  requestBulkCancelledInvitationDeletion,
  requestCancelledInvitationDeletion,
} from "../utils/cancelledInvitationRequests"

export const useTeamRoles = () => {
  const dispatch = useAppDispatch()
  const { selectedRole } = useAppSelector((state) => state.members)

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    error: rolesError,
    refetch: refetchRoles,
  } = useAppQuery<ApiRole[]>(["roles"], () => api.get("/roles"), {})

  useEffect(() => {
    if (rolesData && rolesData.length > 0) {
      dispatch(setRoles(rolesData))
      if (!selectedRole || selectedRole === "owner") {
        const defaultRole =
          rolesData.find((r) => r.type === "OWNER") ||
          rolesData.find((r) => r.isActive) ||
          rolesData[0]
        if (defaultRole) {
          dispatch(setSelectedRole(defaultRole.type))
        }
      }
    }
  }, [rolesData, dispatch, selectedRole])

  return {
    rolesData,
    isLoadingRoles,
    rolesError,
    refetchRoles,
  }
}

interface UpdateInvitationRolePayload {
  invitationId: string
  roleId: number
}

interface UpdateInvitationRolesBulkPayload {
  invitations: Array<{
    id: string
    roleId: number
  }>
}

export interface UpdateInvitationRolesBulkResponse {
  message?: string
  successful?: Array<{
    id: string
    email: string
    role: string
  }>
  failed?: Array<{
    id?: string
    email: string
    error: string
  }>
  summary?: {
    total?: number
    successful?: number
    failed?: number
  }
}

interface DeleteCancelledInvitationPayload {
  invitationId: string
}

interface DeleteCancelledInvitationsBulkPayload {
  invitationIds: string[]
}

export const useUpdateInvitationRolesBulk = () => {
  return useAppMutation<
    UpdateInvitationRolesBulkPayload,
    UpdateInvitationRolesBulkResponse
  >(
    (payload) =>
      api.patch<
        UpdateInvitationRolesBulkPayload,
        UpdateInvitationRolesBulkResponse
      >(
        "/invitations/bulk/role",
        payload,
      ),
    {},
  )
}
export const useUpdateInvitationRole = () => {
  return useAppMutation<
    UpdateInvitationRolePayload,
    {
      id: string
      email: string
      role: string
      status: string
    }
  >(
    ({ invitationId, roleId }) =>
      api.patch<
        { roleId: number },
        {
          id: string
          email: string
          role: string
          status: string
        }
      >(`/invitations/${invitationId}/role`, { roleId }),
    {},
  )
}

export const useDeleteCancelledInvitation = () => {
  return useAppMutation<DeleteCancelledInvitationPayload, unknown>(
    ({ invitationId }) => requestCancelledInvitationDeletion(invitationId),
    {},
  )
}

export const useDeleteCancelledInvitationsBulk = () => {
  return useAppMutation<DeleteCancelledInvitationsBulkPayload, unknown>(
    ({ invitationIds }) =>
      requestBulkCancelledInvitationDeletion(invitationIds),
    {},
  )
}
