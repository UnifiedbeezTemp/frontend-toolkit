import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";

export const useAutomationsPage = () => {
  const icons = useSupabaseIcons();

  return {
    icons,
  };
};
