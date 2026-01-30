import SmartDropdown from "../../smart-dropdown/SmartDropdown";
import Text from "../../ui/Text";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import { cn } from "../../../lib/utils";
import { TeamMember } from "../../../store/onboarding/types/memberTypes";
import Heading from "../../ui/Heading";
import { useTeamMembersField } from "./hooks/useTeamMembersField";

interface TeamMembersFieldProps {
  value: string[];
  onChange: (memberIds: string[]) => void;
  members: TeamMember[];
}

export default function TeamMembersField({
  value,
  onChange,
  members,
}: TeamMembersFieldProps) {
  const icons = useSupabaseIcons();
  const {
    isOpen,
    triggerRef,
    displayText,
    toggleMember,
    handleToggle,
    handleClose,
  } = useTeamMembersField(value, onChange, members);

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <Heading className="font-[700] text-[1.4rem]">
        Select backup escalation contact
      </Heading>
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className={cn(
          "w-full p-[1.2rem] border rounded-[0.8rem] bg-primary border-input-stroke",
          "flex items-center justify-between text-left",
          "hover:border-brand-primary transition-colors",
        )}
      >
        <Text
          className={cn(
            "text-[1.4rem]",
            value.length > 0 ? "text-text-primary" : "text-text-secondary",
          )}
        >
          {displayText}
        </Text>
        <ImageComponent
          src={icons.chevronDown}
          alt="dropdown"
          width={20}
          height={20}
          className={cn("transition-transform", isOpen && "rotate-180")}
        />
      </button>
      <SmartDropdown
        isOpen={isOpen}
        onClose={handleClose}
        triggerRef={triggerRef}
        maxHeight="20rem"
      >
        <div className="p-[0.8rem] space-y-[0.8rem]">
          {members.length === 0 ? (
            <div className="p-[1.2rem]">
              <Text className="text-text-secondary text-[1.2rem]">
                No team members available
              </Text>
            </div>
          ) : (
            members.map((member) => {
              const isSelected = value.includes(member.id);
              return (
                <button
                  key={member.id}
                  onClick={() => toggleMember(member.id)}
                  className={cn(
                    "w-full px-[1.2rem] py-[0.8rem] rounded-[0.6rem] text-left",
                    "hover:bg-input-filled transition-colors",
                    "flex items-center justify-between",
                    isSelected && "bg-brand-primary/10",
                  )}
                >
                  <div className="flex items-center gap-[1.2rem] flex-1">
                    <ImageComponent
                      src={member.avatar}
                      alt={member.email}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <Text className="text-[1.4rem] text-text-primary">
                        {member.email}
                      </Text>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </SmartDropdown>
    </div>
  );
}
