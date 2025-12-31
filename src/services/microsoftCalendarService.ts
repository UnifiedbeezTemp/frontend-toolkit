import { apiBaseUrl } from "../api/rootUrls";

export const initiateMicrosoftCalendarAuth = (): void => {
  const authUrl = `${apiBaseUrl}/channels/calendar/microsoft/auth`;
  window.location.href = authUrl;
};
