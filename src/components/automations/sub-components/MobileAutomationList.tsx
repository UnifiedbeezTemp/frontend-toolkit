"use client";

import React from "react";
import Checkbox from "../../ui/CheckBox";
import ImageComponent from "../../ui/ImageComponent";
import {
  Automation,
  toggleAutomation,
  deleteAutomation,
  selectAllAutomations,
  clearSelectedAutomations,
} from "../../../store/slices/automationSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import { useRouter } from "next/navigation";

interface MobileAutomationListProps {
  currentAutomations: Automation[];
  icons: Record<string, string>;
}

export default function MobileAutomationList({
  currentAutomations,
  icons,
}: MobileAutomationListProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedAutomations = useAppSelector(
    (state) => state.automation.selectedAutomations,
  );

  const handleEdit = (automationId: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_AUTOMATIONS_LIBRARY_URL || "";
    if (baseUrl) {
      router.push(`${baseUrl}/automations/${automationId}`);
    }
  };

  return (
    <div className="sm:hidden px-[1.4rem] space-y-[1.6rem] mb-[1.6rem] mt-[2rem]">
      <div className="flex items-center gap-[.5rem]">
        <Checkbox
          checked={
            selectedAutomations.length === currentAutomations.length &&
            currentAutomations.length > 0
          }
          onChange={() => {
            if (selectedAutomations.length === currentAutomations.length) {
              dispatch(clearSelectedAutomations());
            } else {
              dispatch(
                selectAllAutomations(currentAutomations.map((a) => a.id)),
              );
            }
          }}
          size="sm"
        />
        <span className="text-[1.1rem]">Select all</span>
      </div>
      {currentAutomations.map((automation, idx) => {
        const isSelected = selectedAutomations.includes(automation.id);

        return (
          <div
            className="border border-border p-[1.2rem] rounded-[1.1rem] bg-white"
            key={automation.id}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[1rem]">
                <Checkbox
                  checked={isSelected}
                  onChange={() => dispatch(toggleAutomation(automation.id))}
                  size="sm"
                />
                <div className="border border-border rounded-[.3rem] overflow-hidden">
                  <ImageComponent
                    alt={automation.name}
                    src={automation.icon || icons.placeholder}
                    width={60}
                    height={60}
                    className="object-cover w-[3.7rem] h-[3.3rem]"
                  />
                </div>
                <div className="text-[1.3rem] font-medium">
                  {automation.name}
                </div>
              </div>

              <div className="flex items-center gap-[1px]">
                <button
                  onClick={() => handleEdit(automation.id)}
                  className="p-2 text-text-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
                >
                  <ImageComponent
                    alt={"edit"}
                    src={icons.editPen}
                    width={16}
                    height={16}
                    className="object-cover"
                  />
                </button>
                <button
                  onClick={() => dispatch(deleteAutomation(automation.id))}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <ImageComponent
                    alt={"delete"}
                    src={icons.trashRed || icons.placeholder}
                    width={16}
                    height={16}
                    className="object-cover"
                  />
                </button>
              </div>
            </div>

            <div className="pr-[1.9rem] pl-[2.7rem]">
              <div className="border-t border-border mt-[1.2rem] pt-[1.2rem] flex items-center justify-between">
                <div className="flex items-center gap-[.5rem]">
                  <ImageComponent
                    src={icons.user2}
                    alt=""
                    width={15}
                    height={15}
                  />
                  <span className="text-[1.4rem]">{automation.contact}</span>
                </div>

                <div className="w-[.5rem] h-[.5rem] rounded-full bg-inactive-color"></div>

                <div className="flex items-center gap-[.5rem]">
                  <ImageComponent
                    src={icons.envelope2}
                    alt=""
                    width={15}
                    height={15}
                  />
                  <span className="text-[1.4rem]">{automation.campaign}</span>
                </div>

                <div className="w-[.5rem] h-[.5rem] rounded-full bg-inactive-color"></div>

                <div className="flex items-center gap-[.5rem]">
                  <ImageComponent
                    src={icons.arrowClockwise}
                    alt=""
                    width={15}
                    height={15}
                  />
                  <span className="text-[1.4rem]">
                    {automation.conversion}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
