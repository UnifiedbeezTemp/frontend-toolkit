"use client";

import React from "react";
import StatCard from "./StatCard";
import { StatCardData } from "../types";

interface SalesTrendsStatsProps {
  statCards: StatCardData[];
}

export default function SalesTrendsStats({ statCards }: SalesTrendsStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1rem] sm:gap-[1.2rem] px-[1rem] sm:px-[2rem]">
      {statCards.map((card) => (
        <StatCard
          key={card.id}
          label={card.label}
          value={card.value}
          icon={card.icon}
          iconBg={card.iconBg}
          className={card.className}
        />
      ))}
    </div>
  );
}
