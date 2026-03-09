"use client";

import React from "react";
import Text from "../../../../../../ui/Text";
import { TimelineActivity } from "../../types";

export interface ActivityDetailsModalContentProps {
  activity: TimelineActivity;
}

export default function ActivityDetailsModalContent({
  activity,
}: ActivityDetailsModalContentProps) {
  return (
    <div className="flex flex-col gap-[2.4rem] sm:gap-[3.2rem]">
      <div className="flex flex-col gap-[0.8rem] sm:gap-[1.2rem]">
        <Text className="text-[1.4rem] sm:text-[1.6rem] font-bold text-dark-base-100">
          Description
        </Text>
        <Text className="text-[1.3rem] sm:text-[1.5rem] leading-[1.6] text-dark-base-100/60">
          {activity.description}
        </Text>
      </div>

      {activity.outcome && (
        <div className="flex flex-col gap-[0.8rem] sm:gap-[1.2rem]">
          <Text className="text-[1.4rem] sm:text-[1.6rem] font-bold text-dark-base-100">
            Outcome
          </Text>
          <Text className="text-[1.3rem] sm:text-[1.5rem] text-dark-base-100/60">
            {activity.outcome}
          </Text>
        </div>
      )}

      {activity.nextSteps && activity.nextSteps.length > 0 && (
        <div className="flex flex-col gap-[0.8rem] sm:gap-[1.2rem]">
          <Text className="text-[1.4rem] sm:text-[1.6rem] font-bold text-dark-base-100">
            Next Steps
          </Text>
          <ul className="flex flex-col gap-[0.6rem] sm:gap-[0.8rem] ml-[0.8rem] sm:ml-[1rem]">
            {activity.nextSteps.map((step, idx) => (
              <li
                key={idx}
                className="flex items-center gap-[1rem] sm:gap-[1.2rem]"
              >
                <div className="w-[0.3rem] h-[0.3rem] sm:w-[0.4rem] sm:h-[0.4rem] rounded-full bg-dark-base-40" />
                <Text className="text-[1.3rem] sm:text-[1.5rem] text-dark-base-100/60">
                  {step}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
