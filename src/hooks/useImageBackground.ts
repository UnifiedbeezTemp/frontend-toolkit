import { useState, useEffect } from "react"

type BackgroundType = "light" | "dark" | "neutral"

interface UseImageBackgroundResult {
  backgroundColor: string
  backgroundType: BackgroundType
  isAnalyzing: boolean
}

/**
 * Analyzes an image to determine if it needs a light or dark background
 * for transparent logos to be visible
 */
export function useImageBackground(
  imageUrl: string | null | undefined,
  defaultBg: string = "#f3f4f6"
): UseImageBackgroundResult {
  const [backgroundColor, setBackgroundColor] = useState(defaultBg)
  const [backgroundType, setBackgroundType] = useState<BackgroundType>("neutral")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    if (!imageUrl) {
      setBackgroundColor(defaultBg)
      setBackgroundType("neutral")
      return
    }

    const analyzeImage = async () => {
      setIsAnalyzing(true)

      try {
        const img = new Image()
        img.crossOrigin = "anonymous"

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject(new Error("Failed to load image"))
          img.src = imageUrl
        })

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          setBackgroundColor(defaultBg)
          setIsAnalyzing(false)
          return
        }

        // Use smaller size for faster analysis
        const maxSize = 50
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
        canvas.width = img.width * scale
        canvas.height = img.height * scale

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const { data } = imageData

        let totalLuminance = 0
        let opaquePixelCount = 0
        let hasTransparency = false

        // Analyze pixels
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const a = data[i + 3]

          // Check if pixel has some transparency
          if (a < 255) {
            hasTransparency = true
          }

          // Only consider pixels that are at least 50% opaque
          if (a > 127) {
            // Calculate relative luminance (perceived brightness)
            // Using sRGB luminance formula
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b
            totalLuminance += luminance
            opaquePixelCount++
          }
        }

        // If no opaque pixels found, use default
        if (opaquePixelCount === 0) {
          setBackgroundColor(defaultBg)
          setBackgroundType("neutral")
          setIsAnalyzing(false)
          return
        }

        const avgLuminance = totalLuminance / opaquePixelCount

        // Determine background based on average luminance
        // If logo is dark (low luminance), use light background
        // If logo is light (high luminance), use dark background
        if (avgLuminance < 85) {
          // Dark logo - use light background
          setBackgroundColor("#ffffff")
          setBackgroundType("light")
        } else if (avgLuminance > 170) {
          // Light logo - use dark background
          setBackgroundColor("#1f2937")
          setBackgroundType("dark")
        } else {
          // Medium luminance - use neutral gray that contrasts with most colors
          // Check if it has transparency to decide
          if (hasTransparency) {
            setBackgroundColor("#f9fafb")
            setBackgroundType("light")
          } else {
            setBackgroundColor("transparent")
            setBackgroundType("neutral")
          }
        }
      } catch {
        // On error, use default background
        setBackgroundColor(defaultBg)
        setBackgroundType("neutral")
      } finally {
        setIsAnalyzing(false)
      }
    }

    analyzeImage()
  }, [imageUrl, defaultBg])

  return { backgroundColor, backgroundType, isAnalyzing }
}

/**
 * Simpler version that just returns a safe background color
 * without the full analysis - uses a subtle pattern/gradient
 */
export function getSafeLogoBackground(): string {
  return "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
}

