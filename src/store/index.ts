import { configureStore } from "@reduxjs/toolkit";
import addonsReducer from "./onboarding/slices/addonSlice";
import stepsReducer from "./onboarding/slices/stepsSlice";
import membersReducer from "./onboarding/slices/membersSlice";

export const store = configureStore({
  reducer: {
    addons: addonsReducer,
    steps: stepsReducer,
    members: membersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
