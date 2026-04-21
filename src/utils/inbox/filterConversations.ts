import { Conversation } from "../../components/inbox/types";

interface FilterParams {
  mappedConversations: Conversation[];
  localRealtimeUpdates: Conversation[];
  searchQuery: string;
  activeFilter: string;
}

/**
 * Merges real-time updates with API conversations and applies search/filter logic.
 * 1. Prioritizes local real-time updates (pins to top).
 * 2. Removes duplicates from the API list.
 * 3. Filters by search query and active filter status.
 */
export const filterConversations = ({
  mappedConversations,
  localRealtimeUpdates,
  searchQuery,
  activeFilter,
}: FilterParams): Conversation[] => {
  // 1. Get IDs of local updates to avoid duplicates in the API list
  const localIds = new Set(localRealtimeUpdates.map((c) => c.id));

  // 2. Filter out API conversations that already have a local update
  const filteredApi = mappedConversations.filter((c) => !localIds.has(c.id));

  // 3. Combine local updates (pinned to top) with the rest of the API list
  const merged = [...localRealtimeUpdates, ...filteredApi];

  // 4. Apply search and filter logic
  return merged.filter((convo) => {
    const safeSearchQuery = (searchQuery || "")?.toLowerCase();
    const safeName = (convo.name || "")?.toLowerCase();
    const safePreview = (convo.preview || "")?.toLowerCase();

    const matchesSearch =
      safeName.includes(safeSearchQuery) ||
      safePreview.includes(safeSearchQuery);

    const isUnreadFilter = (activeFilter || "")
      .toLowerCase()
      .includes("unread");
    const matchesFilter = isUnreadFilter ? (convo.unreadCount || 0) > 0 : true;

    return matchesSearch && matchesFilter;
  });
};
