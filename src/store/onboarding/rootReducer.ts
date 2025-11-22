import { combineReducers } from "@reduxjs/toolkit";
import { authReducer, userReducer } from "../core";
import formProgressReducer from "./slices/formProgressSlice";
import preferencesReducer from "./slices/preferenceSlice";
import setupReducer from "./slices/setupSlice";

export const onboardingRootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  formProgress: formProgressReducer,
  preferences: preferencesReducer,
  setup: setupReducer,
});
