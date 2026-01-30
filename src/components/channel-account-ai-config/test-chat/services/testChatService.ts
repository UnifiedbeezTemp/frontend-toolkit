import { api } from "../../../../api";
import {
  getAccountTypeFromProvider,
  isWebchatConnection,
} from "../../utils/configUtils";
import {
  InitTestSessionParams,
  InitTestSessionResponse,
  SendTestMessageParams,
  SendTestMessageResponse,
  GetTestHistoryResponse,
  ClearTestSessionResponse,
} from "../types/api";

function buildQueryParams(
  connectionId: number,
  metadata: Record<string, unknown> | undefined,
): string {
  const params = new URLSearchParams();

  if (isWebchatConnection(metadata)) {
    params.append("webchatId", String(connectionId));
  } else if (metadata?.provider) {
    params.append("accountId", String(connectionId));
    params.append(
      "accountType",
      getAccountTypeFromProvider(String(metadata.provider)),
    );
  }

  return params.toString();
}

export const testChatService = {
  async initTestSession(
    params: InitTestSessionParams,
  ): Promise<InitTestSessionResponse> {
    const { channelId, aiId, connectionId, metadata } = params;

    const queryString = buildQueryParams(connectionId, metadata);
    const url = `/channels/${channelId}/ai-config/${aiId}/test/init${
      queryString ? `?${queryString}` : ""
    }`;

    return api.post<undefined, InitTestSessionResponse>(url);
  },

  async sendTestMessage(
    params: SendTestMessageParams,
  ): Promise<SendTestMessageResponse> {
    const {
      channelId,
      aiId,
      sessionId,
      message,
      simulateOutOfHours = false,
    } = params;

    const url = `/channels/${channelId}/ai-config/${aiId}/test`;

    return api.post<
      { sessionId: string; message: string; simulateOutOfHours: boolean },
      SendTestMessageResponse
    >(url, { sessionId, message, simulateOutOfHours });
  },

  async getTestHistory(
    channelId: number,
    aiId: number,
    sessionId: string,
  ): Promise<GetTestHistoryResponse> {
    const url = `/channels/${channelId}/ai-config/${aiId}/test/${sessionId}`;
    return api.get<GetTestHistoryResponse>(url);
  },

  async clearTestSession(
    channelId: number,
    aiId: number,
    sessionId: string,
  ): Promise<ClearTestSessionResponse> {
    const url = `/channels/${channelId}/ai-config/${aiId}/test/${sessionId}`;
    return api.delete<ClearTestSessionResponse>(url);
  },
};
