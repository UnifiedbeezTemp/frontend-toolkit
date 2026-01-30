import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";
import { Channel } from "../../../../../../store/onboarding/types/channelTypes";
import TeamMembersList from "../../../../../channel-account-ai-config/access-permissions/TeamMembersList";
import { AIConfigParams } from "../../../../../channel-account-ai-config/services/aiConfigService";
import Button from "../../../../../ui/Button";
import Heading from "../../../../../ui/Heading";
import ImageComponent from "../../../../../ui/ImageComponent";
import { useAccessPermissions } from "../../hooks/useAccessPermissions";

interface AccessConfigProps {
  channel: Channel;
  params: AIConfigParams;
}

export default function AccessConfig({ channel, params }: AccessConfigProps) {
  const {
    members: teamMembers,
    selectedMemberIds,
    allMemberIds,
    handleToggleMember,
    handleToggleSelectAll,
    hasChanges,
    isSaving,
    save,
  } = useAccessPermissions(params);

  const icons = useSupabaseIcons();

  return (
    <>
      <div className="space-y-[1rem] border-b border-input-stroke pb-[2.4rem]">
        <div className="flex items-center justify-between">
          <Heading className="text-[2rem]">
            Access permissions to {channel.name} on your company
          </Heading>
          {hasChanges && (
            <Button
              onClick={save}
              disabled={isSaving}
              className="h-[3.2rem] px-[2rem]"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </div>

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
