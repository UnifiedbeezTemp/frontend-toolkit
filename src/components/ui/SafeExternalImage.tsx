/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect, useRef, useCallback, memo, ReactNode } from "react"
import { cn } from "../../lib/utils"
import { analyzeImageLuminance } from "../../utils/imageLuminance"

interface SafeExternalImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallbackClassName?: string
  fallbackText?: string
  width?: number
  height?: number
  autoBackground?: boolean
}

type BgType = "light" | "dark" | "neutral"

const BG_COLORS: Record<BgType, string> = {
  light: "#ffffff",
  dark: "#374151",
  neutral: "#f3f4f6",
}

function SafeExternalImage({
  src,
  alt,
  className,
  fallbackClassName,
  fallbackText,
  width = 100,
  height = 100,
  autoBackground = false,
}: SafeExternalImageProps): ReactNode {
  const [hasError, setHasError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [bgType, setBgType] = useState<BgType>("neutral")
  const [trackedSrc, setTrackedSrc] = useState<string | null | undefined>(src)
  const imgRef = useRef<HTMLImageElement>(null)

  // React's recommended pattern for resetting state on prop change: compare
  // during render and update synchronously. Avoids the race where an effect-
  // based reset runs after a cached image has already fired onLoad.
  if (src !== trackedSrc) {
    setTrackedSrc(src)
    setHasError(false)
    setIsLoading(true)
    setBgType("neutral")
  }

  const handleLoad = useCallback((): void => {
    setIsLoading(false)
    if (autoBackground && imgRef.current) {
      setBgType(analyzeImageLuminance(imgRef.current))
    }
  }, [autoBackground])

  // Cached images can complete before React attaches the onLoad handler, so
  // the load event is missed. Detect that case after mount/src change.
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth > 0) {
      const id = window.setTimeout(handleLoad, 0)
      return () => window.clearTimeout(id)
    }
  }, [src, handleLoad])

  if (!src || hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400 font-semibold",
          fallbackClassName || className
        )}
        style={{ width, height }}
      >
        {fallbackText || alt.slice(0, 2).toUpperCase()}
      </div>
    )
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        width,
        height,
        backgroundColor: autoBackground ? BG_COLORS[bgType] : undefined,
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-contain transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onError={() => setHasError(true)}
        onLoad={handleLoad}
      />
    </div>
  )
}

export default memo(SafeExternalImage)
