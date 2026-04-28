import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { step7WebchatPersistence } from "./step7WebchatPersistence";

export type WebchatType = "webchat" | "website" | "added";

export interface WebchatUrl {
  id: string | number;
  url: string;
  isSelected?: boolean;
  isConfigured?: boolean;
  type: WebchatType;
  sourceAssistantId?: string | number;
  apiData?: unknown;
}

export interface Step7WebchatState {
  webchatUrls: WebchatUrl[];
  addedWebchatUrls: WebchatUrl[];
  selectedWebchatId: string | number | null;
  searchQuery: string;
}

const getInitialState = (): Step7WebchatState => {
  const persisted = step7WebchatPersistence.load();
  if (persisted) {
    return {
      webchatUrls: [],
      addedWebchatUrls: [],
      selectedWebchatId: persisted.selectedWebchatId || null,
      searchQuery: "",
    };
  }
  return {
    webchatUrls: [
      {
        id: "1",
        url: "https://unifiedbeez.com",
        isSelected: false,
        type: "webchat",
      },
      {
        id: "2",
        url: "https://unifiedbeez.com",
        isSelected: false,
        type: "webchat",
      },
      {
        id: "3",
        url: "https://unifiedbeez.com",
        isSelected: false,
        type: "webchat",
      },
    ],
    addedWebchatUrls: [],
    selectedWebchatId: null,
    searchQuery: "",
  };
};

const initialState: Step7WebchatState = getInitialState();

const step7WebchatSlice = createSlice({
  name: "step7Webchat",
  initialState,
  reducers: {
    setWebchatUrls: (state, action: PayloadAction<WebchatUrl[]>) => {
      state.webchatUrls = action.payload;
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
      });
    },

    addWebchatUrl: (
      state,
      action: PayloadAction<Omit<WebchatUrl, "isSelected">>,
    ) => {
      const newWebchat: WebchatUrl = {
        ...action.payload,
        isSelected: false,
      };
      state.addedWebchatUrls.push(newWebchat);
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
      });
    },

    removeWebchatUrl: (state, action: PayloadAction<string | number>) => {
      state.webchatUrls = state.webchatUrls.filter(
        (webchat) => String(webchat.id) !== String(action.payload),
      );
      if (String(state.selectedWebchatId) === String(action.payload)) {
        state.selectedWebchatId = null;
      }
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
      });
    },

    selectWebchat: (state, action: PayloadAction<string | number>) => {
      // Always update selected ID as a fallback for newly created items
      state.selectedWebchatId = action.payload;

      // Update isSelected flag for UI feedback
      state.webchatUrls.forEach((webchat) => {
        webchat.isSelected = String(webchat.id) === String(action.payload);
      });

      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
      });
    },

    onWebchatCreated: (
      state,
      action: PayloadAction<{ id: number; url: string }>,
    ) => {
      const { id, url } = action.payload;
      state.selectedWebchatId = id;

      // Update the temporary item in the list if it matches the URL
      const index = state.webchatUrls.findIndex(
        (w) => w.url.toLowerCase().trim() === url.toLowerCase().trim(),
      );
      if (index !== -1) {
        state.webchatUrls[index] = {
          ...state.webchatUrls[index],
          id,
          type: "webchat",
          isSelected: true,
        };
      }

      // Also check addedWebchatUrls
      const addedIndex = state.addedWebchatUrls.findIndex(
        (w) => w.url.toLowerCase().trim() === url.toLowerCase().trim(),
      );
      if (addedIndex !== -1) {
        state.addedWebchatUrls[addedIndex] = {
          ...state.addedWebchatUrls[addedIndex],
          id,
          type: "webchat",
          isSelected: true,
        };
      }

      // Persist immediately
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
      });
    },

    updateWebchatUrl: (
      state,
      action: PayloadAction<{ id: string | number; url: string }>,
    ) => {
      const webchat = state.webchatUrls.find(
        (w) => String(w.id) === String(action.payload.id),
      );
      if (webchat) {
        webchat.url = action.payload.url;
      }
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
      });
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    clearSearchQuery: (state) => {
      state.searchQuery = "";
    },

    resetWebchatState: () => {
      step7WebchatPersistence.clear();
      return initialState;
    },

    // Mark webchat as configured (completed through substeps 1-5)
    markWebchatAsConfigured: (
      state,
      action: PayloadAction<string | number>,
    ) => {
      const webchat = state.webchatUrls.find(
        (w) => String(w.id) === String(action.payload),
      );
      if (webchat) {
        webchat.isConfigured = true;
      }
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
      });
    },

    // Mark webchat as not configured (when editing)
    markWebchatAsNotConfigured: (
      state,
      action: PayloadAction<string | number>,
    ) => {
      const webchat = state.webchatUrls.find(
        (w) => String(w.id) === String(action.payload),
      );
      if (webchat) {
        webchat.isConfigured = false;
      }
      // Persist to sessionStorage
      step7WebchatPersistence.save({
        selectedWebchatId: state.selectedWebchatId,
      });
    },
  },
});

export const {
  setWebchatUrls,
  addWebchatUrl,
  removeWebchatUrl,
  selectWebchat,
  updateWebchatUrl,
  setSearchQuery,
  clearSearchQuery,
  resetWebchatState,
  markWebchatAsConfigured,
  markWebchatAsNotConfigured,
  onWebchatCreated,
} = step7WebchatSlice.actions;

export default step7WebchatSlice.reducer;
