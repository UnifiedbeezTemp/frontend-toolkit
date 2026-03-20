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
  workflowStatus?: "In Progress" | "Pending" | "On Hold";
  contactId?: string;
  beehiveId?: string;
  assignee?: {
    name: string;
    avatar: string;
  };
  assignees?: Array<{
    name: string;
    avatar: string;
  }>;
}

export interface OperationsBeehive {
  id: string;
  contactId: string;
  name: string;
  createdAt: string;
}

export interface UpdateTaskPayload {
  id: string;
  updates: Partial<Omit<TaskItem, "id">>;
}

export interface DiaryState {
  entries: DiaryEntry[];
  tasks: TaskItem[];
  operationsBeehives: OperationsBeehive[];
  activeTab: "diary" | "tasks";
  editingEntryId: string | null;
  selectedEntryForDetails: DiaryEntry | null;
  searchQuery: string;
  isAddTaskModalOpen: boolean;
  groupBy: "date" | "mood" | "alphabetical";
}

const initialState: DiaryState = {
  entries: [],
  tasks: [],
  operationsBeehives: [],
  activeTab: "diary",
  editingEntryId: null,
  selectedEntryForDetails: null,
  searchQuery: "",
  isAddTaskModalOpen: false,
  groupBy: "date",
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
    updateTask: (state, action: PayloadAction<UpdateTaskPayload>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload.updates,
        };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    addOperationsBeehive: (state, action: PayloadAction<OperationsBeehive>) => {
      const exists = state.operationsBeehives.some(
        (b) => b.id === action.payload.id,
      );
      if (exists) return;
      state.operationsBeehives.unshift(action.payload);
    },
    updateOperationsBeehiveName: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      const index = state.operationsBeehives.findIndex(
        (b) => b.id === action.payload.id,
      );
      if (index !== -1) state.operationsBeehives[index].name = action.payload.name;
    },
    setIsAddTaskModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddTaskModalOpen = action.payload;
    },
    setDiaryGroupBy: (
      state,
      action: PayloadAction<"date" | "mood" | "alphabetical">,
    ) => {
      state.groupBy = action.payload;
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
  updateTask,
  deleteTask,
  addOperationsBeehive,
  updateOperationsBeehiveName,
  setIsAddTaskModalOpen,
  setDiaryGroupBy,
} = diarySlice.actions;

export default diarySlice.reducer;
