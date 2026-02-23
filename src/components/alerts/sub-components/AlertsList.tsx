"use client";

import React from "react";
import { AlertItem as AlertItemType } from "../types";
import AlertItem from "./AlertItem";

interface AlertsListProps {
  alerts: AlertItemType[];
}

export default function AlertsList({ alerts }: AlertsListProps) {
  if (alerts.length === 0) {
    return (
      <div className="py-12 text-center text-text-primary/50 text-[1.4rem]">
        No alerts found.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {alerts.map((alert, index) => (
        <AlertItem
          key={alert.id}
          alert={alert}
          isLast={index === alerts.length - 1}
        />
      ))}
    </div>
  );
}
