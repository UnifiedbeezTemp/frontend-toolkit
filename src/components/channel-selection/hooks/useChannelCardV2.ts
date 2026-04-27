import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { patchChannelSelection } from "../../../services/channelService";
import { useToast } from "../../ui/toast/useToast";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { getChannelIconKey } from "../../../utils";
import { BackendChannel } from "../../../types/channelApiTypes";


export function useChannelCardV2(channel: BackendChannel) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const router = useRouter();
  const icons = useSupabaseIcons() as Record<string, string>;

  const comingSoon = channel?.category === "UPCOMING";

  const icon = useMemo(() => {
    const channelIconKey = getChannelIconKey(channel?.name);
    return icons[channelIconKey] || icons.linkExternal;
  }, [channel?.name, icons]);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const response = await patchChannelSelection(channel.id, {
        isSelected: !channel.isSelected,
      });

      showToast({
        title: "Success",
        description:
          response?.message ||
          `Channel ${!channel.isSelected ? "selected" : "unselected"} successfully`,
        variant: "success",
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["channels", "all"],
          refetchType: "all",
        }),
        queryClient.invalidateQueries({
          queryKey: ["channels", "selected"],
          refetchType: "all",
        }),
      ]);
    } catch (error: unknown) {
      console.error("Error toggling channel selection:", error);
      showToast({
        title: "Error",
        description: extractErrorMessage(
          error,
          "An error occurred while updating channel selection",
        ),
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddonClick = () => {
    if (channel?.access?.requiredAddon) {
      router.push(
        `${process.env.NEXT_PUBLIC_BASE}/addons?addon=${channel.access.requiredAddon}`,
      );
    }
  };

  return {
    isLoading,
    handleToggle,
    handleAddonClick,
    comingSoon,
    icon,
    icons,
  };
}
