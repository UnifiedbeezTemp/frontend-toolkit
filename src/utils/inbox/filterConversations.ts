import { Conversation } from "../../components/inbox/types";

interface FilterParams {
  mappedConversations: Conversation[];
  localRealtimeUpdates: Conversation[];
  searchQuery: string;
  activeFilter: string;
  accountId?: number;
  unreadOnly?: boolean;
  assignedToUserId?: number;
  isInternal?: boolean;
}

/**
 * Merges real-time updates with API conversations and applies search/filter logic.
 * 1. Combines lists and removes duplicates, prioritizing local updates.
 * 2. Filters by search query and all active filter parameters.
 * 3. Sorts by the most recent activity (lastMessageAt or updatedAt).
 */
export const filterConversations = ({
  mappedConversations,
  localRealtimeUpdates,
  searchQuery,
  activeFilter,
  accountId,
  unreadOnly,
  assignedToUserId,
  isInternal,
}: FilterParams): Conversation[] => {
  // 1. Get IDs of local updates to avoid duplicates in the API list
  const localIds = new Set(localRealtimeUpdates.map((c) => c.id));

  // 2. Filter out API conversations that already have a local update
  const filteredApi = mappedConversations.filter((c) => !localIds.has(c.id));

  // 3. Combine both lists
  const merged = [...localRealtimeUpdates, ...filteredApi];

  // 4. Apply search and filter logic
  const filtered = merged.filter((convo) => {
    // Basic search filtering
    const safeSearchQuery = (searchQuery || "")?.toLowerCase();
    const safeName = (convo.name || "")?.toLowerCase();
    const safePreview = (convo.preview || "")?.toLowerCase();

    const matchesSearch =
      safeName.includes(safeSearchQuery) ||
      safePreview.includes(safeSearchQuery);

    if (!matchesSearch) return false;

    // Filter by Inbox Type (Internal vs External)
    if (isInternal !== undefined && convo.isInternal !== isInternal) {
      return false;
    }

    // Filter by Account ID
    if (accountId !== undefined && convo.accountId !== accountId) {
      return false;
    }

    // Filter by Unread status
    const isUnreadFilter =
      unreadOnly ||
      (activeFilter || "").toLowerCase().includes("unread") ||
      activeFilter === "Unread";
    if (isUnreadFilter && (convo.unreadCount || 0) === 0) {
      return false;
    }

    // Filter by Assigned User
    if (assignedToUserId !== undefined) {
      if (assignedToUserId === 0) {
        // "Unassigned" case
        if (
          convo.assignedToUserId !== null &&
          convo.assignedToUserId !== undefined &&
          convo.assignedToUserId !== 0
        ) {
          return false;
        }
      } else if (convo.assignedToUserId !== assignedToUserId) {
        return false;
      }
    }

    return true;
  });

  // 5. Sort by most recent activity
  return filtered.sort((a, b) => {
    const timeA = new Date(a.lastMessageAt || a.updatedAt || 0).getTime();
    const timeB = new Date(b.lastMessageAt || b.updatedAt || 0).getTime();
    return timeB - timeA;
  });
};
