import Heading from "@/shared/src/components/ui/Heading";
import Text from "@/shared/src/components/ui/Text";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";

export const CheckoutHeader: React.FC = () => {
  const icons = useSupabaseIcons();

  return (
    <div className="space-y-[1.4rem] border-b border-border pb-[2.1rem] lg:pb-[.5rem] sm:flex items-center gap-[3.2rem]">
      <div className="flex justify-center p-[0.4rem] bg-primary w-fit mx-auto sm:mx-0 rounded-[0.8rem] shadow">
        <div className="rounded-full bg-[#DBF0DF]/50 p-[1rem]">
          <div className="rounded-full bg-[#DBF0DF] p-[.2rem] w-[3.5rem] h-[3.5rem] flex items-center justify-center">
            <ImageComponent
              src={icons.greenCreditCard}
              alt="Checkout"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>

      <div className="sm:space-y-[.2rem]">
        <Heading align="center" className="sm:text-left">
          Add-on Checkout
        </Heading>
        <Text size="sm" align="center" className="sm:text-left">
          Make payment and selected Add-on will reflected on your plan.
        </Text>
      </div>

      <div className="hidden sm:block"></div>
    </div>
  );
};
