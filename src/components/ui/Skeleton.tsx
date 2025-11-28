import { cn } from "../../lib/utils";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Skeleton({ className, children }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse bg-input-stroke rounded-md", className)}>
      {children}
    </div>
  );
}
