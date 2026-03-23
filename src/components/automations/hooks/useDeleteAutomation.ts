"use client";

import { api, useAppMutation } from "../../../api";
import { useAppDispatch } from "../../../store/hooks/useRedux";
import { deleteAutomation } from "../../../store/slices/automationSlice";

export function useDeleteAutomation() {
  const dispatch = useAppDispatch();

  const { mutateAsync, isPending } = useAppMutation<string, void>(
    (id: string) => api.delete<void>(`/automations/${id}`),
    {
      onSuccess: (_data, id) => {
        dispatch(deleteAutomation(id));
      },
    },
  );

  return {
    deleteAutomation: mutateAsync,
    isDeleting: isPending,
  };
}
