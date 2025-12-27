import PlanSummaryContainer from "./PlanSummaryContainer";


const PlanSummarySkeleton = ({ className = "" }) => {
  return (
    <PlanSummaryContainer className={className}>
      <div className="flex flex-wrap justify-between w-full gap-8 animate-pulse">
        <div className="flex flex-col justify-between items-start gap-11 lg:gap-13.5 w-full">
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col mr-auto w-full max-w-[70%]">
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-gray-200" />
                <div className="flex items-center gap-4.5">
                  <div className="h-5 w-32 rounded bg-gray-200" />
                  <div className="h-5 w-20 rounded bg-gray-200" />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="h-4 w-28 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
            </div>

            <div className="hidden md:block">
              <div className="h-9 w-32 rounded bg-gray-200" />
            </div>
          </div>

          <div>
            <div className="h-7 w-20 rounded bg-gray-200 mb-2" />
            <div className="space-y-2 flex">
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="h-4 w-36 rounded bg-gray-200" />
            </div>
          </div>

          <div className="block md:hidden w-full">
            <div className="h-9 w-30 ml-auto rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </PlanSummaryContainer>
  );
};

export default PlanSummarySkeleton;
