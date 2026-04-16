import { ChangeEvent } from "react"
import { TeamMember } from "../../../store/onboarding/types/memberTypes"
import { ApiRole } from "../../../types/api/memberTypes"

export type TeamManagementTab = "invited" | "members"
export type UserActionKey = "sendInvite" | "remove" | "assignRole"
export type AsyncActionStatus = "idle" | "pending" | "success" | "error"

export interface AsyncActionState {
  status: AsyncActionStatus
  message?: string
}

export interface InvitationFailure {
  email: string
  error: string
}

export interface SendInvitationPayload {
  invitationId: string
  email: string
  roleId: number
}

export interface DispatchInvitationPayload {
  invitationId: string
  roleId: number
}

export interface UserInvitePayload extends DispatchInvitationPayload {
  email?: string
}

export interface UserActionStates {
  sendInvite: AsyncActionState
  remove: AsyncActionState
  assignRole: AsyncActionState
}

export interface TeamManagementController {
  activeTab: TeamManagementTab
  emailInput: string
  error: string
  selectedRole: string
  roles: ApiRole[]
  failedInvitations: InvitationFailure[]
  addDraftState: AsyncActionState
  bulkSendState: AsyncActionState
  hasDraftedUsers: boolean
  isLoadingMembers: boolean
  isLoadingInvitations: boolean
  isLoadingRoles: boolean
  membersError: unknown
  invitationsError: unknown
  rolesError: unknown
  handleAddInvite: () => Promise<void>
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleRoleSelect: (role: string) => void
  handleTabClick: (tab: TeamManagementTab) => void
  refetchMembers: () => Promise<unknown>
  refetchInvitations: () => Promise<unknown>
  refetchRoles: () => Promise<unknown>
  handleSendInvitation: (
    payload: SendInvitationPayload | SendInvitationPayload[],
    addOnly?: boolean,
  ) => Promise<void>
  handleSendInviteToAddedEmail: (
    payload: DispatchInvitationPayload | DispatchInvitationPayload[],
  ) => Promise<void>
  isSendingInvite: (invitationId: string) => boolean
  isSendingInviteToAddedEmail: (invitationId: string) => boolean
  isAnySendingInvite: boolean
  getUserActionState: (userId: string) => UserActionStates
  clearUserActionError: (userId: string, action?: UserActionKey) => void
  handleRemoveUser: (
    user: TeamMember,
    type: "invited" | "members",
  ) => Promise<void>
  handleRoleChange: (
    user: TeamMember,
    type: "invited" | "members",
    role: string,
  ) => Promise<void>
  handleToggleSelection: (
    type: "invited" | "members",
    userId: string,
  ) => void
  handleSendDraftInvite: (user: TeamMember) => Promise<void>
  selectAllDraftInvites: () => void
  clearDraftInviteSelection: () => void
  assignRoleToSelectedDrafts: (roleId: number) => void
  sendSelectedDraftInvites: () => Promise<void>
}

export const createIdleAsyncActionState = (): AsyncActionState => ({
  status: "idle",
})

export const createIdleUserActionStates = (): UserActionStates => ({
  sendInvite: createIdleAsyncActionState(),
  remove: createIdleAsyncActionState(),
  assignRole: createIdleAsyncActionState(),
})
