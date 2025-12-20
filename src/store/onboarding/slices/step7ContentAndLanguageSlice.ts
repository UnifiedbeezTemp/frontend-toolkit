import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ContentAndLanguageSettings {
  // Primary language
  primaryLanguage: string // "english" | "spanish" | "french" | "german" | "italian"

  // Title content
  titleLanguage: string
  titleText: string

  // Body content
  bodyLanguage: string
  bodyText: string
}

export interface WebchatContentAndLanguage {
  contentAndLanguage: ContentAndLanguageSettings
}

export interface Step7ContentAndLanguageState {
  // Keyed by webchatId
  [webchatId: string]: WebchatContentAndLanguage
}

const defaultContentAndLanguage: ContentAndLanguageSettings = {
  primaryLanguage: "english",
  titleLanguage: "english",
  titleText: "",
  bodyLanguage: "english",
  bodyText: "",
}

const initialState: Step7ContentAndLanguageState = {}

const step7ContentAndLanguageSlice = createSlice({
  name: "step7ContentAndLanguage",
  initialState,
  reducers: {
    // Initialize content and language for a webchat
    initializeWebchatContentAndLanguage: (
      state,
      action: PayloadAction<{ webchatId: string }>
    ) => {
      const { webchatId } = action.payload
      if (!state[webchatId]) {
        state[webchatId] = {
          contentAndLanguage: { ...defaultContentAndLanguage },
        }
      }
    },

    // Update primary language
    updatePrimaryLanguage: (
      state,
      action: PayloadAction<{ webchatId: string; language: string }>
    ) => {
      const { webchatId, language } = action.payload
      if (state[webchatId]) {
        state[webchatId].contentAndLanguage.primaryLanguage = language
      }
    },

    // Update title language
    updateTitleLanguage: (
      state,
      action: PayloadAction<{ webchatId: string; language: string }>
    ) => {
      const { webchatId, language } = action.payload
      if (state[webchatId]) {
        state[webchatId].contentAndLanguage.titleLanguage = language
      }
    },

    // Update title text
    updateTitleText: (
      state,
      action: PayloadAction<{ webchatId: string; text: string }>
    ) => {
      const { webchatId, text } = action.payload
      if (state[webchatId]) {
        state[webchatId].contentAndLanguage.titleText = text
      }
    },

    // Update body language
    updateBodyLanguage: (
      state,
      action: PayloadAction<{ webchatId: string; language: string }>
    ) => {
      const { webchatId, language } = action.payload
      if (state[webchatId]) {
        state[webchatId].contentAndLanguage.bodyLanguage = language
      }
    },

    // Update body text
    updateBodyText: (
      state,
      action: PayloadAction<{ webchatId: string; text: string }>
    ) => {
      const { webchatId, text } = action.payload
      if (state[webchatId]) {
        state[webchatId].contentAndLanguage.bodyText = text
      }
    },

    // Update entire content and language settings
    updateContentAndLanguage: (
      state,
      action: PayloadAction<{
        webchatId: string
        updates: Partial<ContentAndLanguageSettings>
      }>
    ) => {
      const { webchatId, updates } = action.payload
      if (state[webchatId]) {
        state[webchatId].contentAndLanguage = {
          ...state[webchatId].contentAndLanguage,
          ...updates,
        }
      }
    },

    // Remove content and language for a webchat
    removeWebchatContentAndLanguage: (state, action: PayloadAction<string>) => {
      delete state[action.payload]
    },

    // Reset all content and language
    resetAllContentAndLanguage: () => initialState,
  },
})

export const {
  initializeWebchatContentAndLanguage,
  updatePrimaryLanguage,
  updateTitleLanguage,
  updateTitleText,
  updateBodyLanguage,
  updateBodyText,
  updateContentAndLanguage,
  removeWebchatContentAndLanguage,
  resetAllContentAndLanguage,
} = step7ContentAndLanguageSlice.actions

export default step7ContentAndLanguageSlice.reducer
