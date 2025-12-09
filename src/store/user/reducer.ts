import { PayloadAction } from "@reduxjs/toolkit"
import { UserProfile } from "./types"

const userReducers = {
  setUserProfile: (state: UserProfile, action: PayloadAction<Partial<UserProfile>>) => {
    return {...state, ...action.payload}
  }
}

export default userReducers
