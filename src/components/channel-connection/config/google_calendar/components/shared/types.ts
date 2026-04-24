import { ChannelConnection } from "../../../../../types/channelConnectionTypes";

export interface GoogleCalendarConnectionDetailsProps {
  connection: ChannelConnection;
  onDelete: () => void;
  isDeleting?: boolean;
  variant?: "desktop" | "mobile";
}
