export interface UseArrowNavigationProps<T> {
  list: T[];
  activeIndex: number;
  onSelect: (item: T) => void;
  loop?: boolean;
}

export interface UsePathnameCheckerOptions {
  paths?: string[];
  prefix?: string;
}

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface SmartScrollIntoViewOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  container?: HTMLElement | null;
  enabled?: boolean;
  requireFullVisibility?: boolean;
  rootMargin?: string;
}

export interface UseChatAutoScrollOptions {
  behavior?: ScrollBehavior;
  bottomOffset?: number;
}


export interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  setCurrentPage: (page: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handlePageChange: (page: number | string) => void;
  getPageNumbers: () => (number | string)[];
}