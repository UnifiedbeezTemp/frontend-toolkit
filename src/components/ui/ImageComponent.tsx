import React, { useState } from "react";
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

export default function ImageComponent({
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

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    onError?.(e);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn("relative", containerClassName)}>
      <Image
        {...props}
        src={hasError ? fallbackSrc : props.src}
        loading={loading}
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
