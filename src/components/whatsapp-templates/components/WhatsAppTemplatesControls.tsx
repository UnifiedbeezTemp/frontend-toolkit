import React, { useState, useRef } from "react";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import Input from "../../forms/Input";
import SearchIcon from "../../../assets/icons/SearchIcon";
import Button from "../../ui/Button";
import FunnelIcon from "../../../assets/icons/FunnelIcon";
import SmartDropdown from "../../smart-dropdown/SmartDropdown";

import { WhatsAppTemplatesControlsProps } from "../types";

const CATEGORIES = ["All", "Marketing", "Utility", "Authentication"];
const STATUSES = ["All", "Approved", "Pending", "Rejected"];

export default function WhatsAppTemplatesControls({
  searchQuery,
  onSearchChange,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  resetFilters,
}: WhatsAppTemplatesControlsProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const hasActiveFilters =
    categoryFilter !== "All" || statusFilter !== "All" || searchQuery !== "";

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between gap-[1.6rem] p-[1.6rem] sm:p-0 lg:p-[1.6rem] lg:mb-0 pb-0 lg:pb-[1.6rem] sm:mb-[1rem]">
      <div className="flex flex-col">
        <Heading className="text-[1.8rem] lg:text-[1.6rem] font-bold">
          Manage Whatsapp templates
        </Heading>
        <Text className="text-[1.4rem] text-gray-600">
          Connect as many channels as you like
        </Text>
      </div>

      <div className="flex items-center gap-[1.2rem]">
        <div className="relative flex-1 lg:w-[30rem]">
          <Input
            value={searchQuery}
            onChange={onSearchChange}
            leftIcon={<SearchIcon size={16} className="grayscale" />}
            placeholder="Search contacts"
            className="h-[4rem] text-inactive-color placeholder:text-inactive-color"
          />
        </div>

        <div className="relative">
          <Button
            ref={triggerRef}
            variant="secondary"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-[1rem] border rounded-[0.8rem] shrink-0 h-[4rem] w-[4rem] flex items-center justify-center transition-colors ${
              isFilterOpen || categoryFilter !== "All" || statusFilter !== "All"
                ? "border-brand-primary text-brand-primary bg-brand-primary/5"
                : "border-(--input-stroke)"
            }`}
          >
            <FunnelIcon size={16} />
          </Button>

          <SmartDropdown
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            triggerRef={triggerRef}
            className="min-w-[20rem]"
          >
            <div className="flex flex-col p-[0.8rem] gap-[1.2rem]">
              {hasActiveFilters && (
                <>
                  <button
                    onClick={() => {
                      resetFilters();
                      setIsFilterOpen(false);
                    }}
                    className="w-full px-[0.8rem] py-[0.6rem] text-left text-[1.4rem] font-bold text-brand-primary hover:bg-brand-primary/5 rounded-[0.4rem] transition-colors"
                  >
                    Reset all filters
                  </button>
                  <div className="h-[1px] bg-border mx-[0.8rem]" />
                </>
              )}
              <div className="flex flex-col gap-[0.4rem]">
                <span className="text-[1.2rem] font-bold text-text-primary uppercase px-[0.8rem]">
                  Status
                </span>
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-[0.8rem] py-[0.6rem] text-left text-[1.4rem] rounded-[0.4rem] hover:bg-black-5 transition-colors ${
                      statusFilter === status
                        ? "text-brand-primary font-bold bg-brand-primary/5"
                        : "text-text-secondary"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </SmartDropdown>
        </div>
      </div>
    </div>
  );
}
