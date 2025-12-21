"use client"

const STEP7_WEBCHAT_STORAGE_KEY = "step7_webchat_state"

export interface PersistedWebchatState {
  selectedWebchatId: string | number | null
  webchatUrls: Array<{
    id: string | number
    url: string
    isSelected?: boolean
    isConfigured?: boolean
  }>
}

export const step7WebchatPersistence = {
  save: (state: PersistedWebchatState) => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STEP7_WEBCHAT_STORAGE_KEY, JSON.stringify(state))
      }
    } catch (error) {
      console.error("Failed to save step7 webchat state to sessionStorage:", error)
    }
  },

  load: (): PersistedWebchatState | null => {
    try {
      if (typeof window !== "undefined") {
        const stored = sessionStorage.getItem(STEP7_WEBCHAT_STORAGE_KEY)
        if (stored) {
          return JSON.parse(stored) as PersistedWebchatState
        }
      }
    } catch (error) {
      console.error("Failed to load step7 webchat state from sessionStorage:", error)
    }
    return null
  },

  clear: () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(STEP7_WEBCHAT_STORAGE_KEY)
      }
    } catch (error) {
      console.error("Failed to clear step7 webchat state from sessionStorage:", error)
    }
  },
}

