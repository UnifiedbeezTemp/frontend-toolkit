interface ResolveFiltersParams {
  activeFilter: string;
  subFilter: string | null | undefined;
  userId: string | undefined;
}

/**
 * Resolves UI filter states to backend-compatible API parameters.
 */
export const resolveInboxFilters = ({
  activeFilter,
  subFilter,
  userId,
}: ResolveFiltersParams) => {
  const unreadOnly = activeFilter === "Unread" ? true : undefined;

  const assignedToUserId =
    subFilter === "self"
      ? parseInt(userId || "0")
      : subFilter === "not_assigned"
        ? 0
        : undefined;

  return {
    unreadOnly,
    assignedToUserId,
  };
};
