"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { UsePathnameCheckerOptions } from "./types";

export function usePathnameChecker({
  paths,
  prefix,
}: UsePathnameCheckerOptions) {
  const pathname = usePathname();

  const matches = useMemo(() => {
    if (!pathname) return false;

    if (paths && paths.includes(pathname)) return true;
    if (prefix && pathname.startsWith(prefix)) return true;

    return false;
  }, [pathname, paths, prefix]);

  return { pathname, matches };
}
