export interface InfiniteNewsTickerProps {
  items: React.ReactNode[];
  speed?: number;
  gap?: number;
  className?: string;
  pauseOnHover?: boolean;
}

export interface UseAutoScrollLoopOptions {
  speed?: number;
}
