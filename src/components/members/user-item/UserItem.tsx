"use client"

import { useCallback, useState } from "react"
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase"
import useSession from "../../../providers/hooks/useSession"
import { TeamMember } from "../../../store/onboarding/types/memberTypes"
import { extractErrorMessage } from "../../../utils/extractErrorMessage"
import { useOptionalTeamManagementContext } from "../context/TeamManagementContext"
import { useInlineFeedbackDismiss } from "../hooks/useInlineFeedbackDismiss"
import {
  TeamManagementController,
  UserInvitePayload,
} from "../types/teamManagement"
import DesktopSection from "./DesktopSection"
import { useUserItem } from "./hooks/useUserItem"
import MobileBottomRow from "./MobileBottomRow"
import MobileRoleBadge from "./MobileRoleBadge"
import MobileTopRow from "./MobileTopRow"
import { UserItemProps } from "./types"

interface UserItemWithSendProps extends UserItemProps {
  onSendInvite?: (
    payload: UserInvitePayload | UserInvitePayload[],
  ) => void | Promise<void>
  isSendingInvite?: boolean
}

interface UserItemLayoutProps {
  user: TeamMember
  type: "invited" | "members"
  allowSelection: boolean
  onRoleChange: (role: string) => void
  onRemove: () => void
  onSendInvite?: () => void | Promise<void>
  isSendingInvite?: boolean
  isRemoving?: boolean
  isCanceling?: boolean
  isAssigningRole?: boolean
  onToggle: () => void
  supabaseIcons: { checkbox: string }
  isCurrentUser?: boolean
  isOwner?: boolean
  actionError?: string
  onClearActionError?: () => void
}

const noop = () => {}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "pending":
      return "text-warning border-warning bg-warning/10"
    case "denied":
      return "text-destructive border-destructive bg-destructive/10"
    case "draft":
      return "text-text-primary border-input-stroke bg-border/50"
    default:
      return "text-text-primary border-input-stroke bg-border/50"
  }
}

function UserItemLayout({
  user,
  type,
  allowSelection,
  onRoleChange,
  onRemove,
  onSendInvite,
  isSendingInvite,
  isRemoving,
  isCanceling,
  isAssigningRole,
  onToggle,
  supabaseIcons,
  isCurrentUser,
  isOwner,
  actionError,
  onClearActionError,
}: UserItemLayoutProps) {
  const dismissInlineFeedbackProps = useInlineFeedbackDismiss({
    enabled: Boolean(actionError && onClearActionError),
    onClear: onClearActionError ?? noop,
  })

  return (
    <div
      className="border border-input-stroke p-[0.8rem] rounded-[0.8rem]"
      {...dismissInlineFeedbackProps}
    >
      <div className="lg:hidden flex flex-col gap-[3.2rem]">
        <MobileTopRow
          user={user}
          onToggle={onToggle}
          supabaseIcons={supabaseIcons}
          allowSelection={allowSelection}
        />

        {type === "invited" && user.status !== "draft" && (
          <MobileRoleBadge role={user.role} />
        )}

        <MobileBottomRow
          user={user}
          type={type}
          onRoleChange={onRoleChange}
          onRemove={onRemove}
          onSendInvite={onSendInvite}
          isSendingInvite={isSendingInvite}
          isRemoving={isRemoving}
          isCanceling={isCanceling}
          isAssigningRole={isAssigningRole}
          getStatusStyles={getStatusStyles}
          isCurrentUser={isCurrentUser}
          isOwner={isOwner}
        />
      </div>

      <DesktopSection
        user={user}
        type={type}
        onRoleChange={onRoleChange}
        onRemove={onRemove}
        onSendInvite={onSendInvite}
        isSendingInvite={isSendingInvite}
        isRemoving={isRemoving}
        isCanceling={isCanceling}
        isAssigningRole={isAssigningRole}
        onToggle={onToggle}
        getStatusStyles={getStatusStyles}
        supabaseIcons={supabaseIcons}
        isCurrentUser={isCurrentUser}
        isOwner={isOwner}
        allowSelection={allowSelection}
      />

      {actionError && (
        <p className="mt-[1.2rem] text-[1.3rem] text-destructive">
          {actionError}
        </p>
      )}
    </div>
  )
}

function ManagedUserItem({
  user,
  type,
  onSendInvite,
  isSendingInvite,
  allowSelection = true,
  teamManagement,
}: UserItemWithSendProps & { teamManagement: TeamManagementController }) {
  const supabaseIcons = useSupabaseIcons()
  const { data: currentUser } = useSession()
  const [compatibilityActionError, setCompatibilityActionError] = useState<
    string | undefined
  >()

  const isCurrentUser = user.email === currentUser?.email
  const isOwner = user.role === "OWNER" || user.isOwner
  const userActionState = teamManagement.getUserActionState(user.id)
  const actionError =
    compatibilityActionError ??
    (userActionState.sendInvite.status === "error"
      ? userActionState.sendInvite.message
      : userActionState.assignRole.status === "error"
        ? userActionState.assignRole.message
        : userActionState.remove.status === "error"
          ? userActionState.remove.message
          : undefined)
  const clearActionError = useCallback(() => {
    setCompatibilityActionError(undefined)
    teamManagement.clearUserActionError(user.id)
  }, [teamManagement, user.id])

  const handleRoleChange = useCallback(
    (role: string) => {
      if (isCurrentUser && isOwner) {
        return
      }

      clearActionError()
      void teamManagement.handleRoleChange(user, type, role)
    },
    [clearActionError, isCurrentUser, isOwner, teamManagement, type, user],
  )

  const handleRemove = useCallback(() => {
    if (isCurrentUser) {
      return
    }

    clearActionError()
    void teamManagement.handleRemoveUser(user, type)
  }, [clearActionError, isCurrentUser, teamManagement, type, user])

  const handleToggle = useCallback(() => {
    clearActionError()
    teamManagement.handleToggleSelection(type, user.id)
  }, [clearActionError, teamManagement, type, user.id])

  const handleSendDraftInvite = useCallback(() => {
    clearActionError()

    if (user.status === "cancelled") {
      void teamManagement.handleReAddCancelledInvitation(user)
      return
    }

    if (onSendInvite) {
      const roleId =
        user.roleId ??
        teamManagement.roles.find((role) => role.type === user.role)?.id ??
        0

      if (!roleId) {
        setCompatibilityActionError("Select a role before sending the invite.")
        return
      }

      void Promise.resolve(
        onSendInvite({
          invitationId: user.id,
          email: user.email,
          roleId,
        }),
      ).catch((error) => {
        setCompatibilityActionError(
          extractErrorMessage(error, "Failed to send invitation"),
        )
      })
      return
    }

    void teamManagement.handleSendDraftInvite(user)
  }, [clearActionError, onSendInvite, teamManagement, user])

  return (
    <UserItemLayout
      user={user}
      type={type}
      allowSelection={allowSelection}
      onRoleChange={handleRoleChange}
      onRemove={handleRemove}
      onSendInvite={handleSendDraftInvite}
      isSendingInvite={
        user.status === "cancelled"
          ? userActionState.sendInvite.status === "pending"
          : (isSendingInvite ??
              teamManagement.isSendingInviteToAddedEmail(user.id))
      }
      isRemoving={userActionState.remove.status === "pending"}
      isCanceling={false}
      isAssigningRole={userActionState.assignRole.status === "pending"}
      onToggle={handleToggle}
      supabaseIcons={supabaseIcons}
      isCurrentUser={isCurrentUser}
      isOwner={isOwner}
      actionError={actionError}
      onClearActionError={clearActionError}
    />
  )
}

function LegacyUserItem({
  user,
  type,
  onSendInvite,
  isSendingInvite,
  allowSelection = true,
}: UserItemWithSendProps) {
  const {
    handleRoleChange,
    handleRemove,
    handleToggle,
    handleSendInvite,
    supabaseIcons,
    isCurrentUser,
    isOwner,
    isRemoving,
    isCanceling,
    isReAddingCancelledInvitation,
    isAssigningRole,
    actionError,
    clearActionError,
  } = useUserItem(type, user.id, onSendInvite, user)

  return (
    <UserItemLayout
      user={user}
      type={type}
      allowSelection={allowSelection}
      onRoleChange={handleRoleChange}
      onRemove={handleRemove}
      onSendInvite={handleSendInvite}
      isSendingInvite={
        user.status === "cancelled"
          ? isReAddingCancelledInvitation
          : isSendingInvite
      }
      isRemoving={isRemoving}
      isCanceling={isCanceling}
      isAssigningRole={isAssigningRole}
      onToggle={handleToggle}
      supabaseIcons={supabaseIcons}
      isCurrentUser={isCurrentUser}
      isOwner={isOwner}
      actionError={actionError}
      onClearActionError={clearActionError}
    />
  )
}

export default function UserItem(props: UserItemWithSendProps) {
  const teamManagement = useOptionalTeamManagementContext()

  if (teamManagement) {
    return <ManagedUserItem {...props} teamManagement={teamManagement} />
  }

  return <LegacyUserItem {...props} />
}
