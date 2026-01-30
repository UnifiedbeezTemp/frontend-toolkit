import TeamMemberItem from "./TeamMemberItem";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import { useTeamMembers } from "./hooks/useTeamMembers";
import { TeamMember } from "../../../store/onboarding/types/memberTypes";

export interface TeamMembersListProps {
  teamMembers: TeamMember[];
  selectedMemberIds: string[];
  allMemberIds: string[];
  onToggleMember: (memberId: string) => void;
  onToggleSelectAll: () => void;
}

export default function TeamMembersList({
  selectedMemberIds,
  allMemberIds,
  onToggleMember,
  onToggleSelectAll,
}: TeamMembersListProps) {
  const allSelected =
    selectedMemberIds.length === allMemberIds.length && allMemberIds.length > 0;
  const { members } = useTeamMembers();

  return (
    <div className="flex flex-col gap-[1.6rem]">
      <div className="flex items-center justify-between">
        <Heading className="font-[400] text-[1.4rem] lg:text-[1.6rem]">
          Who has access
        </Heading>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSelectAll}
          className="text-[1.4rem] lg:text-[1.6rem] text-brand-primary underline"
        >
          {allSelected ? "" : "Select all"}
        </Button>
      </div>

      <div className="space-y-[1.6rem]">
        {members.map((member) => (
          <TeamMemberItem
            key={member.id}
            member={member}
            isSelected={selectedMemberIds.includes(member.id)}
            onToggle={onToggleMember.bind(null, member.id)}
          />
        ))}
      </div>
    </div>
  );
}
