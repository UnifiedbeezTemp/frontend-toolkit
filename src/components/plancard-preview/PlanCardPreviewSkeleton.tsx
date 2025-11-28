import Skeleton from "../ui/Skeleton";

export default function PlanCardPreviewSkeleton() {
  return (
    <div className="border border-border p-[1rem] rounded-[1rem] mt-[2.3rem] layout-body shadow flex flex-col sm:flex-row gap-[3.1rem]">
      <div className="flex-1">
        <Skeleton className="w-[4rem] h-[4rem] rounded-full" />

        <div className="flex items-center gap-[1rem] mt-[1rem]">
          <Skeleton className="w-[12rem] h-[2.4rem] rounded-[0.4rem]" />
          <Skeleton className="w-[8rem] h-[2rem] rounded-full" />
        </div>

        <div className="mt-[1rem] space-y-[0.8rem]">
          <Skeleton className="w-[20rem] h-[1.4rem] rounded-[0.4rem]" />
          <Skeleton className="w-[15rem] h-[1.4rem] rounded-[0.4rem]" />
        </div>

        <div className="mt-[3rem] sm:mt-[5rem]">
          <Skeleton className="w-[8rem] h-[3rem] rounded-[0.3rem]" />

          <div className="flex flex-wrap items-center mt-[1rem] gap-[1rem]">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-[0.62rem]">
                <Skeleton className="w-[1.5rem] h-[1.5rem] rounded-full" />
                <Skeleton className="w-[6rem] h-[1rem] rounded-[0.4rem]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-col-reverse gap-[1rem] sm:justify-between">
        <div className="sm:mb-[-1rem]">
          <Skeleton className="w-[8rem] h-[4rem] rounded-[0.4rem]" />
          <Skeleton className="w-[6rem] h-[1rem] rounded-[0.4rem] mt-[0.5rem]" />
        </div>

        <div className="flex gap-[1rem]">
          <Skeleton className="w-[12rem] h-[4rem] rounded-[0.4rem]" />
          <Skeleton className="w-[4rem] h-[4rem] rounded-[0.4rem]" />
        </div>
      </div>
    </div>
  );
}
