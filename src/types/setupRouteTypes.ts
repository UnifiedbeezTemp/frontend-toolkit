/**
 * Types for setup route navigation
 */

export interface SetupRouteParams {
  stepId: number;
  subStepId: string | number | null;
}

export interface SetupNavigationOptions {
  preserveSubStep?: boolean;
  scroll?: boolean;
}

