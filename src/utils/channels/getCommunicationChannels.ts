export function getCommunicationChannels<
  T extends {
    availableChannel?: { category?: string | null } | null;
  },
>(selectedChannels: T[] | null | undefined): T[] {
  if (!selectedChannels || selectedChannels.length === 0) return [];

  return selectedChannels.filter((channel) => {
    const category = channel.availableChannel?.category;
    return typeof category === "string" && category.toUpperCase() === "COMMUNICATION";
  });
}

