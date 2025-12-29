import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
  QueryFunction,
} from "@tanstack/react-query";
import { APIError } from "./types";


export function useAppQuery<TData, TError = APIError, TKey extends QueryKey = QueryKey>(
  key: TKey,
  fn: QueryFunction<TData, TKey>,
  options?: Omit<UseQueryOptions<TData, TError, TData, TKey>, "queryKey" | "queryFn">,
) {
  return useQuery<TData, TError, TData, TKey>({
    queryKey: key,
    queryFn: fn,
    ...options,
  })
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
