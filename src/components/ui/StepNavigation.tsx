import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

/**
 * REUSABLE STEP NAVIGATION COMPONENT
 *
 * USAGE:
 * <StepNavigation
 *   steps={[
 *     { label: 'Basic Account Setup' },
 *     { label: 'Select Plan' },
 *     { label: 'Payment' }
 *   ]}
 *   currentStep={1}
 * />
 *
 * <StepNavigation
 *   steps={['Step 1', 'Step 2', 'Step 3']}
 *   currentStep={2}
 *   onStepClick={(index) => setStep(index)}
 *   showNumbers
 * />
 *
 * PROPS:
 * - steps: Array of step objects or strings (required)
 *   - If objects: { label: string, description?: string }
 *   - If strings: converted to objects with label
 * - currentStep: number - Current active step (0-indexed) (required)
 * - onStepClick: (index: number) => void - Click handler for steps
 * - showNumbers: boolean - Show "Step 1", "Step 2" prefix (default: true)
 * - showCheckmarks: boolean - Show checkmarks on completed steps (default: true)
 * - clickableCompleted: boolean - Allow clicking completed steps (default: true)
 * - className: string - Custom styles for container
 *
 * DEFAULTS:
 * - Numbered circles with connecting lines
 * - Active step highlighted in brand-primary
 * - Completed steps clickable
 * - Future steps disabled
 */

export interface Step {
  label: string;
  description?: string;
}

interface StepNavigationProps {
  steps: string[] | Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  showNumbers?: boolean;
  showCheckmarks?: boolean;
  clickableCompleted?: boolean;
  className?: string;
}

export default function StepNavigation({
  steps,
  currentStep,
  onStepClick,
  showNumbers = true,
  showCheckmarks = true,
  clickableCompleted = true,
  className = "",
}: StepNavigationProps) {
  // Normalize steps to Step objects
  const normalizedSteps: Step[] = steps.map((step) =>
    typeof step === "string" ? { label: step } : step
  );

  const handleStepClick = (index: number) => {
    if (!onStepClick) return;

    // Only allow clicking completed steps or current step
    if (clickableCompleted && index <= currentStep) {
      onStepClick(index);
    }
  };

  return (
    <div
      className={cn("w-full py-4", className)}
      role="navigation"
      aria-label="Step navigation"
    >
      <div className="flex items-center justify-center">
        {normalizedSteps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isFuture = index > currentStep;
          const isClickable =
            clickableCompleted && (isCompleted || isActive) && onStepClick;

          return (
            <React.Fragment key={index}>
              {/* Step Item */}
              <button
                type="button"
                onClick={() => handleStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  "flex items-center gap-3 transition-all duration-200",
                  isClickable && "cursor-pointer hover:opacity-80",
                  !isClickable && "cursor-default"
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Circle with Number/Checkmark */}
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full text-[16px] font-bold transition-all duration-200",
                    isActive &&
                      "bg-brand-primary text-primary ring-4 ring-brand-primary/20",
                    isCompleted && "bg-brand-primary text-primary",
                    isFuture && "bg-border text-text-primary"
                  )}
                >
                  {isCompleted && showCheckmarks ? (
                    <Check className="w-5 h-5" strokeWidth={3} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Label */}
                <div className="text-left">
                  <p
                    className={cn(
                      "text-[14px] font-bold whitespace-nowrap",
                      isActive && "text-text-secondary",
                      isCompleted && "text-text-secondary",
                      isFuture && "text-muted"
                    )}
                  >
                    {showNumbers && `Step ${index + 1} - `}
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-[12px] text-text-primary mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </button>

              {/* Connecting Line */}
              {index < normalizedSteps.length - 1 && (
                <div
                  className={cn(
                    "h-[2px] flex-1 mx-4 transition-all duration-200",
                    index < currentStep ? "bg-brand-primary" : "bg-border"
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
