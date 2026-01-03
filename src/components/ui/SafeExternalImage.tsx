"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  startTransition,
  memo,
} from "react"
import { cn } from "@lib/utils"
import { analyzeImageLuminance } from "@utils/imageLuminance"

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

const BG_COLORS = {
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
}: SafeExternalImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [bgType, setBgType] = useState<"light" | "dark" | "neutral">("neutral")
  const imgRef = useRef<HTMLImageElement>(null)
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (!isMountedRef.current) return

    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        startTransition(() => {
          setHasError(false)
          setIsLoading(true)
          setBgType("neutral")
        })
      }
    }, 0)

    return () => clearTimeout(timer)
  }, [src])

  const handleLoad = useCallback(() => {
    if (!isMountedRef.current) return

    requestAnimationFrame(() => {
      if (!isMountedRef.current) return

      startTransition(() => {
        setIsLoading(false)

        if (autoBackground && imgRef.current) {
          const type = analyzeImageLuminance(imgRef.current)
          setBgType(type)
        }
      })
    })
  }, [autoBackground])

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        className={cn(
          "w-full h-full object-contain transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onError={() => {
          if (isMountedRef.current) {
            requestAnimationFrame(() => {
              if (isMountedRef.current) {
                startTransition(() => setHasError(true))
              }
            })
          }
        }}
        onLoad={handleLoad}
      />
    </div>
  )
}

export default memo(SafeExternalImage)

