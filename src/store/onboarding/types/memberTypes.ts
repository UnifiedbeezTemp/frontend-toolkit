export interface TeamMember {
  id: string;
  email: string;
  avatar: string;
  role: string;
  roleId?: number; 
  status: "active" | "pending" | "denied" | "accepted" | "rejected" | "expired" | "draft";
  isSelected?: boolean;
  fullName?: string;
  phone?: string;
  isOwner?: boolean;
  joinedAt?: string;
  lastLoginAt?: string;
}
