import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface Contact {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  dateCreated: string;
  status: "Active" | "Unconfirmed" | "Unsubscribed" | "Bounced";
  avatar?: string;
}

export interface ContactState {
  contacts: Contact[];
  selectedContacts: string[];
  searchQuery: string;
  selectedStatus: "All" | "Active" | "Unconfirmed" | "Unsubscribed" | "Bounced";
}

const initialState: ContactState = {
  contacts: [],
  selectedContacts: [],
  searchQuery: "",
  selectedStatus: "All",
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    toggleContactSelection: (state, action: PayloadAction<string>) => {
      const contactId = action.payload;
      const index = state.selectedContacts.indexOf(contactId);
      if (index > -1) {
        state.selectedContacts.splice(index, 1);
      } else {
        state.selectedContacts.push(contactId);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedStatus: (
      state,
      action: PayloadAction<ContactState["selectedStatus"]>,
    ) => {
      state.selectedStatus = action.payload;
    },
    selectAllContacts: (state, action: PayloadAction<string[]>) => {
      state.selectedContacts = action.payload;
    },
    clearSelection: (state) => {
      state.selectedContacts = [];
    },
  },
});

export const selectFilteredContacts = createSelector(
  [
    (state: RootState) => state?.contact?.contacts || [],
    (state: RootState) => state?.contact?.searchQuery || "",
    (state: RootState) => state?.contact?.selectedStatus || "All",
  ],
  (contacts, searchQuery, selectedStatus) => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "All" || contact.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  },
);

export const selectTotalContactsCount = (state: RootState) =>
  state?.contact?.contacts?.length || 0;

export const selectSelectedContactsCount = (state: RootState) =>
  state?.contact?.selectedContacts?.length || 0;

export const {
  setContacts,
  toggleContactSelection,
  setSearchQuery,
  setSelectedStatus,
  selectAllContacts,
  clearSelection,
} = contactSlice.actions;

export default contactSlice.reducer;
