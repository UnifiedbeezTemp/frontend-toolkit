import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface WebchatUrl {
  id: string
  url: string
  isSelected?: boolean
  isConfigured?: boolean // True when configuration is complete (substeps 1-5)
}

export interface Step7WebchatState {
  webchatUrls: WebchatUrl[]
  selectedWebchatId: string | null
  searchQuery: string
}

const initialState: Step7WebchatState = {
  webchatUrls: [
    { id: "1", url: "https://unifiedbeez.com", isSelected: false },
    { id: "2", url: "https://unifiedbeez.com", isSelected: false },
    { id: "3", url: "https://unifiedbeez.com", isSelected: false },
  ],
  selectedWebchatId: "",
  searchQuery: "",
}

const step7WebchatSlice = createSlice({
  name: "step7Webchat",
  initialState,
  reducers: {
    setWebchatUrls: (state, action: PayloadAction<WebchatUrl[]>) => {
      state.webchatUrls = action.payload
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
    },

    removeWebchatUrl: (state, action: PayloadAction<string>) => {
      state.webchatUrls = state.webchatUrls.filter(
        (webchat) => webchat.id !== action.payload
      )
      if (state.selectedWebchatId === action.payload) {
        state.selectedWebchatId = null
      }
    },

    selectWebchat: (state, action: PayloadAction<string>) => {
      // Deselect all webchats
      state.webchatUrls.forEach((webchat) => {
        webchat.isSelected = false
      })

      // Select the chosen webchat
      const webchat = state.webchatUrls.find((w) => w.id === action.payload)
      if (webchat) {
        webchat.isSelected = true
        state.selectedWebchatId = action.payload
      }
    },

    updateWebchatUrl: (
      state,
      action: PayloadAction<{ id: string; url: string }>
    ) => {
      const webchat = state.webchatUrls.find((w) => w.id === action.payload.id)
      if (webchat) {
        webchat.url = action.payload.url
      }
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },

    clearSearchQuery: (state) => {
      state.searchQuery = ""
    },

    resetWebchatState: () => initialState,

    // Mark webchat as configured (completed through substeps 1-5)
    markWebchatAsConfigured: (state, action: PayloadAction<string>) => {
      const webchat = state.webchatUrls.find((w) => w.id === action.payload)
      if (webchat) {
        webchat.isConfigured = true
      }
    },

    // Mark webchat as not configured (when editing)
    markWebchatAsNotConfigured: (state, action: PayloadAction<string>) => {
      const webchat = state.webchatUrls.find((w) => w.id === action.payload)
      if (webchat) {
        webchat.isConfigured = false
      }
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
