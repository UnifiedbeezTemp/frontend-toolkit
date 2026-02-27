"use client";

import React from "react";
import WhatsAppTemplatesRow from "./WhatsAppTemplatesRow";
import { WhatsAppTemplate } from "../types";
import CheckBox from "../../ui/CheckBox";

interface WhatsAppTemplatesTableProps {
  templates: WhatsAppTemplate[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleAll: () => void;
  onDelete: (id: string) => void;
}

export default function WhatsAppTemplatesTable({
  templates,
  selectedIds,
  onToggleSelect,
  onToggleAll,
  onDelete,
}: WhatsAppTemplatesTableProps) {
  const allSelected =
    templates.length > 0 && selectedIds.length === templates.length;

  return (
    <div className="bg-primary sm:border lg:border-0 rounded-0 rounded-se-[1rem] rounded-ss-[1rem] lg:rounded-[0] lg:border-t border-border overflow-hidden">
      <div className="hidden sm:grid grid-cols-[auto_2fr_1fr_1fr_auto] items-center gap-[1.6rem] px-[2.4rem] py-[1.2rem] bg-gray-50  border-border">
        <CheckBox checked={allSelected} onChange={onToggleAll} />
        <div className="text-[1.2rem] font-medium text-gray-600">Name</div>
        <div className="text-[1.2rem] font-medium text-gray-600">Language</div>
        <div className="text-[1.2rem] font-medium text-gray-600">Status</div>
        <div className="text-[1.2rem] font-medium text-gray-600 w-[6rem] text-center">
          Action
        </div>
      </div>
      <div>
        {templates.map((tmpl) => (
          <WhatsAppTemplatesRow
            key={tmpl.id}
            template={tmpl}
            isSelected={selectedIds.includes(tmpl.id)}
            onToggle={onToggleSelect}
            onDelete={() => onDelete(tmpl.id)}
          />
        ))}
      </div>
    </div>
  );
}
