import React from "react";
import { cn } from "../../lib/utils";
import Skeleton from "../ui/Skeleton";
import Card from "../ui/Card";

export default function ComparisonSkeleton() {
  return (
    <>
      <div className="hidden lg:block overflow-x-auto">
        <div className="min-w-[120rem] border border-input-stroke rounded-[2.4rem] bg-primary overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-[20%] p-4 xl:p-[2.8rem] text-left border-b border-r border-input-stroke/50 bg-gray-50 sticky left-0 z-30">
                  <Skeleton className="h-[3.2rem] w-[18rem] mb-3" />
                  <Skeleton className="h-[1.6rem] w-full mb-1.5" />
                  <Skeleton className="h-[1.6rem] w-[80%]" />
                </th>
                {[1, 2, 3, 4].map((i) => (
                  <th
                    key={i}
                    className="w-[20%] p-2 xl:p-[2.8rem] text-left border-b border-r border-input-stroke/50 last:border-r-0 relative bg-primary"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-[2.4rem] w-[6rem] rounded-full" />
                        <Skeleton className="h-[3.2rem] w-[10rem] rounded-lg" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <Skeleton className="h-[2.2rem] w-[12rem]" />
                          <Skeleton className="h-[1.8rem] w-[4rem] rounded-md" />
                        </div>
                        <Skeleton className="h-[1.6rem] w-full" />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                <tr key={row}>
                  <td className="p-4 xl:p-[2.8rem] border-b border-r border-input-stroke/50 bg-gray-50 sticky left-0 z-20">
                    <Skeleton className="h-[1.8rem] w-[12rem]" />
                  </td>
                  {[1, 2, 3, 4].map((col) => (
                    <td
                      key={col}
                      className="p-8 border-b border-r border-input-stroke/50 last:border-r-0"
                    >
                      <div className="flex justify-center">
                        <Skeleton className="h-[2rem] w-[8rem]" />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-8 border-r border-input-stroke/50 bg-gray-50 sticky left-0 z-20"></td>
                {[1, 2, 3, 4].map((i) => (
                  <td
                    key={i}
                    className="p-3 border-r border-input-stroke/50 last:border-r-0"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <Skeleton className="h-[4rem] w-full rounded-lg" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-[1.6rem] w-[1.6rem] rounded-full" />
                        <Skeleton className="h-[1.2rem] w-[8rem]" />
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="block lg:hidden px-4 mb-20 relative">
        <Skeleton className="absolute -top-2 right-2 z-10 h-[2.4rem] w-[6rem] rounded-md" />
        <Card className="pt-6 pb-4 px-0 rounded-[1.2rem] w-full relative">
          <div className="absolute top-6 right-5.25">
            <Skeleton className="h-[2.4rem] w-[12rem] rounded-sm" />
          </div>
          <div className="px-5.25 w-full">
            <div className="flex items-center gap-3.5">
              <Skeleton className="h-[2.8rem] w-[2.8rem] rounded-full" />
              <Skeleton className="h-[2.4rem] w-[10rem]" />
            </div>
          </div>
          <div className="mt-4.75 py-4 border-y border-inactive-color/30">
            <div className="flex justify-evenly items-center px-4">
              <Skeleton className="h-[2.4rem] w-[8rem]" />
              <div className="w-px h-6 bg-gray-200" />
              <Skeleton className="h-[2.4rem] w-[8rem]" />
              <div className="w-px h-6 bg-gray-200" />
              <Skeleton className="h-[2.4rem] w-[8rem]" />
            </div>
          </div>
          <div className="bg-input-filled divide-y divide-border">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="py-4 px-5.25">
                <Skeleton className="h-[1.6rem] w-full" />
              </div>
            ))}
          </div>
          <div className="px-5.25 pt-4 pb-1.25">
            <div className="flex items-center gap-2 mb-3.25">
              <Skeleton className="flex-1 h-[4.4rem] rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-[4rem] w-[4rem] rounded-lg" />
                <Skeleton className="h-[4rem] w-[4rem] rounded-lg" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="h-[1.6rem] w-[1.6rem] rounded-full" />
              <Skeleton className="h-[1.2rem] w-[10rem]" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
