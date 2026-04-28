import { ChannelConnection } from "../../../../../../types/channelConnectionTypes";

export interface GmailConnectionDetailsProps {
  connection: ChannelConnection;
  onDelete: () => void;
  isDeleting?: boolean;
  variant?: "desktop" | "mobile";
}


