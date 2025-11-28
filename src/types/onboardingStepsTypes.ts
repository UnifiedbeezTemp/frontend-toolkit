export interface SubStep {
  id: string | number;
  name: string;
  isCompleted: boolean;
  isActive: boolean;
  videoUrl?: string;
  formData?: any;
}

export interface Step {
  id: number;
  step: string;
  title: string;
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
