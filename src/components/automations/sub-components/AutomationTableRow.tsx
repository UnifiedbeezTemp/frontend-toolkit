"use client";

import React from "react";
import Image from "next/image";
import {
  Automation,
  toggleAutomation,
  deleteAutomation,
} from "../../../store/slices/automationSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import Checkbox from "../../ui/CheckBox";
import ImageComponent from "../../ui/ImageComponent";

interface AutomationTableRowProps {
  automation: Automation;
  isLast: boolean;
}

export default function AutomationTableRow({
  automation,
  isLast,
}: AutomationTableRowProps) {
  const dispatch = useAppDispatch();
  const selectedAutomations = useAppSelector(
    (state) => state.automation.selectedAutomations,
  );
  const isSelected = selectedAutomations.includes(automation.id);

  return (
    <tr className={isLast ? "" : "border-b border-border"}>
      <td className="py-4 px-4 border-r border-border">
        <div className="flex items-center gap-[10px]">
          <Checkbox
            checked={isSelected}
            onChange={() => dispatch(toggleAutomation(automation.id))}
            size="sm"
          />
          <div className="border border-border rounded-[.3rem] overflow-hidden">
            <ImageComponent
              alt={automation.name}
              src={automation.icon || ""}
              width={40}
              height={40}
              className="object-cover w-[3.7rem] h-[3.3rem]"
            />
          </div>
          <span className="text-[1.3rem] font-medium text-text-primary">
            {automation.name}
          </span>
        </div>
      </td>
      <td className="py-4 px-4 border-r border-border">
        <span
          className={`px-[0.8rem] py-[0.2rem] rounded-full text-[1.1rem] font-medium ${
            automation.status === "active"
              ? "bg-success/10 text-success"
              : "bg-inactive-color/10 text-inactive-color"
          }`}
        >
          {automation.status.charAt(0).toUpperCase() +
            automation.status.slice(1)}
        </span>
      </td>
      <td className="py-4 px-4 border-r border-border text-[1.3rem] text-text-primary text-center">
        {automation.contact}
      </td>
      <td className="py-4 px-4 border-r border-border text-[1.3rem] text-text-primary text-center">
        {automation.campaign}
      </td>
      <td className="py-4 px-4 border-r border-border text-[1.3rem] text-text-primary text-center">
        {automation.conversion}%
      </td>
      <td className="py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button className="p-2 hover:bg-brand-primary/10 rounded-lg transition-colors">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button
            onClick={() => dispatch(deleteAutomation(automation.id))}
            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
