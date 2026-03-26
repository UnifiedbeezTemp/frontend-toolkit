import { useState, useMemo, useEffect } from "react";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../store/hooks/useRedux";
import { RootState } from "../../../../store";
import {
  setContacts,
  toggleContactSelection,
  setSearchQuery as setReduxSearchQuery,
  setSelectedStatus as setReduxSelectedStatus,
  selectAllContacts,
  deleteContacts,
  selectFilteredContacts,
} from "../../../../store/slices/contactSlice";
import type { ContactState } from "../../../../store/slices/contactSlice";
import { mockContacts as initialMockContacts } from "../utils/mockContacts";
import { ContactStatus } from "../types";

export function useContactsTable() {
  const dispatch = useAppDispatch();
  const contactsData = useAppSelector(
    (state: RootState) => state.contact.contacts,
  );
  const selectedContacts = useAppSelector(
    (state: RootState) => state.contact.selectedContacts,
  );
  const searchQuery = useAppSelector(
    (state: RootState) => state.contact.searchQuery,
  );
  const selectedStatus = useAppSelector(
    (state: RootState) => state.contact.selectedStatus,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (contactsData.length === 0) {
      dispatch(setContacts(initialMockContacts));
    }
  }, [dispatch, contactsData.length]);

  const filteredContacts = useAppSelector(selectFilteredContacts);

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredContacts.slice(start, start + itemsPerPage);
  }, [filteredContacts, currentPage]);

  const toggleSelection = (id: string) => {
    dispatch(toggleContactSelection(id));
  };

  const toggleSelectAll = () => {
    if (
      selectedContacts.length === paginatedContacts.length &&
      paginatedContacts.length > 0
    ) {
      dispatch(selectAllContacts([]));
    } else {
      dispatch(selectAllContacts(paginatedContacts.map((c) => c.id)));
    }
  };

  const deleteSelected = () => {
    dispatch(deleteContacts(selectedContacts));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const setSearchQuery = (query: string) => {
    dispatch(setReduxSearchQuery(query));
    setCurrentPage(1);
  };

  const setSelectedStatus = (status: ContactStatus | "all") => {
    dispatch(setReduxSelectedStatus(status as ContactState["selectedStatus"]));
    setCurrentPage(1);
  };

  return {
    contacts: paginatedContacts,
    selectedContacts,
    searchQuery,
    setSearchQuery,
    selectedStatus: selectedStatus as ContactStatus | "all",
    setSelectedStatus,
    currentPage,
    totalPages,
    toggleSelection,
    toggleSelectAll,
    handlePageChange,
    deleteSelected,
    totalCount: filteredContacts.length,
  };
}
