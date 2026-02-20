import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface Automation {
  id: string;
  name: string;
  icon: string;
  contact: number;
  campaign: number;
  conversion: number;
  type: string;
  description?: string;
  status: "active" | "inactive";
}

export interface AutomationState {
  automations: Automation[];
  selectedAutomations: string[];
  searchQuery: string;
  selectedType: string;
  selectedStatus: "All" | "active" | "inactive";
}

const initialState: AutomationState = {
  automations: [],
  selectedAutomations: [],
  searchQuery: "",
  selectedType: "All",
  selectedStatus: "All",
};

const automationSlice = createSlice({
  name: "automation",
  initialState,
  reducers: {
    setAutomations: (state, action: PayloadAction<Automation[]>) => {
      state.automations = action.payload;
    },
    toggleAutomation: (state, action: PayloadAction<string>) => {
      const automationId = action.payload;
      const index = state.selectedAutomations.indexOf(automationId);
      if (index > -1) {
        state.selectedAutomations.splice(index, 1);
      } else {
        state.selectedAutomations.push(automationId);
      }
    },
    deleteAutomation: (state, action: PayloadAction<string>) => {
      const automationId = action.payload;
      state.automations = state.automations.filter(
        (automation) => automation.id !== automationId,
      );

      state.selectedAutomations = state.selectedAutomations.filter(
        (id) => id !== automationId,
      );
    },
    deleteSelectedAutomations: (state) => {
      const selectedIds = state.selectedAutomations;

      state.automations = state.automations.filter(
        (automation) => !selectedIds.includes(automation.id),
      );

      state.selectedAutomations = [];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
    },
    setSelectedStatus: (
      state,
      action: PayloadAction<"All" | "active" | "inactive">,
    ) => {
      state.selectedStatus = action.payload;
    },
    clearSelectedAutomations: (state) => {
      state.selectedAutomations = [];
    },
    selectAllAutomations: (state, action: PayloadAction<string[]>) => {
      state.selectedAutomations = action.payload;
    },
  },
});

export const selectFilteredAutomations = createSelector(
  [
    (state: RootState) => state?.automation?.automations || [],
    (state: RootState) => state?.automation?.searchQuery || "",
    (state: RootState) => state?.automation?.selectedType || "All",
    (state: RootState) => state?.automation?.selectedStatus || "All",
  ],
  (automations, searchQuery, selectedType, selectedStatus) => {
    return automations.filter((automation) => {
      const matchesSearch =
        automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        automation.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesType =
        selectedType === "All" || automation.type === selectedType;
      const matchesStatus =
        selectedStatus === "All" || automation.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  },
);

export const selectTotalCount = (state: RootState) =>
  state?.automation?.automations?.length || 0;

export const selectSelectedCount = (state: RootState) =>
  state?.automation?.selectedAutomations?.length || 0;

export const selectSelectedAutomations = createSelector(
  [
    (state: RootState) => state?.automation?.automations || [],
    (state: RootState) => state?.automation?.selectedAutomations || [],
  ],
  (automations, selectedAutomations) => {
    return automations.filter((automation) =>
      selectedAutomations.includes(automation.id),
    );
  },
);

export const {
  setAutomations,
  toggleAutomation,
  deleteAutomation,
  deleteSelectedAutomations,
  setSearchQuery,
  setSelectedType,
  setSelectedStatus,
  clearSelectedAutomations,
  selectAllAutomations,
} = automationSlice.actions;

export default automationSlice.reducer;
