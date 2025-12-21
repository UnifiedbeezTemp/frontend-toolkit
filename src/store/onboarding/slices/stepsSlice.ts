import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Step, StepsState } from '../../../types/onboardingStepsTypes';

const initialState: StepsState = {
  steps: [],
  currentStepId: 1,
  currentSubStepId: 1,
  visitedSteps: [],
  isNavigationOpen: false,
};

const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    // Initialize steps with the structure from SetupPage
    setSteps: (state, action: PayloadAction<{ steps: Step[]; initialVisitedStep?: { stepId: number; subStepId: string | number } }>) => {
      const { steps, initialVisitedStep } = action.payload;
      state.steps = steps;
      
      if (state.visitedSteps.length === 0) {
        if (initialVisitedStep) {
          state.visitedSteps = [initialVisitedStep];
          state.currentStepId = initialVisitedStep.stepId;
          state.currentSubStepId = initialVisitedStep.subStepId;
        } else if (steps.length > 0 && steps[0].subSteps.length > 0) {
          const firstStep = steps[0];
          const firstSubStep = firstStep.subSteps[0];
          const initialStep = { stepId: firstStep.id, subStepId: firstSubStep.id };
          state.visitedSteps = [initialStep];
          state.currentStepId = firstStep.id;
          state.currentSubStepId = firstSubStep.id;
        }
      } else if (initialVisitedStep) {
        const existsIndex = state.visitedSteps.findIndex(
          v => v.stepId === initialVisitedStep.stepId && v.subStepId === initialVisitedStep.subStepId
        );
        if (existsIndex === -1) {
          state.visitedSteps.push(initialVisitedStep);
        } else {
          const existing = state.visitedSteps[existsIndex];
          state.visitedSteps.splice(existsIndex, 1);
          state.visitedSteps.push(existing);
        }
        state.currentStepId = initialVisitedStep.stepId;
        state.currentSubStepId = initialVisitedStep.subStepId;
      }
    },

    navigateToStep: (state, action: PayloadAction<{ stepId: number; subStepId: string | number; skipValidation?: boolean }>) => {
      const { stepId, subStepId, skipValidation = false } = action.payload;
      
      const targetStep = state.steps.find(step => step.id === stepId);
      const targetSubStep = targetStep?.subSteps.find(sub => sub.id === subStepId);
      
      if (!targetStep || !targetSubStep) return;

      if (!skipValidation) {
        const canNavigate = canNavigateToStep(state.steps, stepId, subStepId);
        if (!canNavigate) return;
      }

      // Update current step and sub-step
      state.currentStepId = stepId
      state.currentSubStepId = subStepId

      // Add to visited steps - always update to track progression
      const visitedIndex = state.visitedSteps.findIndex(
        (visited) =>
          visited.stepId === stepId && visited.subStepId === subStepId
      )

      if (visitedIndex === -1) {
        // Add new visited step
        state.visitedSteps.push({ stepId, subStepId });
      } else {
        // If already visited, move to end to maintain latest step tracking
        const existing = state.visitedSteps[visitedIndex];
        state.visitedSteps.splice(visitedIndex, 1);
        state.visitedSteps.push(existing);
      }

      state.steps = state.steps.map(step => ({
        ...step,
        isActive: step.id === stepId,
        subSteps: step.subSteps.map((subStep) => ({
          ...subStep,
          isActive: step.id === stepId && subStep.id === subStepId,
        })),
      }))
    },

    goToNextSubStep: (state) => {
      const currentStep = state.steps.find(
        (step) => step.id === state.currentStepId
      )
      if (!currentStep) return

      const currentSubStepIndex = currentStep.subSteps.findIndex(
        (sub) => sub.id === state.currentSubStepId
      )

      if (currentSubStepIndex < currentStep.subSteps.length - 1) {
        const nextSubStep = currentStep.subSteps[currentSubStepIndex + 1]
        stepsSlice.caseReducers.navigateToStep(state, {
          payload: { stepId: state.currentStepId, subStepId: nextSubStep.id },
          type: "navigateToStep",
        })
      }
    },

    goToPreviousSubStep: (state) => {
      const currentStep = state.steps.find(
        (step) => step.id === state.currentStepId
      )
      if (!currentStep) return

      const currentSubStepIndex = currentStep.subSteps.findIndex(
        (sub) => sub.id === state.currentSubStepId
      )

      if (currentSubStepIndex > 0) {
        const prevSubStep = currentStep.subSteps[currentSubStepIndex - 1]
        stepsSlice.caseReducers.navigateToStep(state, {
          payload: { stepId: state.currentStepId, subStepId: prevSubStep.id },
          type: "navigateToStep",
        })
      }
    },

    goToNextStep: (state) => {
      const currentStepIndex = state.steps.findIndex(
        (step) => step.id === state.currentStepId
      )
      if (currentStepIndex < state.steps.length - 1) {
        const nextStep = state.steps[currentStepIndex + 1]
        const firstSubStep = nextStep.subSteps[0]

        stepsSlice.caseReducers.navigateToStep(state, {
          payload: { stepId: nextStep.id, subStepId: firstSubStep.id },
          type: "navigateToStep",
        })
      }
    },

    goToPreviousStep: (state) => {
      const currentStepIndex = state.steps.findIndex(
        (step) => step.id === state.currentStepId
      )
      if (currentStepIndex > 0) {
        const prevStep = state.steps[currentStepIndex - 1]
        const lastSubStep = prevStep.subSteps[prevStep.subSteps.length - 1]

        stepsSlice.caseReducers.navigateToStep(state, {
          payload: { stepId: prevStep.id, subStepId: lastSubStep.id },
          type: "navigateToStep",
        })
      }
    },

    // Mark current sub-step as completed and move to next
    completeCurrentSubStep: (state) => {
      const currentStep = state.steps.find(
        (step) => step.id === state.currentStepId
      )
      const currentSubStep = currentStep?.subSteps.find(
        (sub) => sub.id === state.currentSubStepId
      )

      if (!currentStep || !currentSubStep) return

      // Find the index of current substep
      // Mark current sub-step as completed
      state.steps = state.steps.map((step) =>
        step.id === state.currentStepId
          ? {
              ...step,
              subSteps: step.subSteps.map((subStep) =>
                subStep.id === state.currentSubStepId
                  ? { ...subStep, isCompleted: true }
                  : subStep
              ),
            }
          : step
      )

      // Check if all sub-steps in current step are completed
      const allSubStepsCompleted = currentStep.subSteps.every(
        (sub) => sub.isCompleted
      )
      if (allSubStepsCompleted) {
        state.steps = state.steps.map((step) =>
          step.id === state.currentStepId
            ? { ...step, isCompleted: true }
            : step
        )
      }

      // Auto-navigate to next sub-step or next step
      const currentSubStepIndex = currentStep.subSteps.findIndex(
        (sub) => sub.id === state.currentSubStepId
      )

      state.steps = state.steps.map(step => 
        step.id === state.currentStepId
          ? {
              ...step,
              subSteps: step.subSteps.map((subStep, index) => {
                if (index <= currentSubStepIndex) {
                  return { ...subStep, isCompleted: true };
                }
                return subStep;
              }),
            }
          : step
      );

      const updatedStep = state.steps.find(step => step.id === state.currentStepId);
      if (updatedStep) {
        const allSubStepsCompleted = updatedStep.subSteps.every(sub => sub.isCompleted);
        if (allSubStepsCompleted) {
          state.steps = state.steps.map(step =>
            step.id === state.currentStepId
              ? { ...step, isCompleted: true }
              : step
          );
        }
      }
    },

    // Update form data for current sub-step
    updateSubStepFormData: (
      state,
      action: PayloadAction<{ formData: Record<string, unknown> | undefined }>
    ) => {
      state.steps = state.steps.map((step) =>
        step.id === state.currentStepId
          ? {
              ...step,
              subSteps: step.subSteps.map((subStep) =>
                subStep.id === state.currentSubStepId
                  ? { ...subStep, formData: action.payload.formData }
                  : subStep
              ),
            }
          : step
      )
    },

    // Mark a specific substep as completed without auto-navigation
    markSubStepAsCompleted: (
      state,
      action: PayloadAction<{ stepId: number; subStepId: string | number }>
    ) => {
      const { stepId, subStepId } = action.payload
      const step = state.steps.find((s) => s.id === stepId)
      if (step) {
        state.steps = state.steps.map((s) =>
          s.id === stepId
            ? {
                ...s,
                subSteps: s.subSteps.map((sub) =>
                  sub.id === subStepId ? { ...sub, isCompleted: true } : sub
                ),
              }
            : s
        )

        // Check if all sub-steps in the step are completed
        const updatedStep = state.steps.find((s) => s.id === stepId)
        if (updatedStep) {
          const allSubStepsCompleted = updatedStep.subSteps.every(
            (sub) => sub.isCompleted
          )
          if (allSubStepsCompleted) {
            state.steps = state.steps.map((s) =>
              s.id === stepId ? { ...s, isCompleted: true } : s
            )
          }
        }
      }
    },

    // Toggle navigation panel
    toggleNavigation: (state) => {
      state.isNavigationOpen = !state.isNavigationOpen
    },

    // Close navigation panel
    closeNavigation: (state) => {
      state.isNavigationOpen = false
    },

    // Open navigation panel
    openNavigation: (state) => {
      state.isNavigationOpen = true
    },

    // Jump to latest visited step (useful after making changes in previous steps)
    jumpToLatestStep: (state) => {
      if (state.visitedSteps.length > 0) {
        const latestVisited = state.visitedSteps[state.visitedSteps.length - 1]
        stepsSlice.caseReducers.navigateToStep(state, {
          payload: {
            stepId: latestVisited.stepId,
            subStepId: latestVisited.subStepId,
          },
          type: "navigateToStep",
        })
      }
    },
  },
})

// Helper function to check if navigation to a step is allowed
const canNavigateToStep = (steps: Step[], stepId: number, subStepId: string | number): boolean => {
  const targetStepIndex = steps.findIndex(step => step.id === stepId);
  if (targetStepIndex === -1) return false;

  for (let i = 0; i < targetStepIndex; i++) {
    if (!steps[i].isCompleted) return false;
  }

  const targetStep = steps[targetStepIndex];
  const targetSubStepIndex = targetStep.subSteps.findIndex(sub => sub.id === subStepId);
  
  // Check if all previous sub-steps in the same step are completed
  for (let i = 0; i < targetSubStepIndex; i++) {
    if (!targetStep.subSteps[i].isCompleted) return false;
  }

  return true;
};

export const {
  setSteps,
  navigateToStep,
  goToNextSubStep,
  goToPreviousSubStep,
  goToNextStep,
  goToPreviousStep,
  completeCurrentSubStep,
  updateSubStepFormData,
  markSubStepAsCompleted,
  toggleNavigation,
  closeNavigation,
  openNavigation,
  jumpToLatestStep,
} = stepsSlice.actions

export default stepsSlice.reducer;