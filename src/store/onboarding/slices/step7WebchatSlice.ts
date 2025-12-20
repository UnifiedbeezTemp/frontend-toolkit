import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { step7WebchatPersistence } from "./step7WebchatPersistence"

export interface WebchatUrl {
  id: string | number // Can be string or number from API
  url: string
  isSelected?: boolean
  isConfigured?: boolean // True when configuration is complete (substeps 1-5)
  // Store full API response for future use
  apiData?: unknown
}

export interface Step7WebchatState {
  webchatUrls: WebchatUrl[]
  selectedWebchatId: string | number | null
  searchQuery: string
}

const getInitialState = (): Step7WebchatState => {
  const persisted = step7WebchatPersistence.load()
  if (persisted) {
    return {
      webchatUrls: persisted.webchatUrls || [],
      selectedWebchatId: persisted.selectedWebchatId || null,
      searchQuery: "",
    }
  }
  return {
    webchatUrls: [
      { id: "1", url: "https://unifiedbeez.com", isSelected: false },
      { id: "2", url: "https://unifiedbeez.com", isSelected: false },
      { id: "3", url: "https://unifiedbeez.com", isSelected: false },
    ],
    selectedWebchatId: null,
    searchQuery: "",
  }
}

const initialState: Step7WebchatState = getInitialState()

const step7WebchatSlice = createSlice({
  name: "step7Webchat",
  initialState,
  reducers: {
    setWebchatUrls: (state, action: PayloadAction<WebchatUrl[]>) => {
      state.webchatUrls = action.payload
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
        webchatUrls: state.webchatUrls,
      })
    },

    addWebchatUrl: (
      state,
      action: PayloadAction<Omit<WebchatUrl, "isSelected">>
    ) => {
      const newWebchat: WebchatUrl = {
        ...action.payload,
        isSelected: false,
      }
      state.webchatUrls.push(newWebchat)
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
        webchatUrls: state.webchatUrls,
      })
    },

    removeWebchatUrl: (state, action: PayloadAction<string | number>) => {
      state.webchatUrls = state.webchatUrls.filter(
        (webchat) => String(webchat.id) !== String(action.payload)
      )
      if (String(state.selectedWebchatId) === String(action.payload)) {
        state.selectedWebchatId = null
      }
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
        webchatUrls: state.webchatUrls,
      })
    },

    selectWebchat: (state, action: PayloadAction<string | number>) => {
      // Deselect all webchats
      state.webchatUrls.forEach((webchat) => {
        webchat.isSelected = false
      })

      // Select the chosen webchat
      const webchat = state.webchatUrls.find((w) => String(w.id) === String(action.payload))
      if (webchat) {
        webchat.isSelected = true
        state.selectedWebchatId = action.payload
      }

      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
        webchatUrls: state.webchatUrls,
      })
    },

    updateWebchatUrl: (
      state,
      action: PayloadAction<{ id: string | number; url: string }>
    ) => {
      const webchat = state.webchatUrls.find((w) => String(w.id) === String(action.payload.id))
      if (webchat) {
        webchat.url = action.payload.url
      }
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
        webchatUrls: state.webchatUrls,
      })
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },

    clearSearchQuery: (state) => {
      state.searchQuery = ""
    },

    resetWebchatState: () => {
      step7WebchatPersistence.clear()
      return initialState
    },

    // Mark webchat as configured (completed through substeps 1-5)
    markWebchatAsConfigured: (state, action: PayloadAction<string | number>) => {
      const webchat = state.webchatUrls.find((w) => String(w.id) === String(action.payload))
      if (webchat) {
        webchat.isConfigured = true
      }
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
        webchatUrls: state.webchatUrls,
      })
    },

    // Mark webchat as not configured (when editing)
    markWebchatAsNotConfigured: (state, action: PayloadAction<string | number>) => {
      const webchat = state.webchatUrls.find((w) => String(w.id) === String(action.payload))
      if (webchat) {
        webchat.isConfigured = false
      }
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
        webchatUrls: state.webchatUrls,
      })
    },
  },
})

export const {
  setWebchatUrls,
  addWebchatUrl,
  removeWebchatUrl,
  selectWebchat,
  updateWebchatUrl,
  setSearchQuery,
  clearSearchQuery,
  resetWebchatState,
  markWebchatAsConfigured,
  markWebchatAsNotConfigured,
} = step7WebchatSlice.actions

export default step7WebchatSlice.reducer
