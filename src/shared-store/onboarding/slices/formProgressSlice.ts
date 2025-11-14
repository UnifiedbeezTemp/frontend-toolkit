import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OnboardingCarousel {
  step: number;
  completed: boolean;
}

const initialState: OnboardingCarousel = {
  step: 1,
  completed: false,
};

const onboardingCarouselSlice = createSlice({
  name: "formProgress",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    markCompleted: (state) => {
      state.completed = true;
    },
  },
});

export const { nextStep, prevStep, markCompleted } =
  onboardingCarouselSlice.actions;
export default onboardingCarouselSlice.reducer;
