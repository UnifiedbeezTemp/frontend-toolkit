"use client"

import { createContext, useContext } from "react"
import { Automation } from "../../store/slices/automationSlice"

export interface AutomationsContextValue {
  items: Automation[]
  isLoading: boolean
  total: number
  totalPages: number
  currentPage: number
  searchQuery: string
  selectedStatus: "All" | "active" | "inactive"
  selectedIds: string[]
  setPage: (page: number) => void
  setSearch: (q: string) => void
  setStatus: (s: "All" | "active" | "inactive") => void
  toggleSelected: (id: string) => void
  selectAll: () => void
  clearSelected: () => void
  deleteSelected: () => void
  deleteOne: (id: string) => void
}

export const AutomationsContext = createContext<AutomationsContextValue | null>(null)

export const useAutomationsContext = (): AutomationsContextValue => {
  const ctx = useContext(AutomationsContext)
  if (!ctx) throw new Error("useAutomationsContext must be used within <Automations />")
  return ctx
}
