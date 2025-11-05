import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// thinking of a general type/interface directory as well.

interface UserProfile {
  id: string;
  name: string;
  email: string;
  accountType: string;
  phoneNumber: string;
  imageUrl: string;
}

const initialState: UserProfile = {
  id: "",
  name: "",
  email: "",
  accountType: "",
  phoneNumber: "string",
  imageUrl: "string",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) =>
      action.payload,
  },
});

export const { setUserProfile } = userSlice.actions;
export default userSlice.reducer;
