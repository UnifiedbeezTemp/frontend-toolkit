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
    setSteps: (state, action: PayloadAction<Step[]>) => {
      state.steps = action.payload

      // Initialize visited steps with the first step
      if (action.payload.length > 0 && action.payload[0].subSteps.length > 0) {
        const firstStep = action.payload[0]
        const firstSubStep = firstStep.subSteps[0]
        state.visitedSteps = [
          { stepId: firstStep.id, subStepId: firstSubStep.id },
        ]
      }
    },

    // Navigate to a specific step and sub-step
    navigateToStep: (
      state,
      action: PayloadAction<{ stepId: number; subStepId: string | number }>
    ) => {
      const { stepId, subStepId } = action.payload

      // Check if navigation is allowed
      const targetStep = state.steps.find((step) => step.id === stepId)
      const targetSubStep = targetStep?.subSteps.find(
        (sub) => sub.id === subStepId
      )

      if (!targetStep || !targetSubStep) return

      // Check if previous steps are completed
      const canNavigate = canNavigateToStep(state.steps, stepId, subStepId)
      if (!canNavigate) return

      // Update current step and sub-step
      state.currentStepId = stepId
      state.currentSubStepId = subStepId

      // Add to visited steps if not already there
      const visitedIndex = state.visitedSteps.findIndex(
        (visited) =>
          visited.stepId === stepId && visited.subStepId === subStepId
      )

      if (visitedIndex === -1) {
        state.visitedSteps.push({ stepId, subStepId })
      }

      // Update step active states
      state.steps = state.steps.map((step) => ({
        ...step,
        isActive: step.id === stepId,
        subSteps: step.subSteps.map((subStep) => ({
          ...subStep,
          isActive: step.id === stepId && subStep.id === subStepId,
        })),
      }))
    },

    // Go to next sub-step within current step
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

    // Go to previous sub-step within current step
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

    // Go to next step (first sub-step of next step)
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

    // Go to previous step (last sub-step of previous step)
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

      if (currentSubStepIndex < currentStep.subSteps.length - 1) {
        // Go to next sub-step in current step
        stepsSlice.caseReducers.goToNextSubStep(state)
      } else if (currentSubStepIndex === currentStep.subSteps.length - 1) {
        // Go to next step
        stepsSlice.caseReducers.goToNextStep(state)
      }
    },

    // Update form data for current sub-step
    updateSubStepFormData: (
      state,
      action: PayloadAction<{ formData: any }>
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

  // Check if all previous steps are completed
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