"use client"

import { ReactNode } from "react"
import { TeamManagementContext } from "../context/TeamManagementContext"
import { useTeamManagement } from "../hooks/useTeamManagement"
import { TeamManagementController } from "../types/teamManagement"

interface TeamManagementProviderProps {
  children: ReactNode
  value?: TeamManagementController
}

function InternalTeamManagementProvider({
  children,
}: {
  children: ReactNode
}) {
  const controller = useTeamManagement()

  return (
    <TeamManagementContext.Provider value={controller}>
      {children}
    </TeamManagementContext.Provider>
  )
}

export function TeamManagementProvider({
  children,
  value,
}: TeamManagementProviderProps) {
  if (value) {
    return (
      <TeamManagementContext.Provider value={value}>
        {children}
      </TeamManagementContext.Provider>
    )
  }

  return <InternalTeamManagementProvider>{children}</InternalTeamManagementProvider>
}
