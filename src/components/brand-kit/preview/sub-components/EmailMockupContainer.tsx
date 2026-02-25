"use client";

import React from "react";
import { ModeColorState } from "../../types/brandKitTypes";

interface Props {
  children: React.ReactNode;
  colors: ModeColorState;
}

export default function EmailMockupContainer({ children, colors }: Props) {
  return (
    <div
      className="lg:max-w-[80%] shadow mx-auto rounded-[2rem] px-[0] mt-[1rem] transition-all duration-300 border border-border"
      style={{
        backgroundColor: colors.background,
        color: colors.primary,
      }}
    >
      {children}
    </div>
  );
}
