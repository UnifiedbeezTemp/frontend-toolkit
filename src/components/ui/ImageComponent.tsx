"use client";

import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  startTransition,
  memo,
} from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "../../lib/utils";

interface ImageComponentProps extends Omit<
  ImageProps,
  "className" | "onError"
> {
  className?: string;
  containerClassName?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const isExternalUrl = (src: ImageProps["src"]): boolean => {
  if (typeof src !== "string") return false;
  try {
    const url = new URL(src);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getOptimizedImageOrigins = (): Set<string> => {
  const origins = new Set(["https://woplvzpumzbpydgumpgc.supabase.co"]);
  const configuredSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (configuredSupabaseUrl) {
    try {
      origins.add(new URL(configuredSupabaseUrl).origin);
    } catch {
      // Ignore malformed public config here; env validation reports it earlier.
    }
  }

  return origins;
};

const OPTIMIZED_IMAGE_ORIGINS = getOptimizedImageOrigins();

const isOptimizedRemoteUrl = (src: ImageProps["src"]): boolean => {
  if (typeof src !== "string") return false;

  try {
    return OPTIMIZED_IMAGE_ORIGINS.has(new URL(src).origin);
  } catch {
    return false;
  }
};

function ImageComponent({
  className,
  containerClassName,
  fallbackSrc = "/images/fallback.jpg",
  lazy = true,
  onError,
  loading = lazy ? "lazy" : "eager",
  ...props
}: ImageComponentProps) {
  const [hasError, setHasError] = useState(false);
  const [trackedSrc, setTrackedSrc] = useState(props.src);
  const isMountedRef = useRef(false);

  const shouldUseUnoptimized = useMemo(
    () => isExternalUrl(props.src) && !isOptimizedRemoteUrl(props.src),
    [props.src],
  );

  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  if (props.src !== trackedSrc) {
    setTrackedSrc(props.src);
    setHasError(false);
  }

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (isMountedRef.current) {
        requestAnimationFrame(() => {
          if (isMountedRef.current) {
            startTransition(() => {
              setHasError(true);
            });
          }
        });
      }
      onError?.(e);
    },
    [onError],
  );

  return (
    <div className={cn("relative", containerClassName)}>
      <Image
        {...props}
        src={hasError ? fallbackSrc : props.src}
        loading={props.priority ? undefined : loading}
        unoptimized={shouldUseUnoptimized}
        onError={handleError}
        alt={props.alt || ""}
        className={cn(
          "object-cover transition-opacity duration-300",
          // isLoading && "opacity-0",
          // !isLoading && "opacity-100",
          className,
        )}
      />

      {/* {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )} */}
    </div>
  );
}

export default memo(ImageComponent);
