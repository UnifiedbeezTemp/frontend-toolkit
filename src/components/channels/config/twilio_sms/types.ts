import { ChannelConnection } from "../../../../types/channelConnectionTypes";
import { BaseChannelConfigProps } from "../BaseChannelConfig";

export interface TwilioPhoneNumber {
  phoneNumber: string;
  friendlyName: string;
  locality?: string;
  region?: string;
  capabilities?: {
    sms: boolean;
    voice: boolean;
    mms?: boolean;
  };
}

export interface TwilioSmsAccount {
  id: number;
  connectedChannelId: number;
  phoneNumber: string;
  twilioSid: string;
  isActive: boolean;
  monthlyPriceEur: number;
  createdAt: string;
  updatedAt: string;
  verificationStatus: string;
  verifiedAt: string | null;
  verificationAttempts: number;
  verificationError: string | null;
}

export interface TwilioPurchaseRequest {
  phoneNumber: string;
  countryCode?: string;
  capabilities?: {
    sms: boolean;
    voice: boolean;
  };
}

export interface TwilioPurchaseResponse {
  success: boolean;
  number: {
    sid: string;
    phoneNumber: string;
    friendlyName: string;
    capabilities: {
      sms: boolean;
      voice: boolean;
      mms: boolean;
    };
  };
  billing: {
    monthlyPrice: number;
    nextBilling: string;
  };
}

export type NumberType = "local" | "mobile" | "tollFree" | "all";

export interface SearchParams {
  countryCode: string;
  numberType: NumberType;
  areaCode?: string;
  limit?: number;
}

export interface AvailableNumbersResponse {
  numbers: TwilioPhoneNumber[];
  countryCode: string;
  requestedType: string;
  totalFound: number;
  errors?: Array<{ type: string; error: string }>;
}

export interface TwilioSmsConfigProps extends BaseChannelConfigProps {
  onRefetchChannels?: () => Promise<void> | void;
}

export interface TwilioSmsSetupProps {
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
  areaCode: string;
  onAreaCodeChange: (code: string) => void;
  numberType: NumberType;
  onNumberTypeChange: (type: NumberType) => void;
  availableNumbers: TwilioPhoneNumber[];
  onSearch: () => void;
  onPurchase: (phoneNumber: string) => void;
  isSearching: boolean;
  purchasingPhoneNumber: string | null;
  onClose?: () => void;
}

export interface TwilioSmsConnectionDetailsProps {
  connection: ChannelConnection;
  onDelete: () => void;
  isDeleting?: boolean;
  variant?: "desktop" | "mobile";
}

export interface CountrySelectorProps {
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
}

export interface NumberTypeSelectorProps {
  numberType: NumberType;
  onNumberTypeChange: (type: NumberType) => void;
}

export interface AreaCodeInputProps {
  areaCode: string;
  onAreaCodeChange: (code: string) => void;
}

export interface AvailableNumberItemProps {
  number: TwilioPhoneNumber;
  flag: string;
  onPurchase: (phoneNumber: string) => void;
  isPurchasing: boolean;
}

export interface AvailableNumbersListProps {
  numbers: TwilioPhoneNumber[];
  countryFlag: string;
  onPurchase: (phoneNumber: string) => void;
  purchasingPhoneNumber: string | null;
}

export interface UseTwilioSmsHandlersProps {
  connection?: ChannelConnection | null;
  onSave: (data: Record<string, unknown>) => void;
  onRefetchChannels?: () => Promise<void> | void;
  onClose?: () => void;
}
