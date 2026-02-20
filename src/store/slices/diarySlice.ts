import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DiaryEntry {
  id: string;
  name: string;
  date: string; 
  content: string;
  mood?: string;
  tags?: string[];
}

export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface DiaryState {
  entries: DiaryEntry[];
  tasks: TaskItem[];
  activeTab: "diary" | "tasks";
  editingEntryId: string | null;
  searchQuery: string;
}

const initialState: DiaryState = {
  entries: [],
  tasks: [],
  activeTab: "diary",
  editingEntryId: null,
  searchQuery: "",
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setDiaryEntries: (state, action: PayloadAction<DiaryEntry[]>) => {
      state.entries = action.payload;
    },
    addDiaryEntry: (state, action: PayloadAction<DiaryEntry>) => {
      state.entries.unshift(action.payload);
    },
    updateDiaryEntry: (state, action: PayloadAction<DiaryEntry>) => {
      const index = state.entries.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    setEditingEntryId: (state, action: PayloadAction<string | null>) => {
      state.editingEntryId = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<"diary" | "tasks">) => {
      state.activeTab = action.payload;
    },
    setDiarySearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

export const {
  setDiaryEntries,
  addDiaryEntry,
  updateDiaryEntry,
  setEditingEntryId,
  setActiveTab,
  setDiarySearchQuery,
  toggleTaskStatus,
} = diarySlice.actions;

export default diarySlice.reducer;
