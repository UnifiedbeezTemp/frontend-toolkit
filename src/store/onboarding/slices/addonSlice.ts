import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Addon } from "../types/addonTypes";

export interface AddonState {
  selectedAddons: Addon[];
  tempAddon: Addon | null;
  tempQuantity: number;
  isAddModalOpen: boolean;
  isCheckoutModalOpen: boolean;
}

const initialState: AddonState = {
  selectedAddons: [],
  tempAddon: null,
  tempQuantity: 1,
  isAddModalOpen: false,
  isCheckoutModalOpen: false,
};

const addonSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    openAddModal: (state, action: PayloadAction<Addon>) => {
      state.tempAddon = action.payload;
      state.tempQuantity = action.payload.used || 1;
      state.isAddModalOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
      state.tempAddon = null;
    },
    updateTempQuantity: (state, action: PayloadAction<number>) => {
      state.tempQuantity = Math.max(1, action.payload);
    },
    addAddon: (
      state,
      action: PayloadAction<{ addon: Addon; quantity: number }>
    ) => {
      const { addon, quantity } = action.payload;
      const existingIndex = state.selectedAddons.findIndex(
        (a) => a.id === addon.id
      );

      if (existingIndex >= 0) {
        state.selectedAddons[existingIndex].used = quantity;
      } else {
        state.selectedAddons.push({ ...addon, used: quantity });
      }
    },
    removeAddon: (state, action: PayloadAction<string>) => {
      state.selectedAddons = state.selectedAddons.filter(
        (addon) => addon.id !== action.payload
      );
    },
    updateAddonQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const addon = state.selectedAddons.find((a) => a.id === id);
      if (addon) {
        addon.used = Math.max(1, Math.min(quantity, addon.limit));
      }
    },
    openCheckoutModal: (state) => {
      state.isCheckoutModalOpen = true;
    },
    closeCheckoutModal: (state) => {
      state.isCheckoutModalOpen = false;
    },
    hydrateAddons: (state, action: PayloadAction<Addon[]>) => {
      state.selectedAddons = action.payload;
    },
  },
});

export const {
  openAddModal,
  closeAddModal,
  updateTempQuantity,
  addAddon,
  removeAddon,
  updateAddonQuantity,
  openCheckoutModal,
  closeCheckoutModal,
  hydrateAddons,
} = addonSlice.actions;

export default addonSlice.reducer;
