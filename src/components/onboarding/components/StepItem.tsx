"use client";

import React from "react";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { cn } from "../../../lib/utils";
import { ProgressStep } from "../types";
import StepActions from "./StepActions";

interface StepProps {
  step: ProgressStep;
  isModal?: boolean;
  onAction: (stepId: number) => void;
  isNextStep?: boolean;
  isPage?: boolean;
}

export default function StepItem({
  step,
  isModal,
  onAction,
  isNextStep,
  isPage,
}: StepProps) {
  const supabaseIcons = useSupabaseIcons();

  return (
    <div
      className={cn(
        "border-input-stroke",
        isModal || isPage
          ? "border p-[5px] rounded-lg bg-primary"
          : step.id === 8
            ? "py-[2rem]"
            : "border-b py-[2rem]",
      )}
    >
      <div className={cn(isPage ? "p-[1rem]" : "")}>
        <div className={cn(isModal ? "flex items-start gap-[1rem]" : "")}>
          {isModal && step.isCompleted ? (
            <div className="mt-[5px] shrink-0">
              <ImageComponent
                alt="check"
                src={supabaseIcons.check}
                width={25}
                height={25}
              />
            </div>
          ) : (
            isModal && (
              <div className="w-[2rem] h-[2rem] border rounded-full border-border mt-[5px] shrink-0"></div>
            )
          )}
          <div
            className={cn(
              "w-full",
              isModal
                ? "pr-[0rem] w-full"
                : "flex flex-col sm:flex-row items-start sm:items-center justify-between",
            )}
          >
            <div className="w-full">
              <div
                className={cn(
                  "flex items-center justify-between w-full",
                  isModal
                    ? "flex-col items-start sm:flex-row sm:items-center"
                    : "",
                )}
              >
                <Heading
                  className={cn(
                    "leading-[2.36rem] text-[1.6rem]",
                    isModal ? "mt-[5px]" : "",
                  )}
                >
                  Step 0{step.id} - {step.title}
                </Heading>

                {!isPage && (
                  <div className="hidden sm:block">
                    {!isModal && (
                      <StepActions
                        step={step}
                        onAction={onAction}
                        isNextStep={isNextStep}
                      />
                    )}
                  </div>
                )}
              </div>
              <Text
                className={cn(
                  "leading-[2.24rem] mt-[0.8rem] text-[1.4rem]",
                  isModal ? "hidden sm:block" : "",
                  isPage && "max-w-[30rem]",
                )}
              >
                {step.summary}
              </Text>
            </div>
            {isPage && (
              <div className="mt-[1.6rem] w-full">
                {!isModal && (
                  <StepActions
                    step={step}
                    onAction={onAction}
                    isNextStep={isNextStep}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {isModal && (
        <Text className="leading-[2.24rem] text-[1.4rem] sm:hidden block pl-[3.5rem] pb-[1rem] ml-[-3rem]">
          {step.summary}
        </Text>
      )}
    </div>
  );
}
