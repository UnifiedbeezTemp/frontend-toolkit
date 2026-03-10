import React from "react";
import Skeleton from "../../ui/Skeleton";

export const AddonSkeletonList: React.FC = () => {
  return (
    <div className="flex flex-col gap-[1.6rem]">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="border border-input-stroke rounded-[1.6rem] p-[2.4rem]"
        >
          <div className="flex items-center gap-[1rem]">
            <Skeleton className="w-[4rem] h-[4rem] rounded-[1rem]" />
            <Skeleton className="w-[16rem] h-[2rem] rounded-[0.6rem]" />
          </div>
          <div className="mt-[1.6rem] flex gap-[0.7rem]">
            <Skeleton className="w-[14rem] h-[3.2rem] rounded-[0.8rem]" />
            <Skeleton className="w-[18rem] h-[3.2rem] rounded-[0.8rem]" />
          </div>
        </div>
      ))}
    </div>
  );
};
