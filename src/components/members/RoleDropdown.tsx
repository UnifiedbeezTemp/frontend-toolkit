"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { roleOptions } from "./utils/data";

interface RoleDropdownProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
  disabled?: boolean;
}

export default function RoleDropdown({
  currentRole,
  onRoleChange,
  disabled,
}: RoleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  if (disabled) {
    return (
      <button className="border text-text-primary flex items-center rounded-[0.4rem] text-[1.4rem] px-[1.6rem] py-[0.8rem] border-border opacity-50 cursor-not-allowed">
        {getCurrentRoleLabel()} <ChevronDown size={16} />
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border text-text-primary flex items-center rounded-[0.4rem] px-[0.8rem] py-[0.4rem] text-[1.4rem] lg:px-[1.6rem] lg:py-[0.8rem] border-border hover:border-brand-primary transition-colors"
      >
        {getCurrentRoleLabel()} <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-border rounded-lg shadow-lg z-10">
          {roleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleRoleSelect(option.value)}
              className={`w-full px-3 py-2 text-left text-[1.4rem] text-sm hover:bg-gray-50 ${
                currentRole === option.value
                  ? "text-brand-primary bg-brand-primary/10"
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
