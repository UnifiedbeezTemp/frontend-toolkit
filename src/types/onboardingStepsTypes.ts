export interface SubStep {
  id: string | number;
  name: string;
  isCompleted: boolean;
  isActive: boolean;
  videoUrl?: string;
  formData?: Record<string, unknown>;
}

export interface Step {
  id: number;
  step: string;
  title: string;
  description: string;
  summary: string;
  isCompleted: boolean;
  isActive: boolean;
  subSteps: SubStep[];
  videoUrl?: string;
}

export interface StepsState {
  steps: Step[];
  currentStepId: number;
  currentSubStepId: string | number;
  visitedSteps: { stepId: number; subStepId: string | number }[];
  isNavigationOpen: boolean;
}
