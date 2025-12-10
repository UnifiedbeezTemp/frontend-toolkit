import Skeleton from "../ui/Skeleton";

export default function MembersSkeleton() {
  return (
    <div className="space-y-[1.6rem]">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="border border-input-stroke p-[0.8rem] rounded-[0.8rem]"
        >
          <div className="lg:hidden flex flex-col gap-[3.2rem]">
            {/* Mobile Top Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[1.2rem]">
                <Skeleton className="w-[4rem] h-[4rem] rounded-full" />
                <div className="flex flex-col gap-[0.4rem]">
                  <Skeleton className="w-[15rem] h-[1.6rem] rounded-[0.4rem]" />
                  <Skeleton className="w-[12rem] h-[1.2rem] rounded-[0.4rem]" />
                </div>
              </div>
              <Skeleton className="w-[2rem] h-[2rem] rounded-[0.4rem]" />
            </div>

            {/* Mobile Role Badge */}
            <Skeleton className="w-[8rem] h-[2.4rem] rounded-full" />

            {/* Mobile Bottom Row */}
            <div className="flex items-center justify-between">
              <Skeleton className="w-[6rem] h-[1.6rem] rounded-full" />
              <Skeleton className="w-[8rem] h-[3.2rem] rounded-[0.4rem]" />
            </div>
          </div>

          {/* Desktop Section */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-[1.2rem] flex-1">
              <Skeleton className="w-[2rem] h-[2rem] rounded-[0.4rem]" />
              <Skeleton className="w-[4rem] h-[4rem] rounded-full" />
              <div className="flex flex-col gap-[0.4rem] flex-1">
                <Skeleton className="w-[20rem] h-[1.6rem] rounded-[0.4rem]" />
                <Skeleton className="w-[15rem] h-[1.2rem] rounded-[0.4rem]" />
              </div>
            </div>
            <div className="flex items-center gap-[1.6rem]">
              <Skeleton className="w-[6rem] h-[1.6rem] rounded-full" />
              <Skeleton className="w-[10rem] h-[3.2rem] rounded-[0.4rem]" />
              <Skeleton className="w-[8rem] h-[3.2rem] rounded-[0.4rem]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

