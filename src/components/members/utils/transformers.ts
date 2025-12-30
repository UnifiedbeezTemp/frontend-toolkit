import { TeamMember } from "../../../store/onboarding/types/memberTypes";
import {
  ApiInvitation,
  ApiMember,
  ApiRole,
} from "../../../types/api/memberTypes";
import { generateAvatarFromEmail } from "./avatarUtils";

export const transformApiMemberToTeamMember = (
  apiMember: ApiMember
): TeamMember => {
  const primaryRole = apiMember.isOwner
    ? "OWNER"
    : apiMember.roles[0]?.type || "MEMBER";

  return {
    id: apiMember.id.toString(),
    email: apiMember.email,
    avatar: generateAvatarFromEmail(apiMember.email),
    role: primaryRole || "MEMBER",
    roleId: apiMember.roles[0]?.id,
    status: "active",
    isSelected: false,
    fullName: apiMember.fullName,
    phone: apiMember.phone,
    isOwner: apiMember.isOwner,
    joinedAt: apiMember.joinedAt,
    lastLoginAt: apiMember.lastLoginAt,
  };
};

export const transformApiInvitationToTeamMember = (
  apiInvitation: ApiInvitation
): TeamMember => {
  const statusMap: Record<string, TeamMember["status"]> = {
    pending: "pending",
    accepted: "accepted",
    rejected: "denied",
    expired: "expired",
  };

  return {
    id: apiInvitation.id.toString(),
    email: apiInvitation.email,
    avatar: generateAvatarFromEmail(apiInvitation.email),
    role: apiInvitation.role?.type || "MEMBER",
    roleId: apiInvitation.roleId,
    status: statusMap[apiInvitation.status] || "pending",
    isSelected: false,
  };
};

export const transformApiRolesToOptions = (
  apiRoles: ApiRole[] = []
): Array<{ label: string; value: string }> => {
  return (apiRoles || [])
    .filter((role) => role.isActive)
    .map((role) => ({
      label: role.name,
      value: role.type,
    }))
    .sort((a, b) => {
      if (a.value === "OWNER") return -1;
      if (b.value === "OWNER") return 1;
      return a.label.localeCompare(b.label);
    });
};

export const getRoleName = (
  roleType: string,
  apiRoles: ApiRole[] = []
): string => {
  const role = apiRoles?.find((r) => r.type === roleType);
  return (
    role?.name ||
    roleType.charAt(0).toUpperCase() + roleType.slice(1).toLowerCase()
  );
};
