"use client";

import { useState, useCallback } from "react";

export interface List {
  id: string;
  label: string;
  type: "email" | "sms";
  variant?: "danger" | "success";
}

export function useContactLists() {
  const [emailLists] = useState<List[]>([
    { id: "1", label: "Tenant List", type: "email", variant: "danger" },
    { id: "2", label: "Campaign List", type: "email", variant: "success" },
  ]);

  const [smsLists] = useState<List[]>([]);

  const handleAddSmsList = useCallback(() => {
    // console.log("Add to SMS list clicked");
  }, []);

  return {
    emailLists,
    smsLists,
    handleAddSmsList,
  };
}
