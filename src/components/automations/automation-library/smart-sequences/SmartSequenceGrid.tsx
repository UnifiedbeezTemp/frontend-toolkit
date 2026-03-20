"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { SMART_SEQUENCE_INDUSTRIES } from "./types";
import SmartSequenceCard from "./SmartSequenceCard";
import SmartSequenceDetailsModal from "./SmartSequenceDetailsModal";
import { useSmartSequenceGrid } from "./hooks/useSmartSequenceGrid";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import Input from "../../../forms/Input";
import { SmartDropdown, DropdownItem } from "../../../smart-dropdown";
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon";
import Button from "../../../ui/Button";

export default function SmartSequenceGrid() {
  const icons = useSupabaseIcons();
  const industryTriggerRef = useRef<HTMLButtonElement>(null);

  const {
    searchQuery,
    setSearchQuery,
    selectedIndustry,
    setSelectedIndustry,
    isIndustryOpen,
    setIsIndustryOpen,
    filteredSequences,
    selectedSequence,
    isModalOpen,
    handleCardClick,
    handleUseSequence,
    handleCloseModal,
    handleGoToDashboard,
  } = useSmartSequenceGrid();

  return (
    <div className="flex flex-col gap-[3.2rem]">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-[1.6rem]">
        <div className="flex items-center gap-[1.2rem] w-full md:w-auto flex-1">
          <Input
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search smart sequences"
            className="w-full bg-[var(--primary)] border-[var(--input-stroke)]"
            leftIcon={
              <Image
                src={icons.searchIg || ""}
                alt="search"
                width={18}
                height={18}
              />
            }
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-[1.2rem] w-full md:w-auto">
          <div className="relative">
            <button
              ref={industryTriggerRef}
              onClick={() => setIsIndustryOpen(!isIndustryOpen)}
              className="flex items-center gap-[1.2rem] px-[1.6rem] py-[1rem] rounded-[0.8rem] border border-[var(--input-stroke)] bg-[var(--primary)] hover:bg-[var(--gray-50)] transition-all min-w-[16rem] justify-between"
            >
              <div className="flex items-center gap-[0.8rem]">
                <Image
                  src={icons.filterLinesIcon || ""}
                  alt=""
                  width={16}
                  height={16}
                />
                <span className="text-[1.4rem] font-bold text-[var(--text-primary)]">
                  {selectedIndustry}
                </span>
              </div>
              <ChevronDownIcon
                size={16}
                className="text-[var(--text-secondary)]"
              />
            </button>

            <SmartDropdown
              isOpen={isIndustryOpen}
              onClose={() => setIsIndustryOpen(false)}
              triggerRef={industryTriggerRef}
              placement="bottom-end"
              className="!w-[20rem]"
            >
              <div className="p-2 flex flex-col gap-1">
                {SMART_SEQUENCE_INDUSTRIES.map((industry) => (
                  <DropdownItem
                    key={industry}
                    onClick={() => {
                      setSelectedIndustry(industry);
                      setIsIndustryOpen(false);
                    }}
                    className={
                      selectedIndustry === industry ? "bg-[var(--accent)]" : ""
                    }
                  >
                    <span className="text-[1.4rem] font-medium">
                      {industry}
                    </span>
                  </DropdownItem>
                ))}
              </div>
            </SmartDropdown>
          </div>

          <Button
            onClick={handleGoToDashboard}
            className="grad-btn whitespace-nowrap h-[4rem] text-[1.4rem] px-[2rem] font-bold shadow-md"
          >
            + Create Automation
          </Button>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-[2rem] font-bold text-[var(--text-primary)]">
        {selectedIndustry}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem]">
        {filteredSequences.map((seq) => (
          <SmartSequenceCard
            key={seq.id}
            sequence={seq}
            onUse={handleCardClick}
          />
        ))}
      </div>

      {filteredSequences.length === 0 && (
        <div className="py-[10rem] flex flex-col items-center justify-center text-center">
          <p className="text-[1.8rem] text-[var(--text-secondary)] font-medium">
            No sequences found matching your search.
          </p>
        </div>
      )}

      {/* Sequence Details Modal */}
      <SmartSequenceDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        sequence={selectedSequence}
        onUseSequence={handleUseSequence}
      />
    </div>
  );
}
