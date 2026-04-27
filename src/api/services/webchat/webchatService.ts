import { api } from "../../index";
import {
  WebchatConfigDto,
  UpdateWebchatConfigPayload,
  CreateLabelPayload,
  UpdateLabelPayload,
  CreateLabelLinkPayload,
  CommunicationLabel,
  InstallScriptResponse,
  VerifyInstallationResponse,
  WebchatEmbedResponse,
  SendInstructionsByEmailPayload,
  SendInstructionsToTeamPayload,
  CreateLanguagePayload,
  WebchatLanguageConfigDto,
  CreateLocalizationPayload,
} from "../../../types/webchatApiTypes";

export const webchatService = {
  async getWebchatConfig(id: string | number): Promise<WebchatConfigDto> {
    return api.get<WebchatConfigDto>(`/webchat/${id}`);
  },

  async updateWebchatConfig(
    id: string | number,
    payload: UpdateWebchatConfigPayload,
  ): Promise<WebchatConfigDto> {
    return api.patch<UpdateWebchatConfigPayload, WebchatConfigDto>(
      `/webchat/${id}`,
      payload,
    );
  },

  async updateWebchatConfigWithFormData(
    id: string | number,
    formData: FormData,
  ): Promise<WebchatConfigDto> {
    return api.patch<FormData, WebchatConfigDto>(`/webchat/${id}`, formData);
  },

  async uploadIcon(
    id: string | number,
    formData: FormData,
  ): Promise<WebchatConfigDto> {
    return api.post<FormData, WebchatConfigDto>(
      `/webchat/${id}/upload-icon`,
      formData,
    );
  },

  async deleteWebchat(id: string | number): Promise<void> {
    return api.delete(`/webchat/${id}`);
  },

  async createLabel(
    webchatId: string | number,
    payload: CreateLabelPayload,
  ): Promise<CommunicationLabel> {
    return api.post<CreateLabelPayload, CommunicationLabel>(
      `/webchat/${webchatId}/labels`,
      payload,
    );
  },

  async deleteLabel(labelId: string | number): Promise<void> {
    return api.delete(`/webchat/labels/${labelId}`);
  },

  async updateLabel(
    labelId: string | number,
    payload: UpdateLabelPayload,
  ): Promise<CommunicationLabel> {
    return api.patch<UpdateLabelPayload, CommunicationLabel>(
      `/webchat/labels/${labelId}`,
      payload,
    );
  },

  async createLabelLink(
    labelId: string | number,
    payload: CreateLabelLinkPayload,
  ): Promise<unknown> {
    return api.post<CreateLabelLinkPayload, unknown>(
      `/webchat/labels/${labelId}/links`,
      payload,
    );
  },

  async deleteLabelLink(linkId: string | number): Promise<void> {
    return api.delete(`/webchat/labels/${linkId}/links`);
  },

  async addLabelChannel(
    labelId: string | number,
    payload: {
      accountType: string;
      accountId: number;
      icon?: string;
    },
  ): Promise<unknown> {
    return api.post<
      {
        accountType: string;
        accountId: number;
        icon?: string;
      },
      unknown
    >(`/webchat/labels/${labelId}/channels`, payload);
  },

  async deleteLabelChannel(labelChannelId: string | number): Promise<void> {
    return api.delete(`/webchat/label-channels/${labelChannelId}`);
  },

  async reorderLabelItems(
    labelId: string | number,
    payload: {
      items: Array<{
        type: "channel" | "link";
        id: number;
        displayOrder: number;
      }>;
    },
  ): Promise<unknown> {
    return api.patch<
      {
        items: Array<{
          type: "channel" | "link";
          id: number;
          displayOrder: number;
        }>;
      },
      unknown
    >(`/webchat/labels/${labelId}/items/reorder`, payload);
  },

  async getWebchatEmbed(
    webchatId: string | number,
  ): Promise<WebchatEmbedResponse> {
    return api.get<WebchatEmbedResponse>(`/webchat/${webchatId}/embed`, {
      withCredentials: false,
    });
  },

  async sendInstructionsByEmail(
    webchatId: string | number,
    payload: SendInstructionsByEmailPayload,
  ): Promise<void> {
    return api.post<SendInstructionsByEmailPayload, void>(
      `/webchat/${webchatId}/send-instructions-by-email`,
      payload,
    );
  },

  async sendInstructionsToTeam(
    webchatId: string | number,
    payload: SendInstructionsToTeamPayload,
  ): Promise<void> {
    return api.post<SendInstructionsToTeamPayload, void>(
      `/webchat/${webchatId}/send-instructions-to-team`,
      payload,
    );
  },

  async createLanguage(
    webchatId: string | number,
    payload: CreateLanguagePayload,
  ): Promise<WebchatLanguageConfigDto> {
    return api.post<CreateLanguagePayload, WebchatLanguageConfigDto>(
      `/webchat/${webchatId}/languages`,
      payload,
    );
  },

  async deleteLanguage(languageId: string | number): Promise<void> {
    return api.delete(`/webchat/languages/${languageId}`);
  },

  async updateLanguageLocalizedContent(
    webchatId: string | number,
    languageId: string | number,
    payload: { content?: string; greeting?: string },
  ): Promise<WebchatLanguageConfigDto> {
    return api.patch<
      { content?: string; greeting?: string },
      WebchatLanguageConfigDto
    >(`/webchat/${webchatId}/languages/${languageId}/content`, payload);
  },

  async createLocalization(
    webchatId: string | number,
    payload: CreateLocalizationPayload,
  ): Promise<unknown> {
    return api.post<CreateLocalizationPayload, unknown>(
      `/webchat/${webchatId}/localizations`,
      payload,
    );
  },

  async generateInstallScript(
    webchatConfigId: string | number,
    websiteUrl: string,
  ): Promise<InstallScriptResponse> {
    return api.post<{ websiteUrl: string }, InstallScriptResponse>(
      `/webchat/${webchatConfigId}/install-script`,
      { websiteUrl },
    );
  },

  async verifyInstallation(
    webchatConfigId: string | number,
  ): Promise<VerifyInstallationResponse> {
    return api.post<Record<string, never>, VerifyInstallationResponse>(
      `/webchat/${webchatConfigId}/verify-install`,
      {},
    );
  },

  async sendInstallationInstructions(
    webchatConfigId: string | number,
    recipientEmail: string,
  ): Promise<void> {
    return api.post<{ emails: string[] }, void>(
      `/webchat/${webchatConfigId}/send-instructions-by-email`,
      { emails: [recipientEmail] },
    );
  },

  async associateLiveChat(
    webchatId: string | number,
    liveChatConfigId: number,
  ): Promise<unknown> {
    return api.post<{ liveChatConfigId: number }, unknown>(
      `/webchat/${webchatId}/livechats`,
      { liveChatConfigId },
    );
  },

  async disassociateLiveChat(
    webchatId: string | number,
    liveChatConfigId: number,
  ): Promise<void> {
    return api.delete(`/webchat/livechats/${liveChatConfigId}`);
  },

  async addWebchatChannel(
    webchatId: string | number,
    payload: {
      accountType: string;
      accountId: number;
      icon?: string;
    },
  ): Promise<unknown> {
    return api.post(`/webchat/${webchatId}/channels`, payload);
  },

  async addWebchatLink(
    webchatId: string | number,
    payload: CreateLabelLinkPayload,
  ): Promise<unknown> {
    return api.post(`/webchat/${webchatId}/links`, payload);
  },

  async deleteWebchatChannel(id: number | string): Promise<void> {
    return api.delete(`/webchat/channels/${id}`);
  },

  async deleteWebchatLink(id: number | string): Promise<void> {
    return api.delete(`/webchat/links/${id}`);
  },

  async moveChannelToLabel(
    channelId: number | string,
    labelId: number | string,
  ): Promise<void> {
    return api.post(`/webchat/channels/${channelId}/move-to-label/${labelId}`);
  },

  async moveLinkToLabel(
    linkId: number | string,
    labelId: number | string,
  ): Promise<void> {
    return api.post(`/webchat/links/${linkId}/move-to-label/${labelId}`);
  },
};
