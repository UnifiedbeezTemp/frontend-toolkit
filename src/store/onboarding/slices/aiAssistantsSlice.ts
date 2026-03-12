import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AIAssistant, AiUsage } from "../../../types/aiAssistantTypes";

interface AiAssistantsState {
  assistants: AIAssistant[];
  usage: AiUsage | null;
  hasPendingChanges: boolean;
}

const initialState: AiAssistantsState = {
  assistants: [],
  usage: null,
  hasPendingChanges: false,
};

const aiAssistantsSlice = createSlice({
  name: "aiAssistants",
  initialState,
  reducers: {
    setHasPendingChanges: (state, action: PayloadAction<boolean>) => {
      state.hasPendingChanges = action.payload;
    },
    setAssistants: (state, action: PayloadAction<AIAssistant[]>) => {
      state.assistants = action.payload;
    },
    addAssistant: (state, action: PayloadAction<AIAssistant>) => {
      state.assistants = [...state.assistants, action.payload];
    },
    updateAssistant: (
      state,
      action: PayloadAction<{ id: string; data: Partial<AIAssistant> }>,
    ) => {
      const { id, data } = action.payload;
      state.assistants = state.assistants.map((assistant) =>
        assistant.id === id ? { ...assistant, ...data } : assistant,
      );
    },
    removeAssistant: (state, action: PayloadAction<string>) => {
      state.assistants = state.assistants.filter(
        (assistant) => assistant.id !== action.payload,
      );
    },
    setUsage: (state, action: PayloadAction<AiUsage>) => {
      state.usage = action.payload;
    },
    resetAiAssistants: () => initialState,
  },
});

export const {
  setHasPendingChanges,
  setAssistants,
  addAssistant,
  updateAssistant,
  removeAssistant,
  setUsage,
  resetAiAssistants,
} = aiAssistantsSlice.actions;

export default aiAssistantsSlice.reducer;
