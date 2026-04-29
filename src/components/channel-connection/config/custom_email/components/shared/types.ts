import {
  DNSRecords,
  CustomEmailSetupResponse,
} from "../../../../../../services/customEmailService";
import { ChannelConnection } from "../../../../../../types/channelConnectionTypes";

export interface CustomEmailRequirementsProps {
  onConnect: (fromEmail: string) => void;
  isLoading?: boolean;
}

export interface DNSRecordsDisplayProps {
  dnsRecords: DNSRecords;
  instructions?: CustomEmailSetupResponse["instructions"] | null;
  onVerify?: () => void;
  isVerifying?: boolean;
  verificationError?: string;
}

export interface CustomEmailConnectionDetailsProps {
  connection: ChannelConnection;
  onDelete: () => void;
  isDeleting?: boolean;
  variant?: "desktop" | "mobile";
  onVerify?: () => void;
  isVerifying?: boolean;
  verificationError?: string;
}

