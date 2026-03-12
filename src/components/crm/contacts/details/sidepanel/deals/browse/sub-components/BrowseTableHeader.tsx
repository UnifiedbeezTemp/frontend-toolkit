"use client";

import React from "react";

export default function BrowseTableHeader() {
  const headings = [
    "Abandonned",
    "Session Lee..",
    "Total Production",
    "Product name",
  ];

  return (
    <div className="flex border-b border-input-stroke">
      {headings.map((heading, index) => (
        <div
          key={index}
          className="flex-1 px-[.6rem] truncate py-[1rem] text-[1rem] font-bold text-dark-base-40"
        >
          {heading}
        </div>
      ))}
    </div>
  );
}
