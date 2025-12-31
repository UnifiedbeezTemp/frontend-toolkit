import { api } from "../../index";
import {
  WebchatConfigDto,
  UpdateWebchatConfigPayload,
  CreateLabelPayload,
  UpdateLabelPayload,
  CreateLabelLinkPayload,
  CommunicationLabel,
} from "../../../types/webchatApiTypes";

export const webchatService = {
  async getWebchatConfig(id: string | number): Promise<WebchatConfigDto> {
    return api.get<WebchatConfigDto>(`/webchat/${id}`);
  },

  async updateWebchatConfig(
    id: string | number,
    payload: UpdateWebchatConfigPayload
  ): Promise<WebchatConfigDto> {
    return api.patch<UpdateWebchatConfigPayload, WebchatConfigDto>(
      `/webchat/${id}`,
      payload
    );
  },

  async updateWebchatConfigWithFormData(
    id: string | number,
    formData: FormData
  ): Promise<WebchatConfigDto> {
    return api.patch<FormData, WebchatConfigDto>(`/webchat/${id}`, formData);
  },

  async uploadIcon(
    id: string | number,
    formData: FormData
  ): Promise<WebchatConfigDto> {
    return api.post<FormData, WebchatConfigDto>(
      `/webchat/${id}/upload-icon`,
      formData
    );
  },

  async deleteWebchat(id: string | number): Promise<void> {
    return api.delete(`/webchat/${id}`);
  },

  async createLabel(
    webchatId: string | number,
    payload: CreateLabelPayload
  ): Promise<CommunicationLabel> {
    return api.post<CreateLabelPayload, CommunicationLabel>(
      `/webchat/${webchatId}/labels`,
      payload
    );
  },

  async deleteLabel(labelId: string | number): Promise<void> {
    return api.delete(`/webchat/labels/${labelId}`);
  },

  async updateLabel(
    labelId: string | number,
    payload: UpdateLabelPayload
  ): Promise<CommunicationLabel> {
    return api.patch<UpdateLabelPayload, CommunicationLabel>(
      `/webchat/labels/${labelId}`,
      payload
    );
  },

  async createLabelLink(
    labelId: string | number,
    payload: CreateLabelLinkPayload
  ): Promise<unknown> {
    return api.post<CreateLabelLinkPayload, unknown>(
      `/webchat/labels/${labelId}/links`,
      payload
    );
  },

  async deleteLabelLink(linkId: string | number): Promise<void> {
    return api.delete(`/webchat/labels/${linkId}/links`);
  },

  async addLabelChannel(
    labelId: string | number,
    payload: {
      connectedChannelId: number;
      displayName: string;
      icon: string;
    }
  ): Promise<unknown> {
    return api.post<
      {
        connectedChannelId: number;
        displayName: string;
        icon: string;
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
    }
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
    webchatId: string | number
  ): Promise<import("../../../types/webchatApiTypes").WebchatEmbedResponse> {
    return api.get<
      import("../../../types/webchatApiTypes").WebchatEmbedResponse
    >(`/webchat/${webchatId}/embed`);
  },

  async sendInstructionsByEmail(
    webchatId: string | number,
    payload: import("../../../types/webchatApiTypes").SendInstructionsByEmailPayload
  ): Promise<void> {
    return api.post<
      import("../../../types/webchatApiTypes").SendInstructionsByEmailPayload,
      void
    >(`/webchat/${webchatId}/send-instructions-by-email`, payload);
  },

  async sendInstructionsToTeam(
    webchatId: string | number,
    payload: import("../../../types/webchatApiTypes").SendInstructionsToTeamPayload
  ): Promise<void> {
    return api.post<
      import("../../../types/webchatApiTypes").SendInstructionsToTeamPayload,
      void
    >(`/webchat/${webchatId}/send-instructions-to-team`, payload);
  },

  async createLanguage(
    webchatId: string | number,
    payload: import("../../../types/webchatApiTypes").CreateLanguagePayload
  ): Promise<unknown> {
    return api.post<
      import("../../../types/webchatApiTypes").CreateLanguagePayload,
      unknown
    >(`/webchat/${webchatId}/languages`, payload);
  },

  async createLocalization(
    webchatId: string | number,
    payload: import("../../../types/webchatApiTypes").CreateLocalizationPayload
  ): Promise<unknown> {
    return api.post<
      import("../../../types/webchatApiTypes").CreateLocalizationPayload,
      unknown
    >(`/webchat/${webchatId}/localizations`, payload);
  },
};
