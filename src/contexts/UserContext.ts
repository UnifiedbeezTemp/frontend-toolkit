
import { createContext, useContext } from 'react'
import { UserContextValue } from "./types"


export const UserContext = createContext<UserContextValue | undefined>(undefined)

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error('useUser must be used inside UserProvider')
  }
  return ctx
}
