"use client";

import React from "react";
import { AlertItem as AlertItemType } from "../types";
import { VARIANT_STYLES } from "../utils/variantStyles";

interface AlertItemProps {
  alert: AlertItemType;
  isLast?: boolean;
}

export default function AlertItem({ alert, isLast }: AlertItemProps) {
  const styles = VARIANT_STYLES[alert.variant];

  return (
    <div
      className={`flex items-center justify-between py-[1rem] px-[1.2rem] sm:px-[2.4rem] sm:py-[2rem] ${
        !isLast ? "border-b border-input-stroke" : ""
      }`}
    >
      <span className="text-[1.4rem] text-text-primary">{alert.label}</span>

      <span
        className={`min-w-[3.2rem] h-[2.4rem] flex items-center justify-center rounded-full text-[1.2rem] font-bold px-[0.8rem] ${styles.bg} ${styles.text}`}
      >
        {alert.count}
      </span>
    </div>
  );
}
