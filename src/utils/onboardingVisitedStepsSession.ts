export type VisitedStep = { stepId: number; subStepId: string | number };

const STORAGE_KEY = "manual-onboarding-ui:visited-steps:v1";
const STORAGE_VERSION = 1 as const;

type StoredPayload = {
  v: typeof STORAGE_VERSION;
  userId: string;
  visitedSteps: VisitedStep[];
  ts: number;
};

function isVisitedStep(value: unknown): value is VisitedStep {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (typeof record.stepId !== "number" || !Number.isFinite(record.stepId)) {
    return false;
  }
  const subStepId = record.subStepId;
  if (typeof subStepId !== "string" && typeof subStepId !== "number") {
    return false;
  }
  return true;
}

function isStoredPayload(value: unknown): value is StoredPayload {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (record.v !== STORAGE_VERSION) return false;
  if (typeof record.userId !== "string" || record.userId.trim() === "") {
    return false;
  }
  if (!Array.isArray(record.visitedSteps)) return false;
  if (typeof record.ts !== "number" || !Number.isFinite(record.ts)) {
    return false;
  }
  return (record.visitedSteps as unknown[]).every(isVisitedStep);
}

export function loadVisitedStepsFromSession(
  userId: string,
): VisitedStep[] | null {
  if (typeof window === "undefined") return null;
  if (!userId) return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!isStoredPayload(parsed)) return null;

    if (parsed.userId !== userId) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed.visitedSteps.length > 0 ? parsed.visitedSteps : null;
  } catch {
    return null;
  }
}

export function saveVisitedStepsToSession(
  userId: string,
  visitedSteps: VisitedStep[],
): void {
  if (typeof window === "undefined") return;
  if (!userId) return;

  try {
    const payload: StoredPayload = {
      v: STORAGE_VERSION,
      userId,
      visitedSteps,
      ts: Date.now(),
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore
  }
}

export function clearVisitedStepsSession(): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}
