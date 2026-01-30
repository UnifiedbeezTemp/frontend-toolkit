import { ChannelConnection } from "../../../types/channelConnectionTypes";

export interface WhatsAppAccount {
  id: number;
  connectedChannelId: number;
  phoneNumberId: string;
  wabaId: string;
  businessId: string;
  displayPhoneNumber: string;
  verifiedName: string;
  businessName: string;
  accessToken: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

export const mapWhatsAppAccountToFormData = (
  account: WhatsAppAccount
): ChannelConnection => {
  return {
    id: String(account.id),
    channelId: String(account.connectedChannelId),
    name: account.businessName || account.verifiedName || account.displayPhoneNumber,
    configuration: {
      // Team-Only Name (internal use) - map to businessName
      internalName: account.businessName || "",
      // Chat Name (shown to users) - map to verifiedName
      displayName: account.verifiedName || account.businessName || "",
      // Phone number
      phoneNumber: account.displayPhoneNumber || "",
      // Description - empty by default, can be filled by user
      description: "",
      // Info - use verifiedName as short description
      info: account.verifiedName || "",
      // Additional WhatsApp-specific fields
      phoneNumberId: account.phoneNumberId,
      wabaId: account.wabaId,
      businessId: account.businessId,
      accessToken: account.accessToken,
      verificationStatus: account.verificationStatus,
      connectedChannelId: account.connectedChannelId,
      verifiedAt: account.verifiedAt,
      verificationAttempts: account.verificationAttempts,
      verificationError: account.verificationError,
      whatsappAccountId: account.id,
      readConfirmation: false, // Default to false, can be updated if available
      profileImageUrl: null, // Profile image not used
    },
    isActive: account.isActive,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
};

