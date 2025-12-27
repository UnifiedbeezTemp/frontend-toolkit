/**
 * Utility functions for managing setup routes
 * Routes format: /setup/[step]?substep=substep
 */

/**
 * Generate a setup route URL
 * @param stepId - The main step ID (1-8)
 * @param subStepId - Optional substep ID for query param
 * @returns The route URL string
 */
export function getSetupRoute(stepId: number, subStepId?: string | number | null): string {
  const baseRoute = `/setup/${stepId}`;
  if (subStepId !== undefined && subStepId !== null) {
    return `${baseRoute}?substep=${subStepId}`;
  }
  return baseRoute;
}

/**
 * Parse setup route to extract step and substep
 * @param pathname - The pathname (e.g., "/setup/2")
 * @param searchParams - URL search params (e.g., "?substep=3")
 * @returns Object with stepId and subStepId, or null if invalid
 */
export function parseSetupRoute(
  pathname: string,
  searchParams: URLSearchParams | string | null
): { stepId: number; subStepId: string | number | null } | null {
  // Match /setup/[stepId] pattern
  const match = pathname.match(/^\/setup\/(\d+)$/);
  if (!match) {
    return null;
  }

  const stepId = parseInt(match[1], 10);
  if (isNaN(stepId) || stepId < 1 || stepId > 8) {
    return null;
  }

  // Parse substep from search params
  let subStepId: string | number | null = null;
  if (searchParams) {
    const params = typeof searchParams === 'string' 
      ? new URLSearchParams(searchParams) 
      : searchParams;
    const subStepParam = params.get('substep');
    if (subStepParam) {
      // Try to parse as number, otherwise keep as string
      const parsed = parseInt(subStepParam, 10);
      subStepId = isNaN(parsed) ? subStepParam : parsed;
    }
  }

  return { stepId, subStepId };
}

/**
 * Validate if a step ID is valid (1-8)
 */
export function isValidStepId(stepId: number): boolean {
  return Number.isInteger(stepId) && stepId >= 1 && stepId <= 8;
}

