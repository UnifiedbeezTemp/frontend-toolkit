import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  theme: "light" | "dark";
  notifications: boolean;
}

const initialState: PreferencesState = {
  theme: "light",
  notifications: true,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notifications = action.payload;
    },
  },
});

export const { toggleTheme, setNotifications } = preferencesSlice.actions;
export default preferencesSlice.reducer;
