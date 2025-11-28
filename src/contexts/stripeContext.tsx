"use client";

import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { STRIPE_CONFIG } from "../lib/stripe/config";

interface StripeContextType {
  stripe: Stripe | null;
  loading: boolean;
}

const StripeContext = createContext<StripeContextType | undefined>(undefined);

export function StripeProvider({ children }: { children: ReactNode }) {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeStripe = async () => {
      try {
        const stripeInstance = await loadStripe(STRIPE_CONFIG.publicKey);
        if (mounted) {
          setStripe(stripeInstance);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeStripe();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <StripeContext.Provider value={{ stripe, loading }}>
      {children}
    </StripeContext.Provider>
  );
}

export const useStripeContext = () => {
  const context = useContext(StripeContext);
  if (context === undefined) {
    throw new Error("useStripeContext must be used within a StripeProvider");
  }
  return context;
};
