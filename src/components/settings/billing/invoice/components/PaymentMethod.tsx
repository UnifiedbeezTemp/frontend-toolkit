import Heading from "@/shared/src/components/ui/Heading";
import Text from "@/shared/src/components/ui/Text";
import Button from "@/shared/src/components/ui/Button";
import { PaymentMethodData } from "../hooks/useInvoiceSettings";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";

interface PaymentMethodProps {
  paymentMethod: PaymentMethodData;
}

export default function PaymentMethod({ paymentMethod }: PaymentMethodProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="mt-[4rem] border border-border rounded-[1.6rem] bg-primary p-[2.4rem]">
      <Heading className="text-[1.8rem] font-bold text-text-secondary mb-[2.4rem]">
        Payment Method
      </Heading>

      <div className="flex items-center justify-between p-[1.6rem] border border-border rounded-[1.2rem]">
        <div className="flex items-center gap-[1.6rem]">
          <div className="w-[4.8rem] h-[3.2rem] border border-border rounded-[0.4rem] flex items-center justify-center bg-gray-50 overflow-hidden">
            <ImageComponent
              src={icons.mastercard}
              alt={paymentMethod.type}
              width={32}
              height={20}
              className="object-contain"
            />
          </div>
          <div>
            <Text className="text-[1.4rem] font-medium text-text-secondary">
              {paymentMethod.type} Ending in {paymentMethod.last4}
            </Text>
            <Text className="text-[1.2rem] text-text-primary/60">
              Expiry {paymentMethod.expiry}
            </Text>
          </div>
        </div>
        <Button
          variant="secondary"
          className="!px-[1.6rem] !py-[0.8rem] text-[1.4rem]"
        >
          Update
        </Button>
      </div>
    </div>
  );
}
