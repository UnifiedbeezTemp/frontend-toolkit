import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from "@tanstack/react-query";

export function useAppQuery<TData, TError = unknown>(
  key: QueryKey,
  fn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: fn,
    ...options,
  });
}

export function useAppMutation<TVariables, TData, TError = unknown>(
  fn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">,
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: fn,
    ...options,
  });
}
