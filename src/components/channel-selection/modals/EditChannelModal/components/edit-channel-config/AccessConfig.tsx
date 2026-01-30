import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import { Channel } from "../../../../../../store/onboarding/types/channelTypes";
import TeamMembersList from "../../../../../channel-account-ai-config/access-permissions/TeamMembersList";
import Button from "../../../../../ui/Button";
import Heading from "../../../../../ui/Heading";
import ImageComponent from "../../../../../ui/ImageComponent";
import { useAccessPermissions } from "../../hooks/useAccessPermissions";

interface AccessConfigProps {
  channel: Channel;
}

export default function AccessConfig({ channel }: AccessConfigProps) {
  const {
    members: teamMembers,
    selectedMemberIds,
    allMemberIds,
    handleToggleMember,
    handleToggleSelectAll,
  } = useAccessPermissions();

  const icons = useSupabaseIcons();

  return (
    <>
      <div className="space-y-[1rem] border-b border-input-stroke pb-[2.4rem]">
        <Heading className="text-[2rem]">
          Access permissions to {channel.name} on your company
        </Heading>

        <TeamMembersList
          teamMembers={teamMembers}
          selectedMemberIds={selectedMemberIds}
          allMemberIds={allMemberIds}
          onToggleMember={handleToggleMember}
          onToggleSelectAll={handleToggleSelectAll}
        />
      </div>

      <Button variant="dangerReverse" className="w-full">
        {" "}
        <ImageComponent
          src={icons.trashRed}
          alt="trash"
          width={20}
          height={20}
          className="mr-[.5rem]"
        />{" "}
        Delete Account
      </Button>
    </>
  );
}
