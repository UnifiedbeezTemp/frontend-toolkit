import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SmartSuggestionsConfig {
  smartSuggestionsEnabled: boolean;
  selectedAssistantId: string | null;
}

export interface AIProfileConfig {
  selectedAssistantId: string | null;
  tone: string;
  style: string;
  personalityType: string;
  industryType?: string;
}

export interface EscalationRulesConfig {
  enabled: boolean;
  smartSuggestionsEnabled: boolean;
  useDefault: boolean;
  escalateAfterUnanswered: string | null;
  escalateOnKeywords: string[];
  escalateAfterNoReply: string | null;
  backupEscalationContacts: string[];
}

export interface FollowUpTriggersConfig {
  enabled: boolean;
  smartSuggestionsEnabled: boolean;
  useDefault: boolean;
  enableFollowUp: boolean;
  delayBeforeFollowUp: string | null;
  followUpContentType: string | null;
}

export interface AIBehaviorSettingsConfig {
  enabled: boolean;
  smartSuggestionsEnabled: boolean;
  useDefault: boolean;
  aiReplyDelay: string | null;
  workingDays: string[];
  timezone: string | null;
  openingHours: string;
  openingMinutes: string;
  openingPeriod: "AM" | "PM";
  closingHours: string;
  closingMinutes: string;
  closingPeriod: "AM" | "PM";
}

export interface AccessPermissionsConfig {
  enabled: boolean;
  smartSuggestionsEnabled: boolean;
  useDefault: boolean;
  selectedMemberIds: string[];
}

export interface AIAssistantTestingConfig {
  selectedAssistantId: string | null;
  tone: string | null;
  style: string | null;
  personalityType: string | null;
}

export interface ChannelStep6Config {
  smartSuggestions: SmartSuggestionsConfig;
  aiProfile: AIProfileConfig;
  escalationRules: EscalationRulesConfig;
  followUpTriggers: FollowUpTriggersConfig;
  aiBehaviorSettings: AIBehaviorSettingsConfig;
  accessPermissions: AccessPermissionsConfig;
  aiAssistantTesting: AIAssistantTestingConfig;
}

export interface Step6ChannelConfigState {
  [channelId: string]: ChannelStep6Config;
}

const getDefaultConfig = (firstAssistantId: string | null = null, allMemberIds: string[] = []): ChannelStep6Config => ({
  smartSuggestions: {
    smartSuggestionsEnabled: false,
    selectedAssistantId: firstAssistantId,
  },
  aiProfile: {
    selectedAssistantId: firstAssistantId,
    tone: "",
    style: "",
    personalityType: "",
    industryType: "",
  },
  escalationRules: {
    enabled: true,
    smartSuggestionsEnabled: false,
    useDefault: true,
    escalateAfterUnanswered: null,
    escalateOnKeywords: [],
    escalateAfterNoReply: null,
    backupEscalationContacts: [],
  },
  followUpTriggers: {
    enabled: true,
    smartSuggestionsEnabled: false,
    useDefault: true,
    enableFollowUp: false,
    delayBeforeFollowUp: null,
    followUpContentType: null,
  },
  aiBehaviorSettings: {
    enabled: true,
    smartSuggestionsEnabled: false,
    useDefault: true,
    aiReplyDelay: null,
    workingDays: [],
    timezone: null,
    openingHours: "",
    openingMinutes: "",
    openingPeriod: "AM",
    closingHours: "",
    closingMinutes: "",
    closingPeriod: "PM",
  },
  accessPermissions: {
    enabled: true,
    smartSuggestionsEnabled: false,
    useDefault: true,
    selectedMemberIds: allMemberIds,
  },
  aiAssistantTesting: {
    selectedAssistantId: firstAssistantId,
    tone: null,
    style: null,
    personalityType: null,
  },
});

const initialState: Step6ChannelConfigState = {};

const step6ChannelConfigSlice = createSlice({
  name: "step6ChannelConfig",
  initialState,
  reducers: {
    initializeChannelConfig: (
      state,
      action: PayloadAction<{ channelId: string; firstAssistantId?: string | null; allMemberIds?: string[] }>
    ) => {
      const { channelId, firstAssistantId = null, allMemberIds = [] } = action.payload;
      if (!state[channelId]) {
        state[channelId] = getDefaultConfig(firstAssistantId, allMemberIds);
      }
    },

    initializeChannelConfigs: (
      state,
      action: PayloadAction<{ channelIds: string[]; firstAssistantId?: string | null; allMemberIds?: string[] }>
    ) => {
      const { channelIds, firstAssistantId = null, allMemberIds = [] } = action.payload;
      channelIds.forEach((channelId) => {
        if (!state[channelId]) {
          state[channelId] = getDefaultConfig(firstAssistantId, allMemberIds);
        }
      });
    },

    updateSmartSuggestions: (
      state,
      action: PayloadAction<{ channelId: string; updates: Partial<SmartSuggestionsConfig> }>
    ) => {
      const { channelId, updates } = action.payload;
      if (!state[channelId]) {
        state[channelId] = getDefaultConfig();
      }
      state[channelId].smartSuggestions = {
        ...state[channelId].smartSuggestions,
        ...updates,
      };
    },

    updateAIProfile: (
      state,
      action: PayloadAction<{ channelId: string; updates: Partial<AIProfileConfig> }>
    ) => {
      const { channelId, updates } = action.payload;
      if (!state[channelId]) {
        state[channelId] = getDefaultConfig();
      }
      state[channelId].aiProfile = {
        ...state[channelId].aiProfile,
        ...updates,
      };
    },

    updateEscalationRules: (
      state,
      action: PayloadAction<{ channelId: string; updates: Partial<EscalationRulesConfig> }>
    ) => {
      const { channelId, updates } = action.payload;
      if (!state[channelId]) {
        state[channelId] = getDefaultConfig();
      }
      state[channelId].escalationRules = {
        ...state[channelId].escalationRules,
        ...updates,
      };
    },

    updateFollowUpTriggers: (
      state,
      action: PayloadAction<{ channelId: string; updates: Partial<FollowUpTriggersConfig> }>
    ) => {
      const { channelId, updates } = action.payload;
      if (!state[channelId]) {
        state[channelId] = getDefaultConfig();
      }
      state[channelId].followUpTriggers = {
        ...state[channelId].followUpTriggers,
        ...updates,
      };
    },

    updateAIBehaviorSettings: (
      state,
      action: PayloadAction<{ channelId: string; updates: Partial<AIBehaviorSettingsConfig> }>
    ) => {
      const { channelId, updates } = action.payload;
      if (!state[channelId]) {
        state[channelId] = getDefaultConfig();
      }
      state[channelId].aiBehaviorSettings = {
        ...state[channelId].aiBehaviorSettings,
        ...updates,
      };
    },

    updateAccessPermissions: (
      state,
      action: PayloadAction<{ channelId: string; updates: Partial<AccessPermissionsConfig> }>
    ) => {
      const { channelId, updates } = action.payload;
      if (!state[channelId]) {
        state[channelId] = getDefaultConfig();
      }
      state[channelId].accessPermissions = {
        ...state[channelId].accessPermissions,
        ...updates,
      };
    },

    updateAIAssistantTesting: (
      state,
      action: PayloadAction<{ channelId: string; updates: Partial<AIAssistantTestingConfig> }>
    ) => {
      const { channelId, updates } = action.payload;
      if (!state[channelId]) {
        state[channelId] = getDefaultConfig();
      }
      state[channelId].aiAssistantTesting = {
        ...state[channelId].aiAssistantTesting,
        ...updates,
      };
    },

    removeChannelConfig: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },

    resetAllConfigs: () => initialState,
  },
});

export const {
  initializeChannelConfig,
  initializeChannelConfigs,
  updateSmartSuggestions,
  updateAIProfile,
  updateEscalationRules,
  updateFollowUpTriggers,
  updateAIBehaviorSettings,
  updateAccessPermissions,
  updateAIAssistantTesting,
  removeChannelConfig,
  resetAllConfigs,
} = step6ChannelConfigSlice.actions;

export default step6ChannelConfigSlice.reducer;

