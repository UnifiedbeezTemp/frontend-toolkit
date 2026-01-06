import Skeleton from "../ui/Skeleton";

export default function PlanCardSkeleton() {
  return (
    <div className="p-[1.6rem] rounded-[1.1rem] w-full border border-gray-200 sm:flex flex-col gap-[8rem] bg-primary">
      <div>
        <div className="flex justify-between items-start mb-[1.6rem]">
          <Skeleton className="w-[4rem] h-[4rem] rounded-full" />
          <Skeleton className="w-[8rem] h-[2rem] rounded-full" />
        </div>

        <div className="mb-[1.6rem] space-y-[0.8rem]">
          <Skeleton className="w-[12rem] h-[1.8rem] rounded-[0.4rem]" />
          <Skeleton className="w-[16rem] h-[1.2rem] rounded-[0.4rem]" />
          <Skeleton className="w-[14rem] h-[1.2rem] rounded-[0.4rem]" />
        </div>

        <div className="mb-[1.6rem] space-y-[0.4rem]">
          <Skeleton className="w-[6rem] h-[2.4rem] rounded-[0.4rem]" />
          <Skeleton className="w-[8rem] h-[1.2rem] rounded-[0.4rem]" />
        </div>

        <div className="space-y-[0.8rem] mb-[1.6rem]">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex items-center gap-[0.8rem]">
              <Skeleton className="w-[1.2rem] h-[1.2rem] rounded-[0.2rem]" />
              <Skeleton className="w-[14rem] h-[1.2rem] rounded-[0.4rem]" />
            </div>
          ))}
        </div>

        <Skeleton className="w-full h-[2.8rem] rounded-[0.8rem] mb-[1.6rem]" />
      </div>

      <div className="space-y-[1.2rem]">
        <Skeleton className="w-full h-[4rem] rounded-[0.8rem]" />
        <div className="flex justify-center items-center gap-[0.8rem]">
          <Skeleton className="w-[1.6rem] h-[1.6rem] rounded-full" />
          <Skeleton className="w-[12rem] h-[1.2rem] rounded-[0.4rem]" />
        </div>
      </div>
    </div>
  );
}
