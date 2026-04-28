import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";

import { fetchWebsite } from "../../../../api/websites";
import type { ApiWebsite, Website } from "../../../../types/websiteTypes";
import { mapApiWebsiteToUiWebsite } from "../utils/websiteMappers";
import { isDiscoveryCompleted } from "../utils/discoveryStatus";

type WebsiteDetailsState = {
  apiWebsite?: ApiWebsite;
  isInitialLoading: boolean;
  isError: boolean;
};

export function useWebsitesWithPages(websites: Website[]): Website[] {
  const completedWebsites = useMemo(
    () => websites.filter((website) => isDiscoveryCompleted(website.discoveryStatus)),
    [websites],
  );

  const websiteDetailsQueries = useQueries({
    queries: completedWebsites.map((website) => ({
      queryKey: ["website", website.id],
      queryFn: () => fetchWebsite(website.id),
      enabled: isDiscoveryCompleted(website.discoveryStatus),
    })),
  });

  const websiteDetailsById = useMemo(() => {
    const details = new Map<number, WebsiteDetailsState>();

    completedWebsites.forEach((website, index) => {
      const query = websiteDetailsQueries[index];
      if (!query) return;

      details.set(website.id, {
        apiWebsite: query.data,
        isInitialLoading: query.isLoading && !query.data,
        isError: query.isError,
      });
    });

    return details;
  }, [completedWebsites, websiteDetailsQueries]);

  return useMemo(() => {
    return websites.map((website) => {
      if (!isDiscoveryCompleted(website.discoveryStatus)) {
        return { ...website, isPagesLoading: false };
      }

      const details = websiteDetailsById.get(website.id);
      const detailsWebsite = details?.apiWebsite
        ? mapApiWebsiteToUiWebsite(details.apiWebsite)
        : null;

      return {
        ...website,
        pages: detailsWebsite?.pages ?? website.pages,
        isPagesLoading: details?.isError ? false : details?.isInitialLoading ?? true,
      };
    });
  }, [websites, websiteDetailsById]);
}

