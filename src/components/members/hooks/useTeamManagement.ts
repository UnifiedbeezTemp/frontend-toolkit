import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  addInvitedUser,
  setEmailInput,
} from "../../../store/onboarding/slices/membersSlice";
import { generateAvatarFromEmail } from "../utils/avatarUtils";
import { useTeamMembers } from "./useTeamMembers";
import { useTeamInvitations } from "./useTeamInvitations";
import { useTeamRoles } from "./useTeamRoles";
import { useSendTeamInvitation } from "./useSendTeamInvitation";

export const useTeamManagement = () => {
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"invited" | "members">("invited");

  const dispatch = useAppDispatch();
  const { emailInput, selectedRole, roles } = useAppSelector(
    (state) => state.members
  );

  const { isLoadingMembers, membersError, refetchMembers } = useTeamMembers();
  const { isLoadingInvitations, invitationsError, refetchInvitations } =
    useTeamInvitations();
  const { isLoadingRoles, rolesError, refetchRoles } = useTeamRoles();
  const { handleSendInvitation, isSendingInvite } = useSendTeamInvitation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddInvite = () => {
    if (!emailInput.trim()) {
      setError("Please enter email addresses");
      return;
    }

    const emails = emailInput
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    if (emails.length === 0) {
      setError("Please enter valid email addresses");
      return;
    }

    const invalidEmails = emails.filter((email) => !validateEmail(email));

    if (invalidEmails.length > 0) {
      setError(`Invalid email addresses: ${invalidEmails.join(", ")}`);
      return;
    }

    const safeRoles = roles || [];
    const defaultRole =
      safeRoles.find((r) => r.type === selectedRole) || safeRoles[0];
    const defaultRoleId = defaultRole?.id || 0;

    emails.forEach((email) => {
      const newUser = {
        id: `draft-${Date.now()}-${Math.random()}`,
        email: email,
        avatar: generateAvatarFromEmail(email),
        role: selectedRole,
        roleId: defaultRoleId,
        status: "draft" as const,
      };
      dispatch(addInvitedUser(newUser));
    });

    dispatch(setEmailInput(""));
    setError("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmailInput(e.target.value));
    if (error) setError("");
  };

  const handleTabClick = (tab: "invited" | "members") => {
    setActiveTab(tab);
  };

  return {
    error,
    activeTab,
    emailInput,
    isLoadingMembers,
    isLoadingInvitations,
    isLoadingRoles,
    membersError,
    invitationsError,
    rolesError,
    handleAddInvite,
    handleEmailChange,
    handleTabClick,
    refetchMembers,
    refetchInvitations,
    refetchRoles,
    handleSendInvitation,
    isSendingInvite,
  };
};
