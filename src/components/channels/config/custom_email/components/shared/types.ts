export interface CustomEmailRequirementsProps {
  onConnect: (domain: string) => void;
  isLoading?: boolean;
}

export interface DNSRecordsDisplayProps {
  dnsRecords: Array<{
    type: string;
    name: string;
    value: string;
    priority?: number;
  }>;
}

export interface CustomEmailConnectionDetailsProps {
  connection: import("../../../../../types/channelConnectionTypes").ChannelConnection;
  onDelete: () => void;
  isDeleting?: boolean;
  variant?: "desktop" | "mobile";
}

