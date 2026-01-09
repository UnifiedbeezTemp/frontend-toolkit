"use client";

import { useRouter } from "next/navigation";
import { useCheckoutForm } from "../hooks/useCheckoutForm";
import Button from "../../ui/Button";

interface CheckoutActionsProps {
  isProcessing?: boolean;
  showInitialAction?: boolean;
}

export default function CheckoutActions({
  isProcessing = false,
  showInitialAction = true,
}: CheckoutActionsProps) {
  const router = useRouter();
  const { handleGoBack, hasSubmitted } = useCheckoutForm();

  if (!showInitialAction) {
    return null;
  }

  return (
    <>
      <div className="mt-[4rem] flex flex-col-reverse gap-[1rem] sm:flex-row sm:gap-[1rem]">
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleGoBack}
          disabled={isProcessing}
        >
          Go back
        </Button>
        <Button
          variant="primary"
          className="w-full highlight-inside border-0"
          type="submit"
          loading={isProcessing}
          disabled={isProcessing}
        >
          Proceed
        </Button>
      </div>
    </>
  );
}
