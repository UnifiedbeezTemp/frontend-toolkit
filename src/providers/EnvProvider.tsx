"use client";

import { createContext, useContext } from "react";

type Env = {
  NEXT_PUBLIC_SUPABASE_URL?: string
  NEXT_PUBLIC_USE_ONBOARDING_BACKEND?: string
  NEXT_PUBLIC_SUPABASE_URL_TEST?: string
  NEXT_PUBLIC_AUTH_BASE?: string
  NEXT_PUBLIC_MANUAL_ONBOARDING_BASE_URL?: string
  NEXT_PUBLIC_BEEHIVE_BASE_URL?: string
};

const EnvContext = createContext<Env | null>(null);

export const EnvProvider = ({
  value,
  children,
}: {
  value: Env;
  children: React.ReactNode;
}) => (
  <EnvContext.Provider value={value}>{children}</EnvContext.Provider>
);

export const useEnv = () => {
  const ctx = useContext(EnvContext);
  if (!ctx) throw new Error("EnvProvider missing");
  return ctx;
};
