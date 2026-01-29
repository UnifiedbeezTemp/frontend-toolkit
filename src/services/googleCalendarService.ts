import { api } from "../api";

export interface GoogleCalendarConnectRequest {
  authCode: string;
}

export interface GoogleCalendarConnectResponse {
  success: boolean;
  message?: string;
}

export const connectGoogleCalendar = async (
  data: GoogleCalendarConnectRequest,
): Promise<GoogleCalendarConnectResponse> => {
  const response = await api.post<
    GoogleCalendarConnectRequest,
    GoogleCalendarConnectResponse
  >("/channels/calendar/google/connect", data);
  return response;
};
export const disconnectGoogleCalendar = async (
  accountId: number,
): Promise<{ success: boolean; message?: string }> => {
  return api.post<
    { accountId: number },
    { success: boolean; message?: string }
  >("/channels/calendar/disconnect/google_calendar", { accountId });
};
