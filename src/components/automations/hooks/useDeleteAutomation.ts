"use client";

import { api, useAppMutation } from "../../../api";

export function useDeleteAutomation(onSuccess?: (id: string) => void) {
  const { mutateAsync, isPending } = useAppMutation<string, void>(
    (id: string) => api.delete<void>(`/automations/${id}`),
    {
      onSuccess: (_data, id) => {
        onSuccess?.(id);
      },
    },
  );

  return {
    deleteAutomation: mutateAsync,
    isDeleting: isPending,
  };
}
