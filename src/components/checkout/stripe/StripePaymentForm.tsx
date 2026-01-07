"use client";

import { CardElement } from "@stripe/react-stripe-js";
import { Control } from "react-hook-form";
import { CheckoutFormData } from "../hooks/useCheckoutForm";
import Button from "../../ui/Button";
import { useStripePayment } from "../hooks/useStripePayment";
import Loader from "../../ui/Loader";

interface StripePaymentFormProps {
  control: Control<CheckoutFormData>;
  clientSecret: string;
  onPaymentMethodAttached?: () => void;
  setHasSubmitted?: (value: boolean) => void;
}

export default function StripePaymentForm({
  control,
  clientSecret,
  onPaymentMethodAttached,
  setHasSubmitted,
}: StripePaymentFormProps) {
  const {
    cardComplete,
    processing,
    error,
    handleCardChange,
    handlePaymentSubmit,
  } = useStripePayment({
    control,
    clientSecret,
    onPaymentMethodAttached,
  });

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "10px 12px",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="space-y-6 mt-[2rem]">
      <div className="bg-primary rounded-[0.8rem] p-[1rem]">
        <h3 className="font-[700] text-text-secondary mb-2 text-[1.6rem]">
          Billing Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[1.4rem] text-text-primary">
          <div>
            <span className="font-medium">Name:</span>{" "}
            {control._formValues.fullName}
          </div>
          <div>
            <span className="font-medium">Address:</span>{" "}
            {control._formValues.address}
          </div>
          <div>
            <span className="font-medium">City:</span>{" "}
            {control._formValues.city}
          </div>
          <div>
            <span className="font-medium">State:</span>{" "}
            {control._formValues.state}
          </div>
          <div>
            <span className="font-medium">Postal Code:</span>{" "}
            {control._formValues.postalCode}
          </div>
        </div>
      </div>

      {error && <p className="text-red-800 text-[1.4rem]">{error}</p>}

      <div className="space-y-2">
        <label className="block text-[1.4rem] font-medium text-gray-700">
          Card Details *
        </label>
        <div className="p-3 border border-inactive-color rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <CardElement
            options={cardElementOptions}
            onChange={handleCardChange}
          />
        </div>
        {/* <p className="text-[1.4rem]">
          Test card: 4242 4242 4242 4242 | Any future expiry date | Any 3 digits
          CVC
        </p> */}
      </div>

      <div className="mt-[5rem] gap-[1rem] flex items-center flex-col sm:flex-row-reverse">
        <Button
          variant="primary"
          className="w-full highlight-inside border-0"
          onClick={handlePaymentSubmit}
          loading={processing}
        >
          {processing ? <Loader /> : "Start my 30 day trial"}
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="w-full border border-inactive-color"
          onClick={() => setHasSubmitted?.(false)}
          disabled={processing}
        >
          Go back
        </Button>
      </div>
    </div>
  );
}
