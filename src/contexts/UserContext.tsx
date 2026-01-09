"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { UserContextValue } from "./types";

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <UserContext.Provider
      value={{ user: null, status: "unauthenticated", refetch: async () => {} }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error(
      "useUser must be used inside UserProvider or SessionProvider"
    );
  }
  return ctx;
}
