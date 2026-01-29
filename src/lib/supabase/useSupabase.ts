import { useMemo } from "react"
import {
  getAssetUrl,
  SUPABASE_GIFS,
  SUPABASE_ANIMATIONS,
  SUPABASE_ICONS,
  SUPABASE_IMAGES,
} from "./supabaseAssets"

export const useSupabaseImages = () => {
  return useMemo(
    () =>
      Object.keys(SUPABASE_IMAGES)
        .map((key) => ({
          [key]: getAssetUrl(
            SUPABASE_IMAGES[key as keyof typeof SUPABASE_IMAGES]
          ),
        }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    []
  ) as Record<keyof typeof SUPABASE_IMAGES, string>
}

export const useSupabaseIcons = () => {
  return useMemo(
    () =>
      Object.keys(SUPABASE_ICONS)
        .map((key) => ({
          [key]: getAssetUrl(
            SUPABASE_ICONS[key as keyof typeof SUPABASE_ICONS]
          ),
        }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    []
  ) as Record<keyof typeof SUPABASE_ICONS, string>
}

export const useSupabaseGifs = () => {
  return useMemo(
    () =>
      Object.keys(SUPABASE_GIFS)
        .map((key) => ({
          [key]: getAssetUrl(SUPABASE_GIFS[key as keyof typeof SUPABASE_GIFS]),
        }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    []
  ) as Record<keyof typeof SUPABASE_GIFS, string>
}

export const useSupabaseAnimations = () => {
  return useMemo(
    () =>
      Object.keys(SUPABASE_ANIMATIONS)
        .map((key) => ({
          [key]: getAssetUrl(SUPABASE_ANIMATIONS[key as keyof typeof SUPABASE_ANIMATIONS]),
        }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    []
  ) as Record<keyof typeof SUPABASE_ANIMATIONS, string>
}
