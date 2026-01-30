import { TeamMember } from "../../../store/onboarding/types/memberTypes";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import ImageComponent from "../../ui/ImageComponent";
import Text from "../../ui/Text";
import Button from "../../ui/Button";
import { cn } from "../../../lib/utils";
import Checkbox from "../../ui/CheckBox";

interface TeamMemberItemProps {
  member: TeamMember;
  isSelected: boolean;
  onToggle: () => void;
}

export default function TeamMemberItem({
  member,
  isSelected,
  onToggle,
}: TeamMemberItemProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex items-start sm:items-center justify-between rounded-[0.8rem] p-[0.8rem] border border-input-stroke">
      <div className="flex items-center gap-[1.2rem]">
        <ImageComponent
          src={member.avatar || ""}
          alt={member.email}
          width={32}
          height={32}
          className="rounded-full shrink-0"
        />
        <Text className="text-[1.4rem] text-text-primary">{member.email}</Text>
      </div>
      <div className="flex items-center gap-[1.2rem] flex-1"></div>

      <div className="flex items-center gap flex flex-col sm:flex-row items-center">
        <div className="flex items-center gap-[0.4rem]">
          <Text className="lowercase text-[1.4rem] sm:text-[1.6rem]">
            {member.role}
          </Text>
          <ImageComponent
            src={icons.chevronRightGreen}
            alt="arrow"
            width={16}
            height={16}
            className="rounded-full shrink-0"
          />
        </div>
        <div className="flex items-center gap-[0.4rem]">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={cn(
              "text-[1.4rem] lg:text-[1.6rem]",
              isSelected ? "text-destructive" : "text-brand-primary",
            )}
          >
            {isSelected ? "Deselect" : "Select"}
          </Button>

          <Checkbox
            checked={isSelected}
            onChange={onToggle}
            className="rounded-full"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
