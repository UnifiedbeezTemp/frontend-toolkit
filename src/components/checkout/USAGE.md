# Checkout Module Usage Guide

This module is designed using the **"Shared Ingredients, Local Recipe"** pattern.

- **Shared Ingredients**: Pure UI components (`PaymentForm`, `TermsAgreement`) and logic hooks (`useCheckoutForm`, `usePurchaseAddons`) reside here in `@/shared`.
- **Local Recipe**: Your project's local `CheckoutPage` and its custom hook `useCheckoutPage` orchestrate these ingredients to fit your specific flow.

---

## 🚀 How to Implement

### Step 1: Create your Local Orchestration Hook

Create a hook (e.g., `components/checkout/hooks/useCheckoutPage.ts`) in your project. This hook is the **brain** of your page. It must call the shared `useCheckoutForm` to handle the heavy lifting.

```tsx
// components/checkout/hooks/useCheckoutPage.ts
import { useCheckoutForm } from "@/shared/src/components/checkout/hooks/useCheckoutForm";
import { usePurchaseAddons } from "@/shared/src/components/checkout/hooks/usePurchaseAddons";
// ... other imports

export const useCheckoutPage = () => {
  // 1. Call the core shared hook
  const {
    handleSubmit,
    onSubmit,
    control,
    clientSecret,
    isProcessing,
    hasSubmitted,
    setHasSubmitted,
    // ...
  } = useCheckoutForm();

  // 2. Add your project-specific logic (routing, addons, etc.)
  const handleSuccess = () => {
    router.push("/dashboard"); // Your custom success route
  };

  return {
    handleSubmit,
    onSubmit,
    control,
    clientSecret,
    handleSuccess,
    // ... pass through everything your UI needs
  };
};
```

### Step 2: Compose your Local Page

Create your page component (e.g., `components/checkout/CheckoutPage.tsx`). Import the granular UI components from `@/shared` and pass them the state from your local hook.

```tsx
// components/checkout/CheckoutPage.tsx
import { useCheckoutPage } from "./hooks/useCheckoutPage";

// Shared UI Components
import PaymentForm from "@/shared/src/components/checkout/form/PaymentForm";
import TermsAgreement from "@/shared/src/components/checkout/form/TermsAgreement";
import CheckoutActions from "@/shared/src/components/checkout/form/CheckoutActions";
import StripePaymentForm from "@/shared/src/components/checkout/stripe/StripePaymentForm";

export default function CheckoutPage() {
  // 1. Get state from your local recipe
  const { control, handleSubmit, onSubmit, hasSubmitted, clientSecret } =
    useCheckoutPage();

  return (
    <div>
      {/* 2. Render the form flow */}
      {!hasSubmitted && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <PaymentForm control={control} />

          <TermsAgreement control={control} />

          <CheckoutActions showInitialAction={true} />
        </form>
      )}

      {/* 3. Render Stripe form when ready */}
      {hasSubmitted && clientSecret && (
        <Elements stripe={stripe} options={{ clientSecret }}>
          <StripePaymentForm control={control} clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
}
```

---

## 📦 Shared API Reference

### `useCheckoutForm()`

The core hook that manages form state, validation, and the trial start mutation.

**Returns:**

- `control`: React Hook Form control object (pass this to UI components).
- `handleSubmit`: Form submission handler.
- `onSubmit`: Function to call when form is valid.
- `clientSecret`: The Stripe client secret returned after successful trial start.
- `hasSubmitted`: Boolean indicating if the initial form has been submitted.
- `isProcessing`: Boolean for loading states.

### UI Components

- **`PaymentForm`**: Renders name, address, city, state inputs. Requires `{ control }`.
- **`TermsAgreement`**: Renders the checkbox and legal text. Requires `{ control }`.
- **`StripePaymentForm`**: Renders the Stripe CardElement. Requires `{ control, clientSecret }`.
