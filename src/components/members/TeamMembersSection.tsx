"use client";

import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { useAppDispatch, useAppSelector } from "../../store/hooks/useRedux";
import { selectFilteredMembers, selectTotalMembers, selectSelectedMembersCount, selectAllMembers } from "../../store/onboarding/slices/membersSlice";
import Heading from "../ui/Heading";
import SearchAndFilter from "./SearchAndFilter";
import UserList from "./UserList";
import MembersSkeleton from "./MembersSkeleton";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import Image from "next/image";

interface TeamMembersSectionProps {
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
}

export default function TeamMembersSection({
  isLoading = false,
  error,
  onRetry,
}: TeamMembersSectionProps) {
  const dispatch = useAppDispatch();
  const members = useAppSelector(selectFilteredMembers);
  const totalMembers = useAppSelector(selectTotalMembers);
  const selectedCount = useAppSelector(selectSelectedMembersCount);
  const supabaseIcons = useSupabaseIcons();

  const handleSelectAll = () => {
    dispatch(selectAllMembers());
  };

  const isAllSelected = selectedCount === totalMembers && totalMembers > 0;

  return (
    <div className="py-[2rem]">
      <Heading>Team members</Heading>

      <SearchAndFilter section="members" />

      {!isLoading && !error && totalMembers > 0 && (
        <div className="bg-input-filled rounded-[0.8rem] p-[0.8rem] flex items-center justify-between">
          <div className="flex items-center gap-[1.6rem]">
            <button
              onClick={handleSelectAll}
              className={`w-[1.6rem] h-[1.6rem] rounded-[0.4rem] border flex items-center justify-center transition-colors ${
                isAllSelected
                  ? "bg-brand-primary border-brand-primary"
                  : "border-border bg-primary"
              }`}
            >
              {isAllSelected && (
                <Image
                  alt="checkbox"
                  src={supabaseIcons.checkbox}
                  width={16}
                  height={16}
                  className="object-cover"
                />
              )}
            </button>
            <p className="text-[14px] text-text-primary leading-[1.96rem]">
              Select all team members
            </p>
          </div>

          <p className="text-[14px] text-text-primary">{totalMembers} Total</p>
        </div>
      )}

      <div className="mt-[1.6rem] space-y-[1.6rem]">
        {isLoading ? (
          <MembersSkeleton />
        ) : error ? (
          <ErrorState
            type="members"
            message={error instanceof Error ? error.message : "Failed to load team members"}
            onRetry={onRetry || (() => {})}
          />
        ) : members.length === 0 ? (
          <EmptyState type="members" />
        ) : (
          <UserList 
            users={members} 
            type="members"
          />
        )}
      </div>
    </div>
  );
}
