export interface TeamMember {
  id: string;
  email: string;
  avatar: string;
  role: string;
  status: "active" | "pending" | "denied";
  isSelected?: boolean;
}
