import { useRef } from "react";
import CheckMarkIcon from "../../../assets/icons/CheckMarkIcon";
import InboxSearchBar from "../components/SearchBar";
import FunnelIcon from "../../../assets/icons/FunnelIcon";
import IconButton from "../../ui/IconButton";
import { SmartDropdown } from "../../smart-dropdown";
import { QuickFilterBar } from "../components/QuickFilterBar";
import { FilterOptionList } from "../components/FilterOptionList";
import { CRMTags } from "../components/crm-tags/CRMTags";
import { useInboxFilters } from "./hooks/useInboxFilters";
import { MAIN_FILTER_OPTIONS } from "./constants";
import { InboxSearchAndFiltersProps } from "./types";
import { useConversations } from "@/app/inbox/context/ConversationContext";
import { useEffect } from "react";

export const InboxSearchAndFilters = ({
  inboxType = "general",
}: InboxSearchAndFiltersProps) => {
  const dropdownTriggerRef = useRef(null);
  const { searchQuery, setSearchQuery, setActiveFilter } = useConversations();

  const {
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
    closeAllDropdowns,
  } = useInboxFilters(inboxType);

  useEffect(() => {
    setActiveFilter(activeFilter.label);
  }, [activeFilter, setActiveFilter]);

  return (
    <div className="flex flex-col gap-3 px-4 pb-4 bg-primary border-b border-gray-100 mt-2">
      <div className="flex gap-2 items-center">
        <InboxSearchBar
          value={searchQuery}
          placeholder="Search inbox"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="grow shrink"
        />

        {inboxType === "general" && (
          <>
            <IconButton
              onClick={toggleMainDropdown}
              ref={dropdownTriggerRef}
              variant="secondary"
              ariaLabel="toggle filters"
              className="shrink-0"
              icon={<FunnelIcon className="text-input-stroke" />}
            />

            {activeDropdown === "MAIN" && (
              <SmartDropdown
                isOpen={true}
                onClose={closeAllDropdowns}
                triggerRef={dropdownTriggerRef}
                className="min-w-60 -mt-1"
                placement="bottom-end"
                maxHeight="30rem"
              >
                <FilterOptionList<string, string>
                  options={MAIN_FILTER_OPTIONS}
                  value={""}
                  onChange={(opt) => handleMainFilterOptionSelect(opt)}
                  icon={CheckMarkIcon}
                />
              </SmartDropdown>
            )}

            {activeDropdown === "TAGS" && (
              <CRMTags
                isOpen={true}
                onClose={closeAllDropdowns}
                triggerRef={dropdownTriggerRef}
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
                className="w-[90dvw]! max-w-[40rem] -mt-1"
              />
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <QuickFilterBar
          options={quickFilterOptions}
          onSelect={handleFilterSelect}
          selectedOption={activeFilter}
          selectedDropdownOptions={selectedSubFilters}
          handleDropdownOptionSelect={(opt) => handleSubFilterToggle(opt.value)}
        />
      </div>
    </div>
  );
};
