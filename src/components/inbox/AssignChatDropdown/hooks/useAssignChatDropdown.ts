import { useState, useMemo } from "react"
import { assignableUsers } from "../constants"

export function useAssignChatDropdown(assignedUserIds: string[] = []) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return assignableUsers

    const query = searchQuery.toLowerCase()
    return assignableUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    filteredUsers,
    assignedUserIds,
  }
}
