import { useState, useCallback, useMemo } from "react";
import { ConnectionDisplayData } from "../../../../channels/connections/types";

export function useAccountSelector(connections: ConnectionDisplayData[]) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedConnectionId, setSelectedConnectionId] = useState<
    string | number | null
  >(connections?.[0]?.id || null);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const selectConnection = useCallback((id: string | number) => {
    setSelectedConnectionId(id);
    setIsDropdownOpen(false);
  }, []);

  const selectedConnection = useMemo(() => {
    return (
      connections.find((c) => c.id === selectedConnectionId) || connections[0]
    );
  }, [connections, selectedConnectionId]);

  return {
    isDropdownOpen,
    selectedConnectionId,
    selectedConnection,
    toggleDropdown,
    closeDropdown,
    selectConnection,
  };
}
