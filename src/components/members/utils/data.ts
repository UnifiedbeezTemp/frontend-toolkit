import { TeamMember } from "../../../store/onboarding/slices/membersSlice";

export const getInitialMembers = (getAvatar: () => string): TeamMember[] => [
  {
    id: "1",
    email: "brian@unifiedbeez.com",
    avatar: getAvatar(),
    role: "owner",
    status: "active",
    isSelected: false,
  },
  {
    id: "2",
    email: "sarah@unifiedbeez.com",
    avatar: getAvatar(),
    role: "admin",
    status: "active",
    isSelected: false,
  },
  {
    id: "3",
    email: "mike@unifiedbeez.com",
    avatar: getAvatar(),
    role: "designer",
    status: "active",
    isSelected: false,
  },
  {
    id: "4",
    email: "emma@unifiedbeez.com",
    avatar: getAvatar(),
    role: "tech",
    status: "active",
    isSelected: false,
  },
  {
    id: "5",
    email: "alex@unifiedbeez.com",
    avatar: getAvatar(),
    role: "admin",
    status: "active",
    isSelected: false,
  },
];

export const getInitialInvitedUsers = (
  getAvatar: () => string
): TeamMember[] => [
  {
    id: "inv-1",
    email: "john@unifiedbeez.com",
    avatar: getAvatar(),
    role: "owner",
    status: "pending",
  },
  {
    id: "inv-2",
    email: "lisa@unifiedbeez.com",
    avatar: getAvatar(),
    role: "admin",
    status: "pending",
  },
  {
    id: "inv-3",
    email: "david@unifiedbeez.com",
    avatar: getAvatar(),
    role: "designer",
    status: "denied",
  },
];

export interface RoleOption {
  label: string;
  value: string;
}

export const roleOptions: RoleOption[] = [
  { label: "Owner", value: "owner" },
  { label: "Admin", value: "admin" },
  { label: "Designer", value: "designer" },
  { label: "Tech", value: "tech" },
];
