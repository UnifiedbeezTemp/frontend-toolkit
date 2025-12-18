import { configureStore } from "@reduxjs/toolkit";
import addonsReducer from "./onboarding/slices/addonSlice";
import stepsReducer from "./onboarding/slices/stepsSlice";
import membersReducer from "./onboarding/slices/membersSlice";
import channelsReducer from "./onboarding/slices/channelsSlice";
import channelConnectionsReducer from "./onboarding/slices/channelConnectionsSlice";
import aiAssistantsReducer from "./onboarding/slices/aiAssistantsSlice";
import step6ChannelConfigReducer from "./onboarding/slices/step6ChannelConfigSlice";
import step7WebchatReducer from "./onboarding/slices/step7WebchatSlice"
import step7ChannelIntegrationReducer from "./onboarding/slices/step7ChannelIntegrationSlice"
import step7CustomizationReducer from "./onboarding/slices/step7CustomizationSlice"
import step7ContentAndLanguageReducer from "./onboarding/slices/step7ContentAndLanguageSlice"

export const store = configureStore({
  reducer: {
    addons: addonsReducer,
    steps: stepsReducer,
    members: membersReducer,
    channels: channelsReducer,
    channelConnections: channelConnectionsReducer,
    aiAssistants: aiAssistantsReducer,
    step6ChannelConfig: step6ChannelConfigReducer,
    step7Webchat: step7WebchatReducer,
    step7ChannelIntegration: step7ChannelIntegrationReducer,
    step7Customization: step7CustomizationReducer,
    step7ContentAndLanguage: step7ContentAndLanguageReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
