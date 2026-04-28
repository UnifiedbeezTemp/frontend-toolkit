import { InviteSection } from "../../members/InviteSection"
import { useTeamManagement } from "../../members/hooks/useTeamManagement"
import { TeamManagementProvider } from "../../members/providers/TeamManagementProvider"
import UsersSections from "./UsersSection"

export default function TeamSettings() {
  const teamManagement = useTeamManagement()

  return (
    <TeamManagementProvider value={teamManagement}>
      <div>
        <InviteSection />
        <UsersSections />
      </div>
    </TeamManagementProvider>
  )
}
