export interface ApiMember {
  id: number
  email: string
  fullName: string
  phone: string
  isOwner: boolean
  roles: ApiMemberRole[]
  joinedAt: string
  lastLoginAt: string
  isActive: boolean
}

export interface ApiMemberRole {
  id: number
  name: string
  type: string
}

export interface ApiRole {
  id: number
  name: string
  type: string
  description: string
  isDefault: boolean
  isActive: boolean
  createdBy: number | null
  organizationId: number
  createdAt: string
  updatedAt: string
  permissions: ApiRolePermission[]
  _count: {
    userRoles: number
  }
}

export interface ApiRolePermission {
  id: number
  roleId: number
  permissionId: number
  permission: {
    id: number
    action: string
    resource: string
    description: string
  }
}

export interface ApiInvitation {
  id: number
  email: string
  roleId: number
  role?: ApiRole
  status:
    | "PENDING"
    | "ACCEPTED"
    | "CANCELLED"
    | "DECLINED"
    | "EXPIRED"
    | "DRAFT"
  invitedBy: number
  invitedAt: string
  expiresAt: string
  organizationId: number
}
