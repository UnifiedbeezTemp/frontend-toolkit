import { useUser } from "../../../contexts/UserContext";
import PlanCardPreview from "../../plancard-preview/PlanCardPreview";
import Heading from "../../ui/Heading";

export default function Plan() {
  const {user} = useUser();
  return (
    <div className="">
      <div className="flex items-center justify-between mb-[-1rem]">
        <Heading>Plan</Heading>{" "}
      </div>
      <PlanCardPreview planType={user?.plan} isAddons={false} isYearly={false}/>
    </div>
  );
}
