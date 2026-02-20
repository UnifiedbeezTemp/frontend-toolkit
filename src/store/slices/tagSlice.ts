import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TagCategory =
  | "contact-type"
  | "intent-action"
  | "source-origin"
  | "engagement-level"
  | "actions-behavior";

export interface Tag {
  id: string;
  label: string;
  category: TagCategory;
  autoFillTag: string;
}

export interface TagState {
  tags: Tag[];
  selectedCategory: TagCategory;
  selectedTags: string[];
  searchQuery: string;
}

const initialState: TagState = {
  tags: [],
  selectedCategory: "contact-type",
  selectedTags: [],
  searchQuery: "",
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<Tag[]>) => {
      state.tags = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<TagCategory>) => {
      state.selectedCategory = action.payload;
    },
    toggleTagSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedTags.indexOf(action.payload);
      if (index === -1) {
        state.selectedTags.push(action.payload);
      } else {
        state.selectedTags.splice(index, 1);
      }
    },
    selectAllTags: (state, action: PayloadAction<string[]>) => {
      state.selectedTags = action.payload;
    },
    clearSelection: (state) => {
      state.selectedTags = [];
    },
    deleteSelectedTags: (state) => {
      state.tags = state.tags.filter(
        (tag) => !state.selectedTags.includes(tag.id),
      );
      state.selectedTags = [];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setTags,
  setSelectedCategory,
  toggleTagSelection,
  selectAllTags,
  clearSelection,
  deleteSelectedTags,
  setSearchQuery,
} = tagSlice.actions;

export const selectTotalTagsCount = (state: { tag: TagState }) =>
  state.tag.tags.length;
export const selectSelectedTagsCount = (state: { tag: TagState }) =>
  state.tag.selectedTags.length;

export default tagSlice.reducer;
