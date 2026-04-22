import { useCallback } from "react"
import Link from "next/link"
import useSession from "../../providers/hooks/useSession"
import { useAppSelector } from "../../store/hooks/useRedux"
import { selectTotalMembers } from "../../store/onboarding/slices/membersSlice"
import Input from "../forms/Input"
import Button from "../ui/Button"
import Text from "../ui/Text"
import { useOptionalTeamManagementContext } from "./context/TeamManagementContext"
import { useInlineFeedbackDismiss } from "./hooks/useInlineFeedbackDismiss"
import {
  createIdleAsyncActionState,
  InvitationFailure,
} from "./types/teamManagement"
import Tooltip from "../ui/Tooltip"

interface InviteSectionProps {
  emailInput?: string
  error?: string
  onEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAddInvite?: () => void | Promise<void>
  failedInvitations?: InvitationFailure[]
  isSending?: boolean
  isAddingBlocked?: boolean
  reasonForBlockedAdding?: string
}

export const InviteSection = ({
  emailInput,
  error,
  onEmailChange,
  onAddInvite,
  failedInvitations = [],
  isSending,
  isAddingBlocked,
  reasonForBlockedAdding,
}: InviteSectionProps) => {
  const teamManagement = useOptionalTeamManagementContext()
  const { data } = useSession()
  const totalMembers = useAppSelector(selectTotalMembers)
  const maxSeats = data?.planFeatures?.maxSeats
  const isUnlimited = maxSeats === null
  const seatsLeft = isUnlimited
    ? "Unlimited"
    : Math.max(0, (maxSeats || 0) - totalMembers)
  const addDraftState =
    teamManagement?.addDraftState ?? createIdleAsyncActionState()
  const resolvedEmailInput = teamManagement?.emailInput ?? emailInput ?? ""
  const resolvedError = teamManagement?.error ?? error ?? ""
  const resolvedOnEmailChange =
    teamManagement?.handleEmailChange ?? onEmailChange ?? (() => {})
  const resolvedOnAddInvite =
    teamManagement?.handleAddInvite ?? onAddInvite ?? (() => {})
  const resolvedFailedInvitations =
    teamManagement?.failedInvitations ?? failedInvitations
  const resolvedIsSending =
    teamManagement?.addDraftState.status === "pending" || isSending || false
  const clearInlineFeedback = useCallback(() => {
    teamManagement?.clearInlineStatuses()
  }, [teamManagement])
  const hasInlineFeedback = Boolean(
    resolvedError ||
    (addDraftState.status !== "idle" && addDraftState.message) ||
    resolvedFailedInvitations.length > 0,
  )
  const dismissInlineFeedbackProps = useInlineFeedbackDismiss({
    enabled: Boolean(teamManagement) && hasInlineFeedback,
    onClear: clearInlineFeedback,
  })
  const feedbackClassName =
    addDraftState.status === "error"
      ? "text-destructive"
      : addDraftState.status === "success"
        ? "text-brand-primary"
        : "text-secondary"

  return (
    <div
      className="mt-[4rem] sm:mt-[3rem] lg:mt-[2.4rem] w-full"
      {...dismissInlineFeedbackProps}
    >
      <Tooltip
        content={isAddingBlocked && reasonForBlockedAdding}
        containerClassNames="w-full"
        position="top"
      >
        <div className="flex items-center gap-[1rem] mb-[0.8rem] w-full">
          <Input
            value={resolvedEmailInput}
            onChange={resolvedOnEmailChange}
            disabled={isAddingBlocked || resolvedIsSending}
            placeholder="Emails, comma separated"
            type="text"
            className="w-full text-[1.4rem] lg:text-[1.6rem]"
          />

          <Button
            className="w-[10rem] font-[700] text-[1.6rem] rounded-[0.8rem] lg:min-w-[12.8rem]"
            onClick={resolvedOnAddInvite}
            disabled={isAddingBlocked || resolvedIsSending}
            loading={resolvedIsSending}
          >
            Add
          </Button>
        </div>
      </Tooltip>

      {resolvedError && (
        <p className="text-destructive text-[14px] mt-2">{resolvedError}</p>
      )}

      {!resolvedError &&
        addDraftState.status !== "idle" &&
        addDraftState.message && (
          <p className={`text-[14px] mt-2 ${feedbackClassName}`}>
            {addDraftState.message}
          </p>
        )}

      {resolvedFailedInvitations.length > 0 && (
        <div className="mt-2 space-y-1">
          {resolvedFailedInvitations.map((failed, index) => (
            <p key={index} className="text-destructive text-[14px]">
              <span className="font-bold">{failed.email}:</span> {failed.error}
            </p>
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-[0.3rem] mt-[0.4rem] sm:mt-[2.4rem] lg:mt-[0.8rem] leading-[2.07rem]">
        <Text size="sm" className="font-[700] inline">
          {seatsLeft} seats left.
        </Text>{" "}
        <div className="flex">
          <div className="text-secondary text-[14px]">
            Need more seats?{" "}
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE}/addons`}
              className="text-brand-primary text-[14px] font-[700] underline"
            >
              Add seats from the pricing tab
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
