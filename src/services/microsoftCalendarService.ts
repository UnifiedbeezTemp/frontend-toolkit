import { api } from "../api";
import { apiBaseUrl } from "../api/rootUrls";

export const initiateMicrosoftCalendarAuth = (): void => {
  const authUrl = `${apiBaseUrl}/channels/calendar/microsoft/auth`;
  window.location.href = authUrl;
};

export const disconnectMicrosoftCalendar = async (
  accountId: number,
): Promise<{ success: boolean; message?: string }> => {
  return api.post<
    { accountId: number },
    { success: boolean; message?: string }
  >("/channels/calendar/disconnect/microsoft_calendar", { accountId });
};
