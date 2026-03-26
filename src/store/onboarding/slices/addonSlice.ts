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

const addonKey = (addon: Pick<Addon, "addonType" | "id">) =>
  addon.addonType || addon.id;

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
      action: PayloadAction<{ addon: Addon; quantity: number }>,
    ) => {
      const { addon, quantity } = action.payload;
      const key = addonKey(addon);
      const existingIndex = state.selectedAddons.findIndex(
        (a) => addonKey(a) === key,
      );

      if (existingIndex >= 0) {
        state.selectedAddons[existingIndex] = {
          ...state.selectedAddons[existingIndex],
          ...addon,
          used: quantity,
        };
      } else {
        state.selectedAddons.push({ ...addon, used: quantity });
      }
    },
    removeAddon: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      state.selectedAddons = state.selectedAddons.filter(
        (addon) => addon.id !== key && addon.addonType !== key,
      );
    },
    updateAddonQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const addon = state.selectedAddons.find(
        (a) => a.id === id || a.addonType === id,
      );
      if (addon) {
        const cappedQuantity =
          addon.limit === -1 ? quantity : Math.min(quantity, addon.limit);
        addon.used = Math.max(1, cappedQuantity);
      }
    },
    openCheckoutModal: (state) => {
      state.isCheckoutModalOpen = true;
    },
    closeCheckoutModal: (state) => {
      state.isCheckoutModalOpen = false;
    },
    hydrateAddons: (state, action: PayloadAction<Addon[]>) => {
      const purchased = action.payload;
      const purchasedKeys = new Set(purchased.map((p) => addonKey(p)));
      const localNew = state.selectedAddons.filter(
        (a) => !purchasedKeys.has(addonKey(a)),
      );
      state.selectedAddons = [...purchased, ...localNew];

      if (state.tempAddon) {
        const updated = state.selectedAddons.find(
          (a) => addonKey(a) === addonKey(state.tempAddon as Addon),
        );
        if (updated) {
          state.tempAddon = updated;
        }
      }
    },
    clearSelectedAddons: (state) => {
      state.selectedAddons = [];
      state.tempAddon = null;
      state.tempQuantity = 1;
      state.isAddModalOpen = false;
      state.isCheckoutModalOpen = false;
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
  clearSelectedAddons,
} = addonSlice.actions;

export default addonSlice.reducer;
