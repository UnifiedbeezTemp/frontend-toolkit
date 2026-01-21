import { useState, useMemo, useEffect } from "react";
import { QuickFilterOption } from "../../components/QuickFilterBar";
import { GENERAL_FILTERS, TEAM_FILTERS } from "../constants";

type InboxType = 'general' | 'team';
type ActiveDropdownState = 'NONE' | 'MAIN' | 'TAGS';

export const useInboxFilters = (inboxType: InboxType = 'general') => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdownState>('NONE');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const quickFilterOptions = useMemo(() => {
    return inboxType === 'team' ? TEAM_FILTERS : GENERAL_FILTERS;
  }, [inboxType]);

  const [activeFilter, setActiveFilter] = useState<QuickFilterOption>(quickFilterOptions[0]);
  const [selectedSubFilters, setSelectedSubFilters] = useState<string[]>([]);
  
  useEffect(() => {
    setActiveFilter(quickFilterOptions[0]);
    setSelectedSubFilters([]);
  }, [inboxType, quickFilterOptions]);

  const handleFilterSelect = (filter: QuickFilterOption) => {
    setActiveFilter(filter);
  };
  
  const handleSubFilterToggle = (value: string) => {
      setSelectedSubFilters(prev => 
        prev.includes(value) 
          ? [] 
          : [value]
      );
  };

  const handleMainFilterOptionSelect = (option: { label: string, value: string }) => {
     if (option.value === 'tags') {
         setActiveDropdown('TAGS');
     } else {
         setActiveDropdown('NONE');
     }
  }

  const toggleMainDropdown = () => {
      setActiveDropdown(prev => prev === 'NONE' ? 'MAIN' : 'NONE');
  }
  
  const closeAllDropdowns = () => {
      setActiveDropdown('NONE');
  }

  return {
    activeDropdown,
    selectedTags,
    setSelectedTags,
    quickFilterOptions,
    activeFilter,
    selectedSubFilters,
    handleFilterSelect,
    handleSubFilterToggle,
    handleMainFilterOptionSelect,
    toggleMainDropdown,
    closeAllDropdowns
  };
};
