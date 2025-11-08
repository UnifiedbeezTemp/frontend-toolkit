import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// thinking of a general type/interface directory as well.

interface UserProfile {
  id: string;
  name: string;
  email: string;
  accountType: string;
  phoneNumber: string;
  imageUrl: string;
  jobTitle: string;
  organization: string;
}

// initial test data
const initialState: UserProfile = {
  id: "test-id",
  name: "ariana Grande",
  email: "ariana@unifiedbeez.com",
  accountType: "basic",
  phoneNumber: "+44-213-8314",
  jobTitle: "Visual Designer",
  organization: "Google",
  imageUrl: "",
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
