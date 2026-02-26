"use client";

import Image from "next/image";
import {
  Automation,
  toggleAutomation,
  deleteAutomation,
} from "../../../store/slices/automationSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import Checkbox from "../../ui/CheckBox";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { useRouter } from "next/navigation";

interface AutomationTableRowProps {
  automation: Automation;
  isLast: boolean;
}

export default function AutomationTableRow({
  automation,
  isLast,
}: AutomationTableRowProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedAutomations = useAppSelector(
    (state) => state.automation.selectedAutomations,
  );
  const isSelected = selectedAutomations.includes(automation.id);
  const supabaseIcons = useSupabaseIcons();

  const handleEdit = () => {
    const baseUrl = process.env.NEXT_PUBLIC_AUTOMATIONS_LIBRARY_URL || "";
    if (baseUrl) {
      router.push(`${baseUrl}/automations/${automation.id}`);
    }
  };

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
              : "bg-destructive/10 text-destructive"
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
          <button
            onClick={handleEdit}
            className="p-2 hover:bg-brand-primary/10 rounded-lg transition-colors"
          >
            <Image
              alt={"edit"}
              src={supabaseIcons.editPen}
              width={20}
              height={20}
              className="object-cover"
            />
          </button>
          <button
            onClick={() => dispatch(deleteAutomation(automation.id))}
            className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
          >
            <Image
              alt={"delete"}
              src={supabaseIcons.trashRed}
              width={20}
              height={20}
              className="object-cover"
            />
          </button>
        </div>
      </td>
    </tr>
  );
}
