"use client";

import React from "react";
import CartIcon from "../../../../../../../../assets/icons/CartIcon";

interface BrowseEmptyStateProps {
  message: string;
}

export default function BrowseEmptyState({ message }: BrowseEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[6.4rem] gap-[2.4rem]">
      <div className="w-[12rem] h-[6rem] flex items-center justify-center bg-input-filled rounded-full opacity-20">
        <CartIcon size={64} color="var(--dark-base-40)" />
      </div>
      <p className="text-[1.4rem] text-center font-bold text-dark-base-30">{message}</p>
    </div>
  );
}
