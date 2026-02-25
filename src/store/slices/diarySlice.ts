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
  description?: string;
  priority: "Low" | "Medium" | "High";
  category: string;
  dueDate: string;
  reminder?: string;
  completed: boolean;
  assignee?: {
    name: string;
    avatar: string;
  };
}

export interface DiaryState {
  entries: DiaryEntry[];
  tasks: TaskItem[];
  activeTab: "diary" | "tasks";
  editingEntryId: string | null;
  selectedEntryForDetails: DiaryEntry | null;
  searchQuery: string;
  isAddTaskModalOpen: boolean;
}

const initialState: DiaryState = {
  entries: [],
  tasks: [],
  activeTab: "diary",
  editingEntryId: null,
  selectedEntryForDetails: null,
  searchQuery: "",
  isAddTaskModalOpen: false,
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
    setSelectedEntryForDetails: (
      state,
      action: PayloadAction<DiaryEntry | null>,
    ) => {
      state.selectedEntryForDetails = action.payload;
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setTasks: (state, action: PayloadAction<TaskItem[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<TaskItem>) => {
      state.tasks.unshift(action.payload);
    },
    setIsAddTaskModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddTaskModalOpen = action.payload;
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
  setSelectedEntryForDetails,
  toggleTaskStatus,
  setTasks,
  addTask,
  setIsAddTaskModalOpen,
} = diarySlice.actions;

export default diarySlice.reducer;
