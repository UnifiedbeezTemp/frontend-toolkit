import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface Contact {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  dateCreated: string;
  status: "active" | "unconfirmed" | "unsubscribed" | "bounced";
  avatar?: string;
  list?: string;
}

export interface ContactState {
  contacts: Contact[];
  selectedContacts: string[];
  searchQuery: string;
  selectedStatus: "all" | "active" | "unconfirmed" | "unsubscribed" | "bounced";
}

const initialState: ContactState = {
  contacts: [],
  selectedContacts: [],
  searchQuery: "",
  selectedStatus: "all",
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
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.unshift(action.payload);
    },
    deleteContacts: (state, action: PayloadAction<string[]>) => {
      const idsToDelete = action.payload;
      state.contacts = state.contacts.filter(
        (contact) => !idsToDelete.includes(contact.id),
      );
      state.selectedContacts = state.selectedContacts.filter(
        (id) => !idsToDelete.includes(id),
      );
    },
  },
});

export const selectFilteredContacts = createSelector(
  [
    (state: RootState) => state?.contact?.contacts || [],
    (state: RootState) => state?.contact?.searchQuery || "",
    (state: RootState) => state?.contact?.selectedStatus || "all",
  ],
  (contacts, searchQuery, selectedStatus) => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.username.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || contact.status === selectedStatus;

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
  addContact,
  deleteContacts,
} = contactSlice.actions;

export default contactSlice.reducer;
