// ─── Switch Preview API Response ───

export interface RefundedAddon {
  addonType: string;
  name: string;
  quantity: number;
  estimatedRefund: number;
  reason: string;
}

export interface AffectedChannel {
  channelId: number;
  channelName: string;
  channelType: string;
  displayName: string;
  isConnected: boolean;
  reason: string;
}

export interface QuantityExceeded {
  current: number;
  newMax: number;
  excess: number;
  channels: {
    channelId: number;
    channelName: string;
    isConnected: boolean;
  }[];
}

export interface SwitchPreviewSummary {
  addonsTransferred: number;
  addonsRefunded: number;
  featuresConverted: number;
  channelsAffected: number;
}

export interface SwitchPreviewResponse {
  currentPlan: string;
  targetPlan: string;
  isUpgrade: boolean;
  changes: {
    transferred: RefundedAddon[];
    refunded: RefundedAddon[];
    converted: RefundedAddon[];
  };
  affectedChannels: {
    planBlocked: AffectedChannel[];
    addonBlocked: AffectedChannel[];
    quantityExceeded: QuantityExceeded;
    totalAffected: number;
  };
  totalEstimatedRefund: number;
  newMonthlyTotal: number;
  summary: SwitchPreviewSummary;
}

// ─── Grouped display models ───

export interface GroupedAddon {
  addonType: string;
  name: string;
  totalQuantity: number;
  totalRefund: number;
  reason: string;
  items: RefundedAddon[];
}

export type DowngradeTab = "addons" | "channels";

// ─── Component Props ───

export interface DowngradeWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewData: SwitchPreviewResponse | null;
  isLoading: boolean;
  onProceed: () => void;
  isProceedLoading: boolean;
}
