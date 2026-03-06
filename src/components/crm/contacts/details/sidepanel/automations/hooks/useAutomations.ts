"use client";

import { useState } from "react";

export function useAutomations() {
  const [automations] = useState([
    "Tenancy_Filled_In_Registration",
    "Admin_ Update Last Interaction",
    "Scores_Landlord | Base 10pts",
  ]);

  const handleCreateAutomation = () => {
    // console.log("Create new automation clicked");
  };

  return {
    automations,
    handleCreateAutomation,
  };
}
