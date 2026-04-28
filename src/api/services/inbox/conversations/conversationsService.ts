import { api } from "../../..";
import {
  ConversationsResponse,
  ConversationDetailsResponse,
  SendMessageRequest,
  Message,
} from "../../../../types/conversationApiTypes";
import { useAppQuery } from "../../../query";
import { keepPreviousData } from "@tanstack/react-query";

const EMPTY_ARRAY: never[] = [];

export const conversationsService = {
  getConversations: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    isInternal?: boolean;
    unreadOnly?: boolean;
    assignedToUserId?: number;
    accountId?: number;
  }): Promise<ConversationsResponse> => {
    return await api.get<ConversationsResponse>(`/conversations`, { params });
  },
  getConversation: async (
    conversationId: string,
    params?: {
      page?: number;
      limit?: number;
    },
  ): Promise<ConversationDetailsResponse> => {
    return await api.get<ConversationDetailsResponse>(
      `/conversations/conversation/${conversationId}`,
      { params },
    );
  },
  markAsRead: async (conversationId: string): Promise<void> => {
    return await api.put(`/messages/conversation/${conversationId}/read`);
  },
  sendMessage: async (data: SendMessageRequest): Promise<Message> => {
    return await api.post<SendMessageRequest, Message>(`/messages`, data);
  },
};

export const getConversations = (params?: {
  page?: number;
  limit?: number;
  status?: string;
  isInternal?: boolean;
  unreadOnly?: boolean;
  assignedToUserId?: number;
  accountId?: number;
}) => {
  const query = useAppQuery(
    ["conversations", params],
    () => conversationsService.getConversations(params),
    {
      placeholderData: keepPreviousData,
    },
  );

  return {
    conversations: query.data?.conversations ?? EMPTY_ARRAY,
    total: query.data?.total ?? 0,
    page: query.data?.page ?? 1,
    limit: query.data?.limit ?? 20,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    data: query.data,
  };
};

export const getConversation = (
  conversationId: string,
  params?: {
    page?: number;
    limit?: number;
  },
) => {
  const query = useAppQuery(
    ["conversation", conversationId, params],
    () => conversationsService.getConversation(conversationId, params),
    {
      placeholderData: keepPreviousData,
      enabled: !!conversationId,
    },
  );

  return {
    messages: query.data?.messages ?? EMPTY_ARRAY,
    total: query.data?.total ?? 0,
    page: query.data?.page ?? 1,
    limit: query.data?.limit ?? 50,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    data: query.data,
  };
};
