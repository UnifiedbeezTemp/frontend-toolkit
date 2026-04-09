import Skeleton from "../ui/Skeleton";

const PLAN_COUNT = 4;
const SKELETON_FEATURE_ROWS = 8;

export default function PlansPreviewSkeleton() {
  return (
    <>
      <div className="block md:hidden lg:block xl:hidden space-y-2">
        {Array.from({ length: PLAN_COUNT }).map((_, i) => (
          <div key={i} className="pt-6 pb-4 px-6 rounded-[1.2rem] border border-border bg-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-4 w-4 rounded" />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:grid lg:hidden xl:grid grid-cols-[repeat(4,minmax(19.8rem,1fr))] border border-border rounded-md bg-primary w-fit overflow-hidden shadow divide-x divide-border">
        {Array.from({ length: PLAN_COUNT }).map((_, i) => (
          <div key={i} className="flex flex-col items-center pt-6 pb-4 px-5">
            <Skeleton className="h-8 w-8 rounded-full mb-2" />
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-5 w-20 my-4" />
            {Array.from({ length: SKELETON_FEATURE_ROWS }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-32 my-3" />
            ))}
            <Skeleton className="h-9 w-full mt-4 rounded-md" />
          </div>
        ))}
      </div>
    </>
  );
}
