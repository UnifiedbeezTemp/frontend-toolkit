"use client";

import React from "react";
import Skeleton from "../../ui/Skeleton";

const DESKTOP_ROWS = 6;
const MOBILE_CARDS = 4;

export default function AutomationTableSkeleton() {
  return (
    <div className="w-full">
      <div className="hidden sm:block">
        <table className="w-full border-collapse">
          <thead className="bg-input-filled w-full">
            <tr className="border-b border-border">
              <th className="text-left py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem] border-r border-border">
                <div className="flex items-center gap-[10px]">
                  <div className="w-[1.65rem] h-[1.65rem] rounded-[0.4rem] border border-border bg-white"></div>
                  Automation Name
                </div>
              </th>
              <th className="text-left py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem] border-r border-border">
                Status
              </th>
              <th className="text-center py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem] border-r border-border">
                Contact in automation
              </th>
              <th className="text-center py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem] border-r border-border">
                Campaigns in automation
              </th>
              <th className="text-center py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem] border-r border-border">
                Conversion tracking trigger
              </th>
              <th className="text-center py-[.9rem] px-4 font-bold text-text-primary text-[1.16rem]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: DESKTOP_ROWS }).map((_, idx) => (
              <tr
                key={`desktop-row-${idx}`}
                className={idx === DESKTOP_ROWS - 1 ? "" : "border-b border-border"}
              >
                <td className="py-4 px-4 border-r border-border">
                  <div className="flex items-center gap-[10px]">
                    <Skeleton className="w-[1.6rem] h-[1.6rem] rounded-[0.4rem]" />
                    <Skeleton className="w-[3.7rem] h-[3.3rem] rounded-[.3rem]" />
                    <Skeleton className="h-[1.4rem] w-[12rem]" />
                  </div>
                </td>
                <td className="py-4 px-4 border-r border-border">
                  <Skeleton className="h-[1.4rem] w-[6rem] rounded-full" />
                </td>
                <td className="py-4 px-4 border-r border-border text-center">
                  <Skeleton className="h-[1.4rem] w-[4rem] mx-auto" />
                </td>
                <td className="py-4 px-4 border-r border-border text-center">
                  <Skeleton className="h-[1.4rem] w-[4rem] mx-auto" />
                </td>
                <td className="py-4 px-4 border-r border-border text-center">
                  <Skeleton className="h-[1.4rem] w-[4rem] mx-auto" />
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Skeleton className="w-[2.4rem] h-[2.4rem] rounded-md" />
                    <Skeleton className="w-[2.4rem] h-[2.4rem] rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden px-[1.4rem] space-y-[1.6rem] mb-[1.6rem] mt-[2rem]">
        {Array.from({ length: MOBILE_CARDS }).map((_, idx) => (
          <div
            className="border border-border p-[1.2rem] rounded-[1.1rem] bg-white"
            key={`mobile-card-${idx}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[1rem]">
                <Skeleton className="w-[1.6rem] h-[1.6rem] rounded-[0.4rem]" />
                <Skeleton className="w-[3.7rem] h-[3.3rem] rounded-[.3rem]" />
                <Skeleton className="h-[1.4rem] w-[10rem]" />
              </div>
              <div className="flex items-center gap-[6px]">
                <Skeleton className="w-[2rem] h-[2rem] rounded-md" />
                <Skeleton className="w-[2rem] h-[2rem] rounded-md" />
              </div>
            </div>

            <div className="pr-[1.9rem] pl-[2.7rem]">
              <div className="border-t border-border mt-[1.2rem] pt-[1.2rem] flex items-center justify-between">
                <Skeleton className="h-[1.2rem] w-[4rem]" />
                <div className="w-[.5rem] h-[.5rem] rounded-full bg-inactive-color"></div>
                <Skeleton className="h-[1.2rem] w-[4rem]" />
                <div className="w-[.5rem] h-[.5rem] rounded-full bg-inactive-color"></div>
                <Skeleton className="h-[1.2rem] w-[4rem]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
