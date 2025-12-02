"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { isFunction, isUndefined } from "../utils/is";

export default function useToggleRoute(
  initialRoute?: string | ((pathName: string) => string),
) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState(
    !isUndefined(initialRoute)
      ? isFunction(initialRoute)
        ? initialRoute(pathname)
        : initialRoute
      : pathname,
  );
  const goTo = useCallback(
    (newRoute: string) => {
      setCurrentRoute(newRoute);
      router.push(newRoute);
    },
    [router],
  );

  const isActiveRoute = useCallback(
    (route: string) => pathname === route,
    [pathname],
  );

  return {
    currentRoute,
    goTo,
    isActiveRoute,
  };
}
