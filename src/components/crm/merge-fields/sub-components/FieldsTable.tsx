"use client";

import { MergeField } from "../types";
import FieldsTableRow from "./FieldsTableRow";
import MobileFieldCard from "./MobileFieldCard";
import CheckBox from "../../../ui/CheckBox";
import { cn } from "../../../../lib/utils";
import FieldsEmptyState from "./FieldsEmptyState";
import { FIELD_TABLE_HEADERS } from "../constants";

interface FieldsTableProps {
  fields: MergeField[];
  selectedFields: string[];
  toggleFieldSelection: (id: string) => void;
  toggleAllSelection: () => void;
  isLoading: boolean;
  onViewDetails: (field: MergeField) => void;
}

export default function FieldsTable({
  fields,
  selectedFields,
  toggleFieldSelection,
  toggleAllSelection,
  isLoading,
  onViewDetails,
}: FieldsTableProps) {
  const allSelected =
    fields.length > 0 && selectedFields.length === fields.length;

  if (isLoading) {
    return (
      <div className="p-[4rem] text-center">
        <p className="text-[1.4rem] text-muted animate-pulse">
          Loading fields...
        </p>
      </div>
    );
  }

  if (fields.length === 0) {
    return (
      <FieldsEmptyState message="No merge fields found. Try adjusting your filters or add a new field." />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="w-full overflow-x-auto custom-scrollbar hidden sm:block">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-input-filled">
              <th className="p-[1.6rem] w-[4.8rem]">
                <CheckBox
                  checked={allSelected}
                  onChange={toggleAllSelection}
                  className="w-[1.8rem] h-[1.8rem] rounded-[0.4rem]"
                />
              </th>
              {FIELD_TABLE_HEADERS.map((header, index) => (
                <th
                  key={index}
                  className={cn(
                    "p-[1.6rem] text-[1.2rem] font-bold text-dark-base-70 whitespace-nowrap",
                    index < FIELD_TABLE_HEADERS.length - 1 &&
                      "border-r border-border",
                    header.className,
                  )}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {fields.map((field) => (
              <FieldsTableRow
                key={field.id}
                field={field}
                isSelected={selectedFields.includes(field.id)}
                onToggle={() => toggleFieldSelection(field.id)}
                onViewDetails={() => onViewDetails(field)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="flex flex-col gap-[1rem] p-[1rem] sm:hidden">
        {fields.map((field) => (
          <MobileFieldCard
            key={field.id}
            field={field}
            isSelected={selectedFields.includes(field.id)}
            onToggle={() => toggleFieldSelection(field.id)}
            onViewDetails={() => onViewDetails(field)}
          />
        ))}
      </div>
    </>
  );
}
