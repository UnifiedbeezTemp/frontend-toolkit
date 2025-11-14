import { useState, useEffect, useCallback } from "react";

/**
 * CUSTOM HOOK FOR STEPS CAROUSEL
 *
 * Manages state and logic for the StepsCarousel component
 *
 * USAGE:
 * const { currentStep, next, prev, goTo, pause, resume } = useStepsCarousel(3, 5000);
 *
 * PARAMETERS:
 * - totalSteps: number - Total number of steps
 * - interval: number - Auto-advance interval in ms (default: 5000)
 * - autoAdvance: boolean - Enable auto-advance (default: true)
 * - loop: boolean - Loop back to first step (default: true)
 *
 * RETURNS:
 * - currentStep: number - Current active step (0-indexed)
 * - next: () => void - Go to next step
 * - prev: () => void - Go to previous step
 * - goTo: (step: number) => void - Go to specific step
 * - pause: () => void - Pause auto-advance
 * - resume: () => void - Resume auto-advance
 * - reset: () => void - Reset to first step
 * - isPaused: boolean - Current pause state
 */

interface UseStepsCarouselOptions {
  totalSteps: number;
  interval?: number;
  autoAdvance?: boolean;
  loop?: boolean;
}

interface UseStepsCarouselReturn {
  currentStep: number;
  next: () => void;
  prev: () => void;
  goTo: (step: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  isPaused: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export function useStepsCarousel(
  totalSteps: number,
  interval = 5000,
  autoAdvance = true,
  loop = true
): UseStepsCarouselReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Navigate to next step
  const next = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === totalSteps - 1) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  }, [totalSteps, loop]);

  // Navigate to previous step
  const prev = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === 0) {
        return loop ? totalSteps - 1 : prev;
      }
      return prev - 1;
    });
  }, [totalSteps, loop]);

  // Navigate to specific step
  const goTo = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
      }
    },
    [totalSteps]
  );

  // Pause auto-advance
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Resume auto-advance
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Reset to first step
  const reset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  // Auto-advance effect
  useEffect(() => {
    if (!autoAdvance || isPaused) return;

    const timer = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(timer);
  }, [autoAdvance, isPaused, interval, next]);

  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  return {
    currentStep,
    next,
    prev,
    goTo,
    pause,
    resume,
    reset,
    isPaused,
    isFirst,
    isLast,
  };
}

/**
 * HOOK FOR SYNCING CONTENT WITH STEPS
 *
 * Useful for managing content that changes with each step
 *
 * USAGE:
 * const content = useStepsContent(currentStep, [
 *   { title: 'Step 1', image: '/img1.jpg' },
 *   { title: 'Step 2', image: '/img2.jpg' },
 * ]);
 */

export function useStepsContent<T>(
  currentStep: number,
  content: T[]
): T | undefined {
  return content[currentStep];
}

/**
 * HOOK FOR STEPS CAROUSEL WITH KEYBOARD NAVIGATION
 *
 * Extends useStepsCarousel with keyboard controls
 *
 * USAGE:
 * const carousel = useStepsCarouselWithKeyboard(3, 5000);
 * // Use arrow keys to navigate, space to pause/resume
 */

export function useStepsCarouselWithKeyboard(
  totalSteps: number,
  interval = 5000,
  autoAdvance = true,
  loop = true
): UseStepsCarouselReturn {
  const carousel = useStepsCarousel(totalSteps, interval, autoAdvance, loop);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          carousel.next();
          break;
        case "ArrowLeft":
          event.preventDefault();
          carousel.prev();
          break;
        case " ":
          event.preventDefault();
          if (carousel.isPaused) {
            carousel.resume();
          } else {
            carousel.pause();
          }
          break;
        case "Home":
          event.preventDefault();
          carousel.goTo(0);
          break;
        case "End":
          event.preventDefault();
          carousel.goTo(totalSteps - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [carousel, totalSteps]);

  return carousel;
}
