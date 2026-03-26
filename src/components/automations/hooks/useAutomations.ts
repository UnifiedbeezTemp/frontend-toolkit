"use client"

import { useState } from "react"
import { api, useAppQuery } from "../../../api"
import { Automation } from "../../../store/slices/automationSlice"
import { AUTOMATION_CATEGORY_CONFIG } from "../../../constants/automations"
import { useSupabaseImages } from "../../../lib/supabase/useSupabase"
import { AutomationsContextValue } from "../AutomationsContext"

type ApiAutomation = {
  id: number | string
  name: string
  description?: string | null
  category?: string | null
  status?: string | null
  icon?: string | null
  _count?: {
    executions?: number | null
  }
}

export interface AutomationListResponse {
  items: ApiAutomation[]
  total: number
  page: number
  limit: number
  totalPages: number
}

const ITEMS_PER_PAGE = 10

export const useAutomations = (automationType: string): AutomationsContextValue => {
  const icons = useSupabaseImages()
  const [lastType, setLastType] = useState(automationType)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<"All" | "active" | "inactive">("All")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set())

  // Adjusting state when a prop changes (React docs pattern — no useEffect needed)
  if (lastType !== automationType) {
    setLastType(automationType)
    setCurrentPage(1)
    setSearchQuery("")
    setSelectedStatus("All")
    setSelectedIds([])
    setRemovedIds(new Set())
  }

  const categoryConfig = AUTOMATION_CATEGORY_CONFIG.find(
    (c) => c.label === automationType,
  )

  const buildQuery = () => {
    const params: string[] = [`page=${currentPage}`, `limit=${ITEMS_PER_PAGE}`]
    if (categoryConfig?.apiCategory)
      params.push(`category=${encodeURIComponent(categoryConfig.apiCategory)}`)
    if (searchQuery) params.push(`search=${encodeURIComponent(searchQuery)}`)
    if (selectedStatus !== "All")
      params.push(`status=${encodeURIComponent(selectedStatus)}`)
    return `?${params.join("&")}`
  }

  const queryKey = categoryConfig
    ? ["automations", categoryConfig.apiCategory, currentPage, searchQuery, selectedStatus]
    : ["automations", currentPage, searchQuery, selectedStatus]

  const { data, isLoading, isFetching } = useAppQuery<AutomationListResponse>(
    queryKey,
    () => api.get(`/automations${buildQuery()}`),
    {
      enabled: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  )

  const mappedItems: Automation[] = (data?.items || []).map((automation) => {
    const status = (automation.status || "").toUpperCase()
    const isActive = status === "ACTIVE" || status === "RUNNING"
    const categoryFromSlug = AUTOMATION_CATEGORY_CONFIG.find(
      (c) => c.slug === automation.category,
    )
    const displayType = categoryFromSlug?.label || automationType
    const fallbackIconKey = categoryFromSlug?.iconKey || categoryConfig?.iconKey
    const fallbackIcon = fallbackIconKey ? icons[fallbackIconKey] : ""

    return {
      id: String(automation.id),
      name: automation.name,
      icon: automation.icon || fallbackIcon,
      contact: 0,
      campaign: 0,
      conversion: 0,
      type: displayType,
      description: automation.description ?? undefined,
      status: isActive ? "active" : "inactive",
    }
  })

  const items = mappedItems.filter((a) => !removedIds.has(a.id))

  const setSearch = (q: string) => {
    setSearchQuery(q)
    setCurrentPage(1)
  }

  const setStatus = (s: "All" | "active" | "inactive") => {
    setSelectedStatus(s)
    setCurrentPage(1)
  }

  const toggleSelected = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )

  const selectAll = () => setSelectedIds(items.map((a) => a.id))
  const clearSelected = () => setSelectedIds([])

  const deleteSelected = () => {
    setRemovedIds((prev) => new Set([...prev, ...selectedIds]))
    setSelectedIds([])
  }

  const deleteOne = (id: string) => {
    setRemovedIds((prev) => new Set([...prev, id]))
    setSelectedIds((prev) => prev.filter((x) => x !== id))
  }

  return {
    items,
    isLoading: isLoading || (isFetching && !data),
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    currentPage,
    searchQuery,
    selectedStatus,
    selectedIds,
    setPage: setCurrentPage,
    setSearch,
    setStatus,
    toggleSelected,
    selectAll,
    clearSelected,
    deleteSelected,
    deleteOne,
  }
}
