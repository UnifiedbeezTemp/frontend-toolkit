"use client"

import React, { ReactNode, useEffect } from "react"
import { useBrandColors } from "../hooks/useBrandColors"
import { useBrandFont } from "../hooks/useBrandFont"
import { useSocialLinks } from "../hooks/useSocialLinks"
import { useCompanyLogo } from "../hooks/useCompanyLogo"
import { useBrandKitMapper } from "../hooks/useBrandKitMapper"
import { useToast } from "../../../components/ui/toast/useToast"
import type {
  BrandKitContextType,
  BrandKitReadonlyState,
} from "../types/brandKitTypes"
import type { BrandDetectionResponse } from "../../../types/brandKitApiTypes"
import {
  useBrandKitData,
  useUpdateBrandKit,
  useUploadBrandLogo,
  useDeleteBrandLogo,
  useDetectBrandKit,
} from "../../../api/hooks/useBrandKitQueries"
import { BrandKitContext } from "./BrandKitContext"
import { useBrandKitActions } from "./useBrandKitActions"
import { useBrandKitChangeDetection } from "./useBrandKitChangeDetection"
import { BrandDetectionOverride } from "./contextTypes"
import BrandKitDetectionModal from "../detection/BrandKitDetectionModal"

const INITIAL_READONLY_FIELDS: BrandKitReadonlyState = {
  companyLogoUrl: "",
}

export function BrandKitProvider({ children }: { children: ReactNode }) {
  const {
    colors,
    lightHandlers,
    darkHandlers,
    buttonHandlers,
    accentHandlers,
    fontColorHandlers,
    setColors,
  } = useBrandColors()
  const { fonts, headerHandlers, bodyHandlers, scaleHandlers, setFonts } =
    useBrandFont()
  const {
    links,
    handleUpdateLink,
    handleUpdatePlatform,
    handleAddLink,
    handleRemoveLink,
    setLinks,
  } = useSocialLinks()
  const {
    logo,
    pendingLogoFile,
    fileInputRef,
    handleLogoUpload,
    triggerUpload,
    removeLogo,
    setLogo,
    setPendingLogoFile,
  } = useCompanyLogo()
  const [websiteUrl, setWebsiteUrl] = React.useState("")
  const [detectedFaviconUrl, setDetectedFaviconUrlState] = React.useState("")
  const [readonlyFields, setReadonlyFields] = React.useState(
    INITIAL_READONLY_FIELDS,
  )

  const { data: brandKitData, isLoading, error, refetch } = useBrandKitData()
  const { mapApiToState, mapStateToPayload } = useBrandKitMapper()
  const { showToast } = useToast()

  const detectionOverrideRef = React.useRef<BrandDetectionOverride | null>(null)
  const setDetectionOverride = React.useCallback(
    (override: BrandDetectionOverride | null) => {
      detectionOverrideRef.current = override
    },
    [],
  )

  const { mutateAsync: updateBrandKitMutation, isPending: isSaving } =
    useUpdateBrandKit()
  const { mutateAsync: uploadLogoMutation, isPending: isUploadingLogo } =
    useUploadBrandLogo()
  const { mutateAsync: deleteLogoMutation, isPending: isDeletingLogo } =
    useDeleteBrandLogo()
  const { mutateAsync: detectBrandMutation, isPending: isDetecting } =
    useDetectBrandKit()

  const [isDetectionModalOpen, setIsDetectionModalOpen] = React.useState(false)
  const [detectionData, setDetectionData] =
    React.useState<BrandDetectionResponse | null>(null)

  const handleDetectionStart = React.useCallback(() => {
    setDetectionData(null)
    setIsDetectionModalOpen(false)
  }, [])

  const handleDetectionEvent = React.useCallback(() => {
    // Intentionally no-op — modal opens only once the request completes successfully.
  }, [])

  const handleDetectionComplete = React.useCallback(
    (data: BrandDetectionResponse) => {
      setDetectionData(data)
      setIsDetectionModalOpen(true)
    },
    [],
  )

  const handleDetectionError = React.useCallback(() => {
    setIsDetectionModalOpen(false)
  }, [])

  const {
    onImportBrandKit,
    handleDetectBrand,
    revertChanges,
    handleRemoveLogo,
    saveBrandKit,
  } = useBrandKitActions({
    colors,
    fonts,
    links,
    logo,
    pendingLogoFile,
    brandKitData,
    websiteUrl,
    detectedFaviconUrl,
    readonlyFields,
    setColors,
    setFonts,
    setLinks,
    setLogo,
    setWebsiteUrl,
    setDetectedFaviconUrl: setDetectedFaviconUrlState,
    setReadonlyFields,
    setPendingLogoFile,
    removeLogo,
    mapApiToState,
    mapStateToPayload,
    showToast,
    refetch,
    updateBrandKitMutation,
    uploadLogoMutation,
    deleteLogoMutation,
    detectBrandMutation,
    setDetectionOverride,
    onDetectionStart: handleDetectionStart,
    onDetectionEvent: handleDetectionEvent,
    onDetectionComplete: handleDetectionComplete,
    onDetectionError: handleDetectionError,
  })

  const hasChanges = useBrandKitChangeDetection({
    brandKitData,
    colors,
    fonts,
    links,
    logo,
    pendingLogoFile,
    mapStateToPayload,
  })

  useEffect(() => {
    if (brandKitData) {
      const mappedState = mapApiToState(brandKitData)
      const override = detectionOverrideRef.current
      if (override) {
        detectionOverrideRef.current = null

        if (override.logoUrl) {
          mappedState.logo = override.logoUrl
        }

        if (override.primaryColor) {
          mappedState.colors = {
            ...mappedState.colors,
            light: {
              ...mappedState.colors.light,
              primary: override.primaryColor,
            },
            dark: {
              ...mappedState.colors.dark,
              primary: override.primaryColor,
            },
            accentColor: override.primaryColor,
          }
        }
      }
      onImportBrandKit(mappedState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandKitData])

  useEffect(() => {
    if (pendingLogoFile) return

    const nextLogo = detectedFaviconUrl || readonlyFields.companyLogoUrl || null
    if (logo !== nextLogo) {
      setLogo(nextLogo)
    }
  }, [
    detectedFaviconUrl,
    readonlyFields.companyLogoUrl,
    pendingLogoFile,
    logo,
    setLogo,
  ])

  const value: BrandKitContextType = {
    websiteUrl,
    colors,
    fonts,
    socialLinks: links,
    logo,
    readonlyFields,
    isLoading,
    isSaving: isSaving || isUploadingLogo || isDeletingLogo,
    isDeletingLogo,
    isDetecting,
    hasChanges,
    error,
    refetch,
    saveBrandKit,
    detectBrand: handleDetectBrand,
    revertChanges,
    setWebsiteUrl,
    setDetectedFaviconUrl: setDetectedFaviconUrlState,
    colorHandlers: {
      light: {
        mode: "Light",
        primary: colors.light.primary,
        background: colors.light.background,
        disabled: isDetecting,
        ...lightHandlers,
      },
      dark: {
        mode: "Dark",
        primary: colors.dark.primary,
        background: colors.dark.background,
        disabled: isDetecting,
        ...darkHandlers,
      },
      button: {
        color: colors.button.color,
        text: colors.button.text,
        stroke: colors.button.stroke,
        disabled: isDetecting,
        ...buttonHandlers,
      },
      accent: {
        accentColor: colors.accentColor,
        disabled: isDetecting,
        ...accentHandlers,
      },
      font: {
        disabled: isDetecting,
        ...fontColorHandlers,
      },
    },
    fontHandlers: {
      header: {
        label: "Header Font",
        family: fonts.header.family,
        weight: fonts.header.weight,
        disabled: isDetecting,
        ...headerHandlers,
      },
      body: {
        label: "Body Font",
        family: fonts.body.family,
        weight: fonts.body.weight,
        disabled: isDetecting,
        ...bodyHandlers,
      },
      scale: {
        disabled: isDetecting,
        ...scaleHandlers,
      },
    },
    socialHandlers: {
      onUpdateLink: handleUpdateLink,
      onUpdatePlatform: handleUpdatePlatform,
      onAddLink: handleAddLink,
      onRemoveLink: handleRemoveLink,
    },
    logoHandlers: {
      onUpload: handleLogoUpload,
      onRemove: handleRemoveLogo,
      triggerUpload,
      fileInputRef,
    },
    onImportBrandKit,
  }

  return (
    <BrandKitContext.Provider value={value}>
      {children}
      <BrandKitDetectionModal
        isOpen={isDetectionModalOpen}
        onClose={() => setIsDetectionModalOpen(false)}
        data={detectionData}
      />
    </BrandKitContext.Provider>
  )
}
