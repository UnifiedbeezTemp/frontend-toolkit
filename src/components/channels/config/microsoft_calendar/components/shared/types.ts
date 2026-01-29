export interface MicrosoftCalendarRequirementsProps {
  onConnect: () => void;
  isLoading?: boolean;
}

export interface MicrosoftCalendarConnectionDetailsProps {
  connection: import("../../../../../../types/channelConnectionTypes").ChannelConnection;
  onDelete: () => void;
  isDeleting?: boolean;
  variant?: "desktop" | "mobile";
}

