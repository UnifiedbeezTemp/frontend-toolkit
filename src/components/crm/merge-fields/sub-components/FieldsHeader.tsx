"use client";

import SearchIcon from "../../../../assets/icons/SearchIcon";
import FunnelIcon from "../../../../assets/icons/FunnelIcon";
import PlusIcon from "../../../../assets/icons/PlusIcon";
import Button from "../../../ui/Button";
import Input from "../../../forms/Input";
import MoreVerticalIcon from "../../../../assets/icons/MoreVerticalIcon";
import { SmartDropdown, DropdownItem } from "../../../smart-dropdown";
import { useMergeFieldsHeader } from "../hooks/useMergeFieldsHeader";
import CheckBox from "../../../ui/CheckBox";

interface FieldsHeaderProps {
  activeTab: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onAddField: () => void;
  typeFilter: string | null;
  onTypeFilter: (type: string | null) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDeleteSelected: () => void;
  selectedCount: number;
}

export default function FieldsHeader({
  activeTab,
  searchQuery,
  onSearchChange,
  onAddField,
  typeFilter,
  onTypeFilter,
  onSelectAll,
  onClearSelection,
  onDeleteSelected,
  selectedCount,
}: FieldsHeaderProps) {
  const {
    isFilterOpen,
    setIsFilterOpen,
    isActionsOpen,
    setIsActionsOpen,
    filterTriggerRef,
    actionsTriggerRef,
    fieldTypes,
    handleFilterSelect,
    handleSelectAll,
    handleClearSelection,
    handleDeleteSelected,
  } = useMergeFieldsHeader(
    typeFilter,
    onTypeFilter,
    onSelectAll,
    onClearSelection,
    onDeleteSelected,
    selectedCount,
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[1.6rem] p-[1.2rem] border-b border-border">
      <div className="flex items-center gap-[0.8rem]">
        <span className="text-[1.6rem] font-semibold text-dark">
          Merge Fields
        </span>
        <div className="border border-border text-dark-base-70 px-[0.8rem] py-[0.2rem] text-[1.2rem] rounded-full capitalize">
          {activeTab}
        </div>
      </div>

      <div className="flex items-center gap-[1.2rem] w-full sm:w-auto">
        <Button
          variant="primary"
          className="grad-btn flex items-center gap-[1rem]"
          onClick={onAddField}
        >
          <PlusIcon className="" />
          <span>Add Fields</span>
        </Button>

        <div className="relative flex-1 sm:w-[24rem]">
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search contacts"
            className=""
            leftIcon={<SearchIcon className="" />}
          />
        </div>

        <Button
          variant="secondary"
          className=""
          ref={filterTriggerRef}
          onClick={() => setIsFilterOpen(true)}
        >
          <FunnelIcon className="h-[2rem] w-[2rem] text-text-primary" />
        </Button>
        <SmartDropdown
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          triggerRef={filterTriggerRef}
          maxHeight="24rem"
          className="min-w-[18rem]"
        >
          <div className="p-[0.4rem]">
            <DropdownItem
              onClick={() => handleFilterSelect(null)}
              className={!typeFilter ? "bg-accent" : ""}
            >
              <span className="text-[1.4rem]">All Types</span>
            </DropdownItem>
            {fieldTypes.map((type) => (
              <DropdownItem
                key={type}
                onClick={() => handleFilterSelect(type)}
                className={typeFilter === type ? "bg-accent" : ""}
              >
                <span className="text-[1.4rem]">{type}</span>
              </DropdownItem>
            ))}
          </div>
        </SmartDropdown>

        <Button
          variant="secondary"
          className="border-0"
          ref={actionsTriggerRef}
          onClick={() => setIsActionsOpen(true)}
        >
          <MoreVerticalIcon size={20} />
        </Button>
        <SmartDropdown
          isOpen={isActionsOpen}
          onClose={() => setIsActionsOpen(false)}
          triggerRef={actionsTriggerRef}
          maxHeight="24rem"
          className="min-w-[18rem]"
        >
          <div className="p-[0.4rem]">
            <DropdownItem onClick={handleSelectAll}>
              <CheckBox
                checked={false}
                onChange={handleSelectAll}
                className="w-[1.6rem] h-[1.6rem]"
              />
              <span className="text-[1.4rem]">Select All</span>
            </DropdownItem>
            <DropdownItem
              onClick={handleClearSelection}
              disabled={selectedCount === 0}
            >
              <span className="text-[1.4rem]">Clear Selection</span>
            </DropdownItem>
            <DropdownItem
              onClick={handleDeleteSelected}
              disabled={selectedCount === 0}
            >
              <span className="text-[1.4rem] text-destructive">
                Delete Selected ({selectedCount})
              </span>
            </DropdownItem>
          </div>
        </SmartDropdown>
      </div>
    </div>
  );
}
