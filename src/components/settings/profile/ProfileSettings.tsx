import AIAssistants from "./ai-assistants/AIAssistants";
import BusinessDetails from "./business-details/BusinessDetails";
import Plan from "./Plan";
import ProfileDetails from "./profile-details/ProfileDetails";

export default function ProfileSettings() {
  return (
    <div className="mt-[1rem]  px-[1.6rem] lg:px-0">
      {/* <Plan /> */}
      <ProfileDetails />
      <BusinessDetails />
      <AIAssistants/>
    </div>
  );
}
