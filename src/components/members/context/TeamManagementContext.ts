import { createContext, useContext } from "react"
import { TeamManagementController } from "../types/teamManagement"

export const TeamManagementContext =
  createContext<TeamManagementController | null>(null)

export const useOptionalTeamManagementContext = () =>
  useContext(TeamManagementContext)

export const useTeamManagementContext = () => {
  const context = useOptionalTeamManagementContext()

  if (!context) {
    throw new Error(
      "useTeamManagementContext must be used within TeamManagementProvider",
    )
  }

  return context
}
