import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * REUSABLE STEPS CAROUSEL COMPONENT
 *
 * USAGE:
 * <StepsCarousel
 *   steps={3}
 *   currentStep={activeStep}
 *   autoAdvance
 *   interval={5000}
 * />
 *
 * <StepsCarousel
 *   steps={4}
 *   currentStep={step}
 *   onStepChange={setStep}
 *   className="custom-styles"
 * />
 *
 * PROPS:
 * - steps: number - Total number of steps (required)
 * - currentStep: number - Current active step (0-indexed) (required)
 * - onStepChange: (step: number) => void - Callback when step changes
 * - autoAdvance: boolean - Auto-advance to next step (default: false)
 * - interval: number - Time in ms between auto-advance (default: 5000)
 * - pauseOnHover: boolean - Pause auto-advance on hover (default: true)
 * - showProgress: boolean - Show animated progress fill (default: true)
 * - clickable: boolean - Allow clicking steps to navigate (default: false)
 * - className: string - Add custom styles
 *
 * DEFAULTS:
 * - Smooth progress animations
 * - Auto-loops when reaching the end
 * - Accessible with ARIA attributes
 * - Responsive spacing
 */

interface StepsCarouselProps {
  steps: number;
  currentStep: number;
  onStepChange?: (step: number) => void;
  autoAdvance?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  showProgress?: boolean;
  clickable?: boolean;
  className?: string;
}

export default function StepsCarousel({
  steps,
  currentStep,
  onStepChange,
  autoAdvance = false,
  interval = 5000,
  pauseOnHover = true,
  showProgress = true,
  clickable = false,
  className = "",
}: StepsCarouselProps) {
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const progressRef = React.useRef(0);
  const animationRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number>(0);

  // Auto-advance logic with smooth animation
  React.useEffect(() => {
    if (!autoAdvance || isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    // Reset on step change
    progressRef.current = 0;
    lastTimeRef.current = Date.now();
    setProgress(0);

    const animate = () => {
      const now = Date.now();
      const elapsed = now - lastTimeRef.current;
      const newProgress = (elapsed / interval) * 100;

      // Change step just before reaching 100% to avoid flash
      if (newProgress >= 99.5) {
        setProgress(100); // Show complete briefly
        setTimeout(() => {
          const nextStep = (currentStep + 1) % steps;
          onStepChange?.(nextStep);
        }, 50); // Small delay for visual completion
        return;
      }

      progressRef.current = newProgress;
      setProgress(newProgress);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoAdvance, isPaused, currentStep, steps, interval, onStepChange]);

  // Reset progress when step changes
  React.useEffect(() => {
    setProgress(0);
    progressRef.current = 0;
    lastTimeRef.current = Date.now();
  }, [currentStep]);

  const handleStepClick = (index: number) => {
    if (clickable && onStepChange) {
      onStepChange(index);
      setProgress(0);
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  return (
    <div
      className={cn("flex items-center gap-2 w-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={steps}
      aria-label={`Step ${currentStep + 1} of ${steps}`}
    >
      {Array.from({ length: steps }).map((_, index) => {
        const isActive = index === currentStep;
        const isPast = index < currentStep;
        const isFuture = index > currentStep;

        return (
          <div
            key={index}
            className={cn(
              "relative h-[9px] flex-1 rounded-full overflow-hidden transition-all duration-300",
              clickable && "cursor-pointer",
              isActive || isPast ? "bg-steps-bg" : "bg-steps-bg"
            )}
            onClick={() => handleStepClick(index)}
          >
            {/* Background base */}
            <div className="absolute inset-0 bg-steps-bg" />

            {/* Completed steps */}
            {isPast && (
              <motion.div
                className="absolute inset-0 bg-steps-bg"
                style={{ width: "100%" }}
              />
            )}

            {/* Active step with progress */}
            {isActive && showProgress && (
              <motion.div
                className="absolute inset-0 bg-primary"
                style={{ width: `${progress}%` }}
              />
            )}

            {/* Active step without progress (static) */}
            {isActive && !showProgress && (
              <motion.div
                className="absolute inset-0 bg-primary"
                style={{ width: "100%" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
