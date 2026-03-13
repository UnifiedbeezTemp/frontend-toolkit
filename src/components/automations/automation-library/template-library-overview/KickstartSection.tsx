import GreyBee from "../../../../assets/icons/GreyBee";
import { SendIcon } from "../../../../assets/icons/SendIcon";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import Heading from "../../../ui/Heading";
import AIInput from "../../automations-page/AIInput";

export default function KickstartSection() {
  const icons = useSupabaseIcons();
  return (
    <div className="w-full md:w-[60%] mx-auto transition-all duration-300">
      <Heading className="lg:text-[2.4rem] text-center">
        Kickstart your next automation with ease.
      </Heading>
      <p className="text-[1.6rem] text-text-primary text-centera">
        Tell Beezora what you want to achieve, and she'll craft the workflow
        from idea to execution.
      </p>

      <AIInput sendIcon={icons.send2} />
    </div>
  );
}
