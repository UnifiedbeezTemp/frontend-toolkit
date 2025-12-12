"use client";

import Button from "../../ui/Button";
import Checkbox from "../../ui/CheckBox";
import ImageComponent from "../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { cn } from "../../../lib/utils";
import { useAppSelector } from "../../../store/hooks/useRedux";
import RoleDropdown from "../RoleDropdown";

interface InvitedBulkActionsProps {
  selectedCount: number;
  total: number;
  hasFilter: boolean;
  onSelectAll: () => void;
  onClear: () => void;
  onAssignRole: (roleId: number) => void;
  onBulkSend: () => void;
}

export function InvitedBulkActions({
  selectedCount,
  total,
  hasFilter,
  onSelectAll,
  onClear,
  onAssignRole,
  onBulkSend,
  isSending,
}: InvitedBulkActionsProps & { isSending?: boolean }) {
  if (!hasFilter) {
    return null;
  }

  const isAllSelected = selectedCount === total && total > 0;
  const supabaseIcons = useSupabaseIcons();
  const roles = useAppSelector((state) => state.members.roles);
  
  return (
    <div className="space-y-[1.2rem]">
      <div className="bg-input-filled rounded-[0.8rem] p-[0.8rem] flex items-center justify-between">
        <div className="flex items-center gap-[1.6rem]">
          <button
            onClick={onSelectAll}
            className={`w-[1.6rem] h-[1.6rem] rounded-[0.4rem] border flex items-center justify-center transition-colors ${
              isAllSelected
                ? "bg-brand-primary border-brand-primary"
                : "border-border bg-primary"
            }`}
          >
            {isAllSelected && (
              <ImageComponent
                alt="checkbox"
                src={supabaseIcons.checkbox}
                width={16}
                height={16}
                className="object-cover"
              />
            )}
          </button>
          <p className="text-[14px] text-text-primary leading-[1.96rem]">
            Select all Invites
          </p>
        </div>

        <p className="text-[14px] text-text-primary">{total} Total</p>
      </div>

      {selectedCount > 0 && (
        <div className="flex items-center justify-between flex-wrap gap-[1rem] bg-input-filled px-[1.6rem] py-[0.8rem] rounded-[0.8rem] border border-primary-50 bg-soft-green">
          <div className="flex items-center gap-[0.8rem] text-[1.4rem] text-text-primary">
            <span className="font-[400] flex items-center text-brand-primary gap-[0.8rem]">
              {" "}
              <ImageComponent
                alt="mail"
                src={supabaseIcons.mail}
                width={16}
                height={16}
                className="object-cover"
              />{" "}
              {selectedCount} members selected
            </span>
          </div>

          <div className="flex items-center gap-[0.8rem]">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClear}
              className={cn(
                "rounded-[0.4rem] px-[1.6rem] py-[0.8rem]",
                "text-[1.4rem] border border-input-stroke"
              )}
            >
              Clear selection
            </Button>

            <RoleDropdown
              currentRole={roles[0]?.type ?? ""}
              onRoleChange={(role) => {
                const roleObj = roles.find((r) => r.type === role) ?? roles[0];
                if (roleObj) {
                  onAssignRole(roleObj.id);
                }
              }}
              disabled={roles.length === 0}
            />

            <Button
              size="sm"
              onClick={onBulkSend}
              className={cn(
                "rounded-[0.4rem] px-[1.6rem] py-[0.8rem]",
                "text-[1.4rem]"
              )}
              loading={isSending}
            >
              Bulk Send invite
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
