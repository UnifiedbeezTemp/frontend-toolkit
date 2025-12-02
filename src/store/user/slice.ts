import { createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "./initialState";
import userProfileReducers from "./reducer";

const userProfileSlice = createSlice({
  name: "user-profile",
  initialState: initialUserState,
  reducers: userProfileReducers,
});

export const {
setUserProfile
} = userProfileSlice.actions

export default userProfileSlice.reducer;
