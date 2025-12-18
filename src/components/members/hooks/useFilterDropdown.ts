"use client";

import { useEffect, useRef, useState } from "react";
import { transformApiRolesToOptions } from "../utils/transformers";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/useRedux";
import { setRoleFilterMembers, setStatusFilterInvited } from "../../../store/onboarding/slices/membersSlice";

type Section = "invited" | "members";

interface UseFilterDropdownParams {
  section: Section;
  onClose?: () => void;
}

export function useFilterDropdown({ section, onClose }: UseFilterDropdownParams) {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.members.roles);
  const roleFilter = useAppSelector((state) => state.members.roleFilterMembers);
  const statusFilter = useAppSelector((state) => state.members.statusFilterInvited);

  const invitationStatuses = [
    { label: "Pending", value: "pending" },
    { label: "Rejected", value: "denied" },
    { label: "Expired", value: "expired" },
    { label: "Draft", value: "draft" },
  ];

  const roleOptions = transformApiRolesToOptions(roles);
  const activeFilter = section === "members" ? roleFilter : statusFilter;
  const options = section === "members" ? roleOptions : invitationStatuses;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const closeDropdown = () => {
    setIsOpen(false);
    onClose?.();
  };

  return {
    isOpen,
    dropdownRef,
    options,
    activeFilter,
    handleFilterSelect,
    handleReset,
    closeDropdown,
  };
}

