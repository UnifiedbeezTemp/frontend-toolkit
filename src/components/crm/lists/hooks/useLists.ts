import { useState, useMemo } from "react";
import { CRMList } from "../types";
import { MarketingChannel } from "../../shared/types";
import { AUTOMATION_TYPES } from "../../../../constants/automations";
import { generateDummyLists } from "../utils";

const INITIAL_DATA = generateDummyLists();

export function useLists() {
  const [allLists, setAllLists] = useState<CRMList[]>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<string>(AUTOMATION_TYPES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [channelFilter, setChannelFilter] = useState<MarketingChannel | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredLists = useMemo(() => {
    return allLists.filter((list) => {
      const matchesTab = list.category === activeTab;
      const matchesSearch = list.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesChannel =
        !channelFilter || list.marketingChannel === channelFilter;
      return matchesTab && matchesSearch && matchesChannel;
    });
  }, [allLists, activeTab, searchQuery, channelFilter]);

  const totalPages = Math.ceil(filteredLists.length / itemsPerPage);

  const paginatedLists = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLists.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLists, currentPage]);

  const toggleListSelection = (id: string) => {
    setSelectedLists((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleAllSelection = () => {
    if (selectedLists.length === paginatedLists.length) {
      setSelectedLists([]);
    } else {
      setSelectedLists(paginatedLists.map((l) => l.id));
    }
  };

  const selectAll = () => {
    setSelectedLists(paginatedLists.map((l) => l.id));
  };

  const clearSelection = () => {
    setSelectedLists([]);
  };

  const deleteSelected = () => {
    setAllLists((prev) =>
      prev.filter((list) => !selectedLists.includes(list.id)),
    );
    setSelectedLists([]);
  };

  const addList = (newList: CRMList) => {
    setAllLists((prev) => [newList, ...prev]);
    setActiveTab(newList.category);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setChannelFilter(null);
    setSelectedLists([]);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleChannelFilter = (channel: MarketingChannel | null) => {
    setChannelFilter(channel);
    setCurrentPage(1);
  };

  return {
    activeTab,
    setActiveTab: handleTabChange,
    searchQuery,
    setSearchQuery: handleSearchChange,
    lists: paginatedLists,
    selectedLists,
    toggleListSelection,
    toggleAllSelection,
    selectAll,
    clearSelection,
    deleteSelected,
    isLoading: false,
    currentPage,
    setCurrentPage,
    totalPages,
    addList,
    channelFilter,
    setChannelFilter: handleChannelFilter,
  };
}
