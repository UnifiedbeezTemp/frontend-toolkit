import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CustomizationSettings {
  // Chat bubble widget
  selectedIcon: string // Icon ID (e.g., "bee", "bubble", "envelope")
  customIconUrl?: string // URL for uploaded custom icon
  bubbleColor: string // "white" | "black" | "blue" | "green"

  // Live chat avatar
  selectedTeamMemberIds: string[]

  // Greeting
  language: string // "english" | "spanish" | "french"
  greetingText: string

  // Background color
  backgroundColor: string // "gradient" | "solid" | "transparent"

  // Alignment
  alignment: string // "left" | "right"

  // Distance
  distanceRight: number // Distance from right in pixels
  distanceBottom: number // Distance from bottom in pixels
}

export interface WebchatCustomization {
  customization: CustomizationSettings
}

export interface Step7CustomizationState {
  // Keyed by webchatId
  [webchatId: string]: WebchatCustomization
}

const defaultCustomization: CustomizationSettings = {
  selectedIcon: "bee",
  bubbleColor: "white",
  selectedTeamMemberIds: [],
  language: "english",
  greetingText: "",
  backgroundColor: "gradient",
  alignment: "left",
  distanceRight: 0,
  distanceBottom: 0,
}

const initialState: Step7CustomizationState = {}

const step7CustomizationSlice = createSlice({
  name: "step7Customization",
  initialState,
  reducers: {
    // Initialize customization for a webchat
    initializeWebchatCustomization: (
      state,
      action: PayloadAction<{ webchatId: string }>
    ) => {
      const { webchatId } = action.payload
      if (!state[webchatId]) {
        state[webchatId] = {
          customization: { ...defaultCustomization },
        }
      }
    },

    // Update selected icon
    updateSelectedIcon: (
      state,
      action: PayloadAction<{ webchatId: string; iconId: string }>
    ) => {
      const { webchatId, iconId } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization.selectedIcon = iconId
      }
    },

    // Update custom icon URL
    updateCustomIconUrl: (
      state,
      action: PayloadAction<{ webchatId: string; iconUrl: string }>
    ) => {
      const { webchatId, iconUrl } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization.customIconUrl = iconUrl
      }
    },

    // Update bubble color
    updateBubbleColor: (
      state,
      action: PayloadAction<{ webchatId: string; color: string }>
    ) => {
      const { webchatId, color } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization.bubbleColor = color
      }
    },

    // Update selected team members
    updateSelectedTeamMembers: (
      state,
      action: PayloadAction<{ webchatId: string; memberIds: string[] }>
    ) => {
      const { webchatId, memberIds } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization.selectedTeamMemberIds = memberIds
      }
    },

    // Update language
    updateLanguage: (
      state,
      action: PayloadAction<{ webchatId: string; language: string }>
    ) => {
      const { webchatId, language } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization.language = language
      }
    },

    // Update greeting text
    updateGreetingText: (
      state,
      action: PayloadAction<{ webchatId: string; text: string }>
    ) => {
      const { webchatId, text } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization.greetingText = text
      }
    },

    // Update background color
    updateBackgroundColor: (
      state,
      action: PayloadAction<{ webchatId: string; color: string }>
    ) => {
      const { webchatId, color } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization.backgroundColor = color
      }
    },

    // Update alignment
    updateAlignment: (
      state,
      action: PayloadAction<{ webchatId: string; alignment: string }>
    ) => {
      const { webchatId, alignment } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization.alignment = alignment
      }
    },

    // Update distance right
    updateDistanceRight: (
      state,
      action: PayloadAction<{ webchatId: string; distance: number }>
    ) => {
      const { webchatId, distance } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization.distanceRight = distance
      }
    },

    // Update distance bottom
    updateDistanceBottom: (
      state,
      action: PayloadAction<{ webchatId: string; distance: number }>
    ) => {
      const { webchatId, distance } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization.distanceBottom = distance
      }
    },

    // Update entire customization settings
    updateCustomization: (
      state,
      action: PayloadAction<{
        webchatId: string
        updates: Partial<CustomizationSettings>
      }>
    ) => {
      const { webchatId, updates } = action.payload
      if (state[webchatId]) {
        state[webchatId].customization = {
          ...state[webchatId].customization,
          ...updates,
        }
      }
    },

    // Remove customization for a webchat
    removeWebchatCustomization: (state, action: PayloadAction<string>) => {
      delete state[action.payload]
    },

    // Reset all customizations
    resetAllCustomizations: () => initialState,
  },
})

export const {
  initializeWebchatCustomization,
  updateSelectedIcon,
  updateCustomIconUrl,
  updateBubbleColor,
  updateSelectedTeamMembers,
  updateLanguage,
  updateGreetingText,
  updateBackgroundColor,
  updateAlignment,
  updateDistanceRight,
  updateDistanceBottom,
  updateCustomization,
  removeWebchatCustomization,
  resetAllCustomizations,
} = step7CustomizationSlice.actions

export default step7CustomizationSlice.reducer
