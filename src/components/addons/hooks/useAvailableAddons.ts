import { useAppQuery } from "../../../api";
import { api } from "../../../api";
import { useMemo } from "react";
import { ApiAddon } from "../../../types/apiAddonTypes";
import { transformApiAddonsToUiAddons } from "../../../data/addonsData";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";

export const useAvailableAddons = () => {
  const icons = useSupabaseIcons();

  type AddonsResponse =
    | ApiAddon[]
    | { addons: ApiAddon[] }
    | { data: ApiAddon[] };

  const { data, isLoading, error, refetch, isFetching } =
    useAppQuery<AddonsResponse>(
      ["available-addons"],
      () => api.get<AddonsResponse>("/addon/available"),
      {
        retry: false,
      }
    );

  const addons = useMemo(() => {
    if (!data) return [];

    let list: ApiAddon[] = [];

    if (Array.isArray(data)) {
      list = data;
    } else if (
      data &&
      "addons" in data &&
      Array.isArray((data as { addons: ApiAddon[] }).addons)
    ) {
      list = (data as { addons: ApiAddon[] }).addons;
    } else if (
      data &&
      "data" in data &&
      Array.isArray((data as { data: ApiAddon[] }).data)
    ) {
      list = (data as { data: ApiAddon[] }).data;
    }

    return transformApiAddonsToUiAddons(list, icons);
  }, [data, icons]);

  return {
    addons,
    isLoading,
    error,
    refetch,
    isFetching,
  };
};
