"use client"

import React, { useEffect, useState, useMemo, useRef, useCallback, startTransition, memo } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "../../lib/utils";

interface ImageComponentProps
  extends Omit<ImageProps, "className" | "onError"> {
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
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(false);

  const shouldUseUnoptimized = useMemo(
    () => isExternalUrl(props.src),
    [props.src]
  );

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isMountedRef.current) return;
    
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        startTransition(() => {
          setHasError(false);
          setIsLoading(true);
        });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [props.src]);

  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
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
  }, [onError]);

  const handleLoad = useCallback(() => {
    if (isMountedRef.current) {
      requestAnimationFrame(() => {
        if (isMountedRef.current) {
          startTransition(() => {
            setIsLoading(false);
          });
        }
      });
    }
  }, []);

  return (
    <div className={cn("relative", containerClassName)}>
      <Image
        {...props}
        src={hasError ? fallbackSrc : props.src}
        loading={loading}
        unoptimized={shouldUseUnoptimized}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading && "opacity-0",
          !isLoading && "opacity-100",
          className
        )}
      />

      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded" />
      )}
    </div>
  );
}

export default memo(ImageComponent);
