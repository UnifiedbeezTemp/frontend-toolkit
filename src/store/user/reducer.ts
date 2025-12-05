import { PayloadAction } from "@reduxjs/toolkit"
import { UserProfile } from "./types"

const userReducers = {
  setUserProfile: (_state: UserProfile, action: PayloadAction<UserProfile>) => {
    return action.payload
  }
}

export default userReducers
