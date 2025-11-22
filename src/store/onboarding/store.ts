import { configureStore } from "@reduxjs/toolkit";
import { onboardingRootReducer } from "./rootReducer";

export const onboardingStore = configureStore({
  reducer: onboardingRootReducer,
});

export type OnboardingState = ReturnType<typeof onboardingStore.getState>;
export type OnboardingDispatch = typeof onboardingStore.dispatch;
