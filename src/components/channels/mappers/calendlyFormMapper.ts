import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface CalendlyAccount {
  id: number;
  connectedChannelId: number;
  calendlyUserUri: string;
  calendlyOrganizationUri: string | null;
  email: string;
  displayName: string;
  timezone: string;
  avatarUrl: string | null;
  currentPlan: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const mapCalendlyAccountToFormData = (
  account: CalendlyAccount,
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.displayName || account.email || "Calendly Account",
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    configuration: {
      calendlyUserUri: account.calendlyUserUri,
      calendlyOrganizationUri: account.calendlyOrganizationUri,
      email: account.email,
      displayName: account.displayName,
      timezone: account.timezone,
      avatarUrl: account.avatarUrl,
      currentPlan: account.currentPlan,
    },
  };
};
