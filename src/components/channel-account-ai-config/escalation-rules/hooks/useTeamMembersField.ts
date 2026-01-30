import { useState, useRef } from "react";
import { TeamMember } from "../../../../store/onboarding/types/memberTypes";

export const useTeamMembersField = (
  value: string[],
  onChange: (memberIds: string[]) => void,
  members: TeamMember[],
) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedMembers = members.filter((m) => value.includes(m.id));
  const displayText =
    selectedMembers.length === 0
      ? "Select option"
      : selectedMembers.length === 1
        ? selectedMembers[0].email
        : `${selectedMembers.length} team members`;

  const toggleMember = (memberId: string) => {
    if (value.includes(memberId)) {
      onChange(value.filter((id) => id !== memberId));
    } else {
      onChange([...value, memberId]);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    triggerRef,
    selectedMembers,
    displayText,
    toggleMember,
    handleToggle,
    handleClose,
  };
};
