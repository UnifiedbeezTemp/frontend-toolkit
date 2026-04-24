import { useAppQuery, useAppMutation } from "../query"
import {
  fetchBrandKit,
  updateBrandKit,
  uploadBrandLogo,
  deleteBrandLogo,
  detectBrandKit,
} from "../services/brand-kit/brandKitService"
import {
  BrandKitResponse,
  UpdateBrandKitPayload,
  BrandKitErrorResponse,
  LogoUploadResponse,
  BrandDetectionPayload,
  BrandDetectionResponse,
} from "../../types/brandKitApiTypes"

export const useBrandKitData = () => {
  return useAppQuery<BrandKitResponse, BrandKitErrorResponse>(
    ["brand-kit"],
    () => fetchBrandKit(),
  )
}

export const useUpdateBrandKit = () => {
  return useAppMutation<
    UpdateBrandKitPayload,
    BrandKitResponse,
    BrandKitErrorResponse
  >((payload) => updateBrandKit(payload))
}

export const useUploadBrandLogo = () => {
  return useAppMutation<File, LogoUploadResponse, BrandKitErrorResponse>(
    (file) => uploadBrandLogo(file),
  )
}

export const useDeleteBrandLogo = () => {
  return useAppMutation<void, { message: string }, BrandKitErrorResponse>(() =>
    deleteBrandLogo(),
  )
}

export const useDetectBrandKit = () => {
  return useAppMutation<
    BrandDetectionPayload,
    BrandDetectionResponse,
    BrandKitErrorResponse
  >((payload) => detectBrandKit(payload))
}
