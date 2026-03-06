"use client";

import Button from "../../../../../ui/Button";
import Text from "../../../../../ui/Text";
import Image from "next/image";
import { useSupabaseIcons } from "../../../../../../lib/supabase/useSupabase";

interface BuyMessagesFooterProps {
  onClose: () => void;
  onSelect: () => void;
  isSelectDisabled: boolean;
}

export default function BuyMessagesFooter({
  onClose,
  onSelect,
  isSelectDisabled,
}: BuyMessagesFooterProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="p-[1.6rem] sm:p-[2.4rem] sticky bottom-0 bg-primary flex flex-col gap-[1.6rem]">
      <div className="flex flex-col sm:flex-row gap-[1.2rem]">
        <Button
          variant="secondary"
          className="flex-1 h-[4.4rem] text-[1.4rem] font-bold border border-border"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="flex-1 h-[4.4rem] text-[1.4rem] font-bold"
          onClick={onSelect}
          disabled={isSelectDisabled}
        >
          Select a Package
        </Button>
      </div>

      <div className="flex items-center justify-center gap-[0.8rem]">
        <Text className="text-[1.1rem] text-text-primary text-center">
          Secure payment powered by Stripe. Your payment info is encrypted and
          secure.
        </Text>
      </div>
    </div>
  );
}
