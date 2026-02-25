"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/useRedux";
import {
  addAssistant,
  removeAssistant,
  setAssistants,
  setUsage,
  updateAssistant,
} from "../store/onboarding/slices/aiAssistantsSlice";
import {
  createAiAssistant,
  deleteAiAssistant,
  fetchAiAssistants,
  updateAiAssistantName,
  updateAiAssistantPersonality,
  updateAiAssistantInstruction,
} from "../api/aiAssistants";
import {
  AIAssistant,
  AiAssistantsResponse,
  AiUsage,
  CreateAiAssistantResponse,
  DeleteAiAssistantResponse,
} from "../types/aiAssistantTypes";
import { useAppMutation, useAppQuery } from "../api/query";
import { queryClient } from "../api/client";
import { useToast } from "../components/ui/toast/useToast";

type ApiError = { message?: { message: string }; status?: number };

const normalizeAssistant = (assistant: AIAssistant): AIAssistant => ({
  ...assistant,
  id: assistant.id?.toString?.() ?? String(assistant.id),
});

const getErrorMessage = (error: unknown) => {
  if ((error as ApiError).message?.message)
    return (error as ApiError).message?.message;
  if (!error) return "Something went wrong";
  if (typeof error === "string") return error;
  if (typeof error === "object" && "message" in (error as ApiError)) {
    const msg = (error as ApiError).message;
    if (typeof msg === "string") return msg;
  }
  return "Something went wrong";
};

const computeUsage = (prev: AiUsage | null, remaining?: number) => {
  if (!prev) {
    return remaining !== undefined
      ? { current: 0, max: remaining, remaining, unlimited: false }
      : null;
  }

  const nextRemaining =
    typeof remaining === "number" ? Math.max(0, remaining) : prev.remaining;

  return {
    ...prev,
    remaining: nextRemaining,
    current: prev.unlimited
      ? prev.current
      : Math.max(prev.max - nextRemaining, 0),
  };
};

export function useAiAssistants(
  options: { autoFetch?: boolean; showToasts?: boolean } = {},
) {
  const showToasts = options.showToasts ?? true;
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const aiState = useAppSelector((state) => state.aiAssistants);
  const { assistants, usage } = aiState;

  const assistantsQuery = useAppQuery<AiAssistantsResponse, ApiError>(
    ["ai-assistants"],
    fetchAiAssistants,
    {
      enabled: options.autoFetch ?? true,
    },
  );

  useEffect(() => {
    if (assistantsQuery.data) {
      const normalized =
        assistantsQuery.data.aiAssistants.map(normalizeAssistant);
      dispatch(setAssistants(normalized));
      dispatch(setUsage(assistantsQuery.data.usage));
    }
  }, [assistantsQuery.data, dispatch]);

  const createAssistantMutation = useAppMutation<
    { name?: string; useProfileMapping?: boolean } | undefined,
    CreateAiAssistantResponse,
    ApiError
  >((payload) => createAiAssistant(payload), {
    onSuccess: (data) => {
      const normalized = normalizeAssistant(data.ai);
      dispatch(addAssistant(normalized));
      const nextUsage = computeUsage(usage, data.remaining);
      if (nextUsage) {
        dispatch(setUsage(nextUsage));
      }
      if (showToasts) {
        showToast({
          variant: "success",
          title: "Assistant created",
          description: data.message || `${normalized.name} is ready.`,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["ai-assistants"] });
    },
    onError: (error) => {
      if (showToasts) {
        showToast({
          variant: "error",
          title: "Failed to create assistant",
          description: getErrorMessage(error),
        });
      }
    },
  });

  const updateAssistantMutation = useAppMutation<
    { id: string; name: string },
    AIAssistant,
    ApiError
  >(updateAiAssistantName, {
    onSuccess: (data, variables) => {
      const normalized = normalizeAssistant(data);
      dispatch(updateAssistant({ id: normalized.id, data: normalized }));
      if (showToasts) {
        showToast({
          variant: "success",
          title: "Assistant updated",
          description: `${variables.name} saved successfully.`,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["ai-assistants"] });
    },
    onError: (error) => {
      if (showToasts) {
        showToast({
          variant: "error",
          title: "Update failed",
          description: getErrorMessage(error),
        });
      }
    },
  });

  const updatePersonalityMutation = useAppMutation<
    { id: string; tone: string; style: string; personalityType: string },
    AIAssistant,
    ApiError
  >((payload) => updateAiAssistantPersonality(payload), {
    onSuccess: (data) => {
      const normalized = normalizeAssistant(data);
      dispatch(updateAssistant({ id: normalized.id, data: normalized }));
      if (showToasts) {
        showToast({
          variant: "success",
          title: "Personality updated",
          description: "Tone and style saved successfully.",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["ai-assistants"] });
    },
    onError: (error) => {
      if (showToasts) {
        showToast({
          variant: "error",
          title: "Personality update failed",
          description: getErrorMessage(error),
        });
      }
    },
  });

  const updateInstructionMutation = useAppMutation<
    { id: string; instruction: string },
    AIAssistant,
    ApiError
  >((payload) => updateAiAssistantInstruction(payload), {
    onSuccess: (data) => {
      const normalized = normalizeAssistant(data);
      dispatch(updateAssistant({ id: normalized.id, data: normalized }));
      if (showToasts) {
        showToast({
          variant: "success",
          title: "Instructions updated",
          description: "Assistant instructions saved successfully.",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["ai-assistants"] });
    },
    onError: (error) => {
      if (showToasts) {
        showToast({
          variant: "error",
          title: "Instruction update failed",
          description: getErrorMessage(error),
        });
      }
    },
  });

  const deleteAssistantMutation = useAppMutation<
    string,
    DeleteAiAssistantResponse,
    ApiError
  >(deleteAiAssistant, {
    onSuccess: (data, id) => {
      dispatch(removeAssistant(id));
      const nextUsage = computeUsage(usage, data.remaining);
      if (nextUsage) {
        dispatch(setUsage(nextUsage));
      }
      if (showToasts) {
        showToast({
          variant: "success",
          title: "Assistant removed",
          description: "The assistant has been deleted.",
        });
      }
      queryClient.invalidateQueries({ queryKey: ["ai-assistants"] });
    },
    onError: (error) => {
      if (showToasts) {
        showToast({
          variant: "error",
          title: "Delete failed",
          description: getErrorMessage(error),
        });
      }
    },
  });

  const canCreateMore = useMemo(() => {
    if (!usage) return true;
    if (usage.unlimited) return true;
    return usage.remaining > 0;
  }, [usage]);

  const currentAssistants = useMemo(() => {
    if (assistants.length > 0) return assistants;
    if (assistantsQuery.data?.aiAssistants) {
      return assistantsQuery.data.aiAssistants.map(normalizeAssistant);
    }
    return [];
  }, [assistants, assistantsQuery.data]);

  return {
    assistants: currentAssistants,
    usage: usage || assistantsQuery.data?.usage || null,
    isLoading: assistantsQuery.isLoading,
    isFetching: assistantsQuery.isFetching,
    error: assistantsQuery.error,
    refetch: assistantsQuery.refetch,
    createAssistant: (payload?: {
      name?: string;
      useProfileMapping?: boolean;
    }) => createAssistantMutation.mutateAsync(payload),
    updateAssistantName: (payload: { id: string; name: string }) =>
      updateAssistantMutation.mutateAsync(payload),
    updateAssistantPersonality: (payload: {
      id: string;
      tone: string;
      style: string;
      personalityType: string;
    }) => updatePersonalityMutation.mutateAsync(payload),
    updateAssistantInstruction: (payload: {
      id: string;
      instruction: string;
    }) => updateInstructionMutation.mutateAsync(payload),
    deleteAssistant: (id: string) => deleteAssistantMutation.mutateAsync(id),
    isCreating: createAssistantMutation.isPending,
    isUpdating: updateAssistantMutation.isPending,
    isUpdatingPersonality: updatePersonalityMutation.isPending,
    isUpdatingInstruction: updateInstructionMutation.isPending,
    isDeleting: deleteAssistantMutation.isPending,
    canCreateMore,
    setAssistants: (payload: AIAssistant[]) =>
      dispatch(setAssistants(payload.map(normalizeAssistant))),
  };
}
