import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import {
  addInvitedUser,
  setEmailInput,
  setSelectedRole,
} from "../../../store/onboarding/slices/membersSlice";
import { generateAvatarFromEmail } from "../utils/avatarUtils";
import { useTeamMembers } from "./useTeamMembers";
import { useTeamInvitations } from "./useTeamInvitations";
import { useTeamRoles } from "./useTeamRoles";
import { useSendTeamInvitation } from "./useSendTeamInvitation";
import useSession from "../../../providers/hooks/useSession";

export const useTeamManagement = () => {
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"invited" | "members">("invited");
  const [failedInvitations, setFailedInvitations] = useState<
    Array<{ email: string; error: string }>
  >([]);

  const dispatch = useAppDispatch();
  const { data: currentUser } = useSession();
  const { invitedUsers, emailInput, selectedRole, roles } = useAppSelector(
    (state) => state.members,
  );

  const hasDraftedUsers = invitedUsers.some((u) => u.status === "draft");

  const { isLoadingMembers, membersError, refetchMembers } = useTeamMembers();
  const { isLoadingInvitations, invitationsError, refetchInvitations } =
    useTeamInvitations();
  const { isLoadingRoles, rolesError, refetchRoles } = useTeamRoles();
  const { handleSendInvitation, isSendingInvite, isAnySendingInvite } =
    useSendTeamInvitation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddInvite = () => {
    if (!emailInput.trim()) {
      setError("Please enter email addresses");
      return;
    }

    let emails = emailInput
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

    // Prevent inviting self
    const selfInvites = emails.filter(
      (email) => email.toLowerCase() === currentUser?.email?.toLowerCase(),
    );
    if (selfInvites.length > 0) {
      setError("You cannot invite yourself");
      emails = emails.filter(
        (email) => email.toLowerCase() !== currentUser?.email?.toLowerCase(),
      );
    }

    if (emails.length === 0) return;

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
    if (selfInvites.length === 0) setError("");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmailInput(e.target.value));
    if (error) setError("");
  };

  const handleRoleSelect = (role: string) => {
    dispatch(setSelectedRole(role));
  };

  const handleTabClick = (tab: "invited" | "members") => {
    setActiveTab(tab);
  };

  const handleFailedInvitationsChange = useCallback(
    (failures: Array<{ email: string; error: string }>) => {
      setFailedInvitations(failures);
    },
    [],
  );

  useEffect(() => {
    if (failedInvitations.length > 0) {
      const timer = setTimeout(() => {
        setFailedInvitations([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [failedInvitations]);

  return {
    error,
    activeTab,
    emailInput,
    selectedRole,
    hasDraftedUsers,
    isLoadingMembers,
    isLoadingInvitations,
    isLoadingRoles,
    membersError,
    invitationsError,
    rolesError,
    handleAddInvite,
    handleEmailChange,
    handleRoleSelect,
    handleTabClick,
    refetchMembers,
    refetchInvitations,
    refetchRoles,
    handleSendInvitation,
    isSendingInvite,
    isAnySendingInvite,
    failedInvitations,
    handleFailedInvitationsChange,
  };
};
