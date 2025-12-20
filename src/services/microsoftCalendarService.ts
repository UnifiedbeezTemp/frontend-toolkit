import { apiBaseUrl } from "../api/rootUrls";

export const initiateMicrosoftCalendarAuth = (): void => {
  const authUrl = `${apiBaseUrl}/channels/calendar/microsoft/auth`;
  window.open(authUrl, "_blank", "noopener,noreferrer,width=600,height=700");
};

