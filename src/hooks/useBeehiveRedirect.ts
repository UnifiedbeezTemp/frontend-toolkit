"use client";

import { useRouter } from "next/navigation";

export function useBeehiveRedirect() {
  const router = useRouter();

  const handleGoToBeehive = () => {
    const beehiveUrl = process.env.NEXT_PUBLIC_BEEHIVE_URL;
    if (beehiveUrl) {
      router.push(`${beehiveUrl}/get-started`);
    } else {
      console.warn("NEXT_PUBLIC_BEEHIVE_URL is not defined");
    }
  };

  return { handleGoToBeehive };
}
