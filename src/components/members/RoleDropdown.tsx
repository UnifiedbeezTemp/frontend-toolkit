"use client";

import { useState, useRef, useEffect } from "react";
import { useAppSelector } from "../../store/hooks/useRedux";
import { transformApiRolesToOptions } from "./utils/transformers";
import Loader from "../ui/Loader";
import ImageComponent from "../ui/ImageComponent";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";

interface RoleDropdownProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function RoleDropdown({
  currentRole,
  onRoleChange,
  disabled,
  loading = false,
}: RoleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const roles = useAppSelector((state) => state.members.roles);
  const roleOptions = transformApiRolesToOptions(roles);
  const icons = useSupabaseIcons()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRoleSelect = (role: string) => {
    onRoleChange(role);
    setIsOpen(false);
  };

  const getCurrentRoleLabel = () => {
    return (
      roleOptions.find((option) => option.value === currentRole)?.label ||
      currentRole
    );
  };

  if (disabled || loading) {
    return (
      <button className="border text-text-primary flex items-center gap-[0.8rem] rounded-[0.4rem] text-[1.4rem] px-[1.6rem] py-[0.8rem] border-border opacity-50 cursor-not-allowed">
        {loading ? <Loader className="w-[1.6rem] h-[1.6rem]" /> : getCurrentRoleLabel()}
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border text-text-primary flex items-center rounded-[0.4rem] px-[1.6rem] py-[0.8rem] text-[1.4rem] lg:px-[1.6rem] lg:py-[0.8rem] border-border hover:border-brand-primary transition-colors"
      >
        {getCurrentRoleLabel()}
        <ImageComponent
          alt=""
          src={icons.chevronDown}
          width={20}
          height={20}
          className="object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-primary border border-border rounded-[.8rem] z-10">
          {roleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleRoleSelect(option.value)}
              className={`w-full px-3 py-2 text-left text-[1.4rem] ${
                currentRole === option.value
                  ? "text-brand-primary"
                  : "text-text-primary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
