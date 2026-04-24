export interface OutlookRequirementsProps {
  onConnect: () => void;
  isLoading?: boolean;
}

export interface OutlookConnectionDetailsProps {
  connection: import("../../../../../../types/channelConnectionTypes").ChannelConnection;
  onDelete: () => void;
  isDeleting?: boolean;
  variant?: "desktop" | "mobile";
}
