import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ChannelOrLink {
  id: string
  type: "channel" | "link"
  // For channels
  channelId?: string
  connectionId?: string
  channelIcon?: string // Icon URL for the channel
  // For links
  linkType?: "website" | "email" | "phone"
  linkIcon?: string
  linkText?: string
  linkUrl?: string
}

export interface ChannelLabel {
  id: string
  name: string
  channelsAndLinks: ChannelOrLink[]
  ctaButton: {
    enabled: boolean
    value: string
  }
  ctaLink: {
    enabled: boolean
    value: string
  }
}

export interface WebchatChannelIntegration {
  websiteUrl: string
  channelLabels: ChannelLabel[]
  installationMethod?: "self" | "instructions" | null
  websiteUrlConfirmed?: boolean
}

export interface Step7ChannelIntegrationState {
  // Keyed by webchatId
  [webchatId: string]: WebchatChannelIntegration
}

const initialState: Step7ChannelIntegrationState = {}

const step7ChannelIntegrationSlice = createSlice({
  name: "step7ChannelIntegration",
  initialState,
  reducers: {
    // Initialize integration for a webchat
    initializeWebchatIntegration: (
      state,
      action: PayloadAction<{ webchatId: string; websiteUrl: string }>
    ) => {
      const { webchatId, websiteUrl } = action.payload
      if (!state[webchatId]) {
        state[webchatId] = {
          websiteUrl,
          channelLabels: [],
        }
      } else {
        // Update website URL if it changed
        state[webchatId].websiteUrl = websiteUrl
      }
    },

    // Update website URL for a webchat
    updateWebsiteUrl: (
      state,
      action: PayloadAction<{ webchatId: string; websiteUrl: string }>
    ) => {
      const { webchatId, websiteUrl } = action.payload
      if (state[webchatId]) {
        state[webchatId].websiteUrl = websiteUrl
      }
    },

    // Add a new channel label
    addChannelLabel: (
      state,
      action: PayloadAction<{
        webchatId: string
        label: Omit<ChannelLabel, "id">
      }>
    ) => {
      const { webchatId, label } = action.payload
      if (state[webchatId]) {
        const newLabel: ChannelLabel = {
          ...label,
          id: `label-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }
        state[webchatId].channelLabels.push(newLabel)
      }
    },

    // Update a channel label
    updateChannelLabel: (
      state,
      action: PayloadAction<{
        webchatId: string
        labelId: string
        updates: Partial<Omit<ChannelLabel, "id">>
      }>
    ) => {
      const { webchatId, labelId, updates } = action.payload
      if (state[webchatId]) {
        const label = state[webchatId].channelLabels.find(
          (l) => l.id === labelId
        )
        if (label) {
          Object.assign(label, updates)
        }
      }
    },

    // Remove a channel label
    removeChannelLabel: (
      state,
      action: PayloadAction<{ webchatId: string; labelId: string }>
    ) => {
      const { webchatId, labelId } = action.payload
      if (state[webchatId]) {
        state[webchatId].channelLabels = state[webchatId].channelLabels.filter(
          (l) => l.id !== labelId
        )
      }
    },

    // Add channel or link to a label
    addChannelOrLinkToLabel: (
      state,
      action: PayloadAction<{
        webchatId: string
        labelId: string
        channelOrLink: ChannelOrLink
      }>
    ) => {
      const { webchatId, labelId, channelOrLink } = action.payload
      if (state[webchatId]) {
        const label = state[webchatId].channelLabels.find(
          (l) => l.id === labelId
        )
        if (label) {
          label.channelsAndLinks.push(channelOrLink)
        }
      }
    },

    // Remove channel or link from a label
    removeChannelOrLinkFromLabel: (
      state,
      action: PayloadAction<{
        webchatId: string
        labelId: string
        channelOrLinkId: string
      }>
    ) => {
      const { webchatId, labelId, channelOrLinkId } = action.payload
      if (state[webchatId]) {
        const label = state[webchatId].channelLabels.find(
          (l) => l.id === labelId
        )
        if (label) {
          label.channelsAndLinks = label.channelsAndLinks.filter(
            (item) => item.id !== channelOrLinkId
          )
        }
      }
    },

    // Update CTA button for a label
    updateLabelCtaButton: (
      state,
      action: PayloadAction<{
        webchatId: string
        labelId: string
        enabled: boolean
        value: string
      }>
    ) => {
      const { webchatId, labelId, enabled, value } = action.payload
      if (state[webchatId]) {
        const label = state[webchatId].channelLabels.find(
          (l) => l.id === labelId
        )
        if (label) {
          label.ctaButton = { enabled, value }
        }
      }
    },

    // Update CTA link for a label
    updateLabelCtaLink: (
      state,
      action: PayloadAction<{
        webchatId: string
        labelId: string
        enabled: boolean
        value: string
      }>
    ) => {
      const { webchatId, labelId, enabled, value } = action.payload
      if (state[webchatId]) {
        const label = state[webchatId].channelLabels.find(
          (l) => l.id === labelId
        )
        if (label) {
          label.ctaLink = { enabled, value }
        }
      }
    },

    // Reorder channels and links within a label
    reorderChannelsAndLinks: (
      state,
      action: PayloadAction<{
        webchatId: string
        labelId: string
        startIndex: number
        endIndex: number
      }>
    ) => {
      const { webchatId, labelId, startIndex, endIndex } = action.payload
      if (state[webchatId]) {
        const label = state[webchatId].channelLabels.find(
          (l) => l.id === labelId
        )
        if (label && label.channelsAndLinks) {
          const items = [...label.channelsAndLinks]
          const [removed] = items.splice(startIndex, 1)
          items.splice(endIndex, 0, removed)
          label.channelsAndLinks = items
        }
      }
    },

    // Move channel label up
    moveChannelLabelUp: (
      state,
      action: PayloadAction<{ webchatId: string; labelId: string }>
    ) => {
      const { webchatId, labelId } = action.payload
      if (state[webchatId]) {
        const labels = state[webchatId].channelLabels
        const index = labels.findIndex((l) => l.id === labelId)
        if (index > 0) {
          // Swap with previous label
          const temp = labels[index]
          labels[index] = labels[index - 1]
          labels[index - 1] = temp
        }
      }
    },

    // Move channel label down
    moveChannelLabelDown: (
      state,
      action: PayloadAction<{ webchatId: string; labelId: string }>
    ) => {
      const { webchatId, labelId } = action.payload
      if (state[webchatId]) {
        const labels = state[webchatId].channelLabels
        const index = labels.findIndex((l) => l.id === labelId)
        if (index >= 0 && index < labels.length - 1) {
          // Swap with next label
          const temp = labels[index]
          labels[index] = labels[index + 1]
          labels[index + 1] = temp
        }
      }
    },

    // Remove integration for a webchat
    removeWebchatIntegration: (state, action: PayloadAction<string>) => {
      delete state[action.payload]
    },

    // Update installation method
    updateInstallationMethod: (
      state,
      action: PayloadAction<{
        webchatId: string
        installationMethod: "self" | "instructions" | null
      }>
    ) => {
      const { webchatId, installationMethod } = action.payload
      if (state[webchatId]) {
        state[webchatId].installationMethod = installationMethod
      }
    },

    // Confirm website URL
    confirmWebsiteUrl: (
      state,
      action: PayloadAction<{ webchatId: string; confirmed: boolean }>
    ) => {
      const { webchatId, confirmed } = action.payload
      if (state[webchatId]) {
        state[webchatId].websiteUrlConfirmed = confirmed
      }
    },

    // Reset all integrations
    resetAllIntegrations: () => initialState,
  },
})

export const {
  initializeWebchatIntegration,
  updateWebsiteUrl,
  addChannelLabel,
  updateChannelLabel,
  removeChannelLabel,
  addChannelOrLinkToLabel,
  removeChannelOrLinkFromLabel,
  updateLabelCtaButton,
  updateLabelCtaLink,
  reorderChannelsAndLinks,
  moveChannelLabelUp,
  moveChannelLabelDown,
  updateInstallationMethod,
  confirmWebsiteUrl,
  removeWebchatIntegration,
  resetAllIntegrations,
} = step7ChannelIntegrationSlice.actions

export default step7ChannelIntegrationSlice.reducer
