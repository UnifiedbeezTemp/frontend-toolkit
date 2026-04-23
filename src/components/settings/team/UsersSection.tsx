import { useState } from "react"
import InvitedUsersSection from "../../members/InvitedUsersSection"
import TeamMembersSection from "../../members/TeamMembersSection"
import { MobileTabs } from "./MobileTabs"

export default function UsersSections() {
  const [activeTab, setActiveTab] = useState<"invited" | "members">("invited")

  return (
    <div className="sm:border border-border rounded-[0.74rem] sm:p-[1.6rem] lg:mt-[2rem] bg-primary">
      <MobileTabs activeTab={activeTab} onTabClick={setActiveTab} />

      <div className="lg:hidden">
        {activeTab === "invited" ? (
          <InvitedUsersSection />
        ) : (
          <TeamMembersSection />
        )}
      </div>

      <div className="hidden lg:block space-y-[2.4rem]">
        <InvitedUsersSection />
        <TeamMembersSection />
      </div>
    </div>
  )
}
