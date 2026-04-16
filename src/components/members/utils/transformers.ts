import { TeamMember } from "../../../store/onboarding/types/memberTypes"
import {
  ApiInvitation,
  ApiMember,
  ApiRole,
} from "../../../types/api/memberTypes"
import { generateAvatarFromEmail } from "./avatarUtils"

type InvitationStatus = ApiInvitation["status"]

type PartialInvitationRole = Partial<ApiRole> | string | null | undefined

type PartialApiInvitation = Partial<ApiInvitation> & {
  id?: string | number | null
  invitationId?: string | number | null
  email?: string | null
  role?: PartialInvitationRole
  roleId?: number | null
  status?: InvitationStatus | string | null
  invitation?: Partial<ApiInvitation> & {
    id?: string | number | null
    invitationId?: string | number | null
    email?: string | null
    role?: PartialInvitationRole
    roleId?: number | null
    status?: InvitationStatus | string | null
  }
}

export const transformApiMemberToTeamMember = (
  apiMember: ApiMember,
): TeamMember => {
  const primaryRole = apiMember.isOwner
    ? "OWNER"
    : apiMember.roles[0]?.type || "MEMBER"

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
  }
}

export const transformApiInvitationToTeamMember = (
  apiInvitation: ApiInvitation,
): TeamMember => {
  const transformedInvitation =
    tryTransformApiInvitationToTeamMember(apiInvitation)

  if (!transformedInvitation) {
    throw new Error("Invalid invitation payload")
  }

  return transformedInvitation
}

export const tryTransformApiInvitationToTeamMember = (
  apiInvitation: PartialApiInvitation,
): TeamMember | null => {
  const normalizedInvitation = apiInvitation.invitation
    ? {
        ...apiInvitation,
        ...apiInvitation.invitation,
        role: apiInvitation.invitation.role ?? apiInvitation.role,
      }
    : apiInvitation

  const statusMap: Record<string, TeamMember["status"]> = {
    PENDING: "pending",
    ACCEPTED: "accepted",
    CANCELLED: "cancelled",
    DECLINED: "denied",
    EXPIRED: "expired",
    DRAFT: "draft",
  }
  const invitationId =
    normalizedInvitation.id ?? normalizedInvitation.invitationId

  if (invitationId === null || invitationId === undefined) {
    return null
  }

  if (!normalizedInvitation.email) {
    return null
  }

  const role =
    typeof normalizedInvitation.role === "string"
      ? normalizedInvitation.role
      : normalizedInvitation.role?.type

  return {
    id: String(invitationId),
    email: normalizedInvitation.email,
    avatar: generateAvatarFromEmail(normalizedInvitation.email),
    role: role || "MEMBER",
    roleId:
      typeof normalizedInvitation.roleId === "number"
        ? normalizedInvitation.roleId
        : undefined,
    status: statusMap[normalizedInvitation.status ?? "DRAFT"] || "draft",
    isSelected: false,
  }
}

export const transformApiRolesToOptions = (
  apiRoles: ApiRole[] = [],
): Array<{ label: string; value: string }> => {
  return (apiRoles || [])
    .filter((role) => role.isActive)
    .map((role) => ({
      label: role.name,
      value: role.type,
    }))
    .sort((a, b) => {
      if (a.value === "OWNER") return -1
      if (b.value === "OWNER") return 1
      return a.label.localeCompare(b.label)
    })
}

export const getRoleName = (
  roleType: string,
  apiRoles: ApiRole[] = [],
): string => {
  const role = apiRoles?.find((r) => r.type === roleType)
  return (
    role?.name ||
    roleType.charAt(0).toUpperCase() + roleType.slice(1).toLowerCase()
  )
}
