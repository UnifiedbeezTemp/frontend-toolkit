import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SetupState {
  userId: string;
  planType: string;
  accountType: string;
  completed: boolean;
}

const initialState: SetupState = {
  userId: "",
  planType: "",
  accountType: "",
  completed: false,
};

const setupSlice = createSlice({
  name: "setup",
  initialState,
  reducers: {
    updateSetup: (state, action: PayloadAction<Partial<SetupState>>) => {
      Object.assign(state, action.payload);
    },
    completeSetup: (state) => {
      state.completed = true;
    },
  },
});

export const { updateSetup, completeSetup } = setupSlice.actions;
export default setupSlice.reducer;
