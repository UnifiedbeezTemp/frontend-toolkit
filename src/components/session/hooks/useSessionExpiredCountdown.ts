import { useEffect, useState } from "react";
import { redirectToLogin } from "../../../utils/redirectToLogin";

export const useSessionExpiredCountdown = (isActive: boolean) => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          redirectToLogin();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  return { countdown, redirectToLogin };
};
