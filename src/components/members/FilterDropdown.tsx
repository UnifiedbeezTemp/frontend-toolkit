"use client";

import { useState, useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks/useRedux";
import { setRoleFilterMembers, setStatusFilterInvited } from "../../store/onboarding/slices/membersSlice";
import { transformApiRolesToOptions } from "./utils/transformers";
import Checkbox from "../ui/CheckBox";

interface FilterDropdownProps {
  section: "invited" | "members";
  onClose?: () => void;
}

const invitationStatuses = [
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "denied" },
  { label: "Expired", value: "expired" },
  { label: "Draft", value: "draft" },
];

export default function FilterDropdown({ section, onClose }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.members.roles);
  const roleFilter = useAppSelector((state) => state.members.roleFilterMembers);
  const statusFilter = useAppSelector((state) => state.members.statusFilterInvited);
  
  const roleOptions = transformApiRolesToOptions(roles);
  const activeFilter = section === "members" ? roleFilter : statusFilter;
  const options = section === "members" ? roleOptions : invitationStatuses;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleFilterSelect = (value: string) => {
    if (section === "members") {
      dispatch(setRoleFilterMembers(value === activeFilter ? null : value));
    } else {
      dispatch(setStatusFilterInvited(value === activeFilter ? null : value));
    }
    setIsOpen(false);
    onClose?.();
  };

  const handleReset = () => {
    if (section === "members") {
      dispatch(setRoleFilterMembers(null));
    } else {
      dispatch(setStatusFilterInvited(null));
    }
    setIsOpen(false);
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-1 min-w-[28rem] bg-white border border-border rounded-lg shadow-lg z-20"
    >
      <div className="max-h-64 overflow-y-auto">
        {options.map((option) => {
          const isActive = activeFilter === option.value;
          return (
            <div
              key={option.value}
              onClick={() => handleFilterSelect(option.value)}
              className="w-full flex items-center gap-[1.2rem] py-[1.2rem] px-[0.8rem] text-left text-[1.4rem] transition-colors text-text-primary border-b border-border"
            >
              <Checkbox
                checked={isActive}
                onChange={() => handleFilterSelect(option.value)}
                size="sm"
              />
              <span className="text-text-secondary">{option.label}</span>
            </div>
          );
        })}
      </div>
      {activeFilter && (
        <div className="">
          <button
            onClick={handleReset}
            className="w-full py-[1.2rem] px-[0.8rem] text-left text-[1.4rem] text-destructive transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
}

