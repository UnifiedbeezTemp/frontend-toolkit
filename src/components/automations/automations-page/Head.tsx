import useSession from "../../../providers/hooks/useSession";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";

export default function Head() {
    const { data } = useSession();
    
  return (
    <div className="text-center  mx-auto">
      <Heading align="center" className="text-[1.6rem] sm:text-[2.4rem]">
        {data?.fullName}, What would you like to automate today?
      </Heading>
      <Text align="center" className="mt-2 text-[1.4rem] sm:text-[1.6rem]">
        Talk to Beezora, type an idea & get instant actions
      </Text>
    </div>
  );
}