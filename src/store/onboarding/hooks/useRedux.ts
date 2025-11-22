import { useDispatch, useSelector, useStore } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type {
  OnboardingState,
  OnboardingDispatch,
} from "../store";

export const useOnboardingDispatch: () => OnboardingDispatch = useDispatch;
export const useOnboardingSelector: TypedUseSelectorHook<OnboardingState> =
  useSelector;
export const useAppStore = useStore;
