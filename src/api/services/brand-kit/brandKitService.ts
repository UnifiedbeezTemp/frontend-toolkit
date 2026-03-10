import { api } from "../..";
import {
  BrandKitResponse,
  UpdateBrandKitPayload,
  LogoUploadResponse,
  BrandDetectionPayload,
  BrandDetectionResponse,
} from "../../../types/brandKitApiTypes";

export const fetchBrandKit = (): Promise<BrandKitResponse> => {
  return api.get<BrandKitResponse>(`/brand-kit`);
};

export const updateBrandKit = (
  payload: UpdateBrandKitPayload,
): Promise<BrandKitResponse> => {
  return api.put<UpdateBrandKitPayload, BrandKitResponse>(
    `/brand-kit`,
    payload,
  );
};

export const uploadBrandLogo = (file: File): Promise<LogoUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post<FormData, LogoUploadResponse>(
    `/brand-kit/upload-logo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const deleteBrandLogo = (): Promise<{ message: string }> => {
  return api.delete<{ message: string }>(`/brand-kit/logo`);
};

export const detectBrandKit = (
  payload: BrandDetectionPayload,
): Promise<BrandDetectionResponse> => {
  return api.post<BrandDetectionPayload, BrandDetectionResponse>(
    `/brand-kit/detect`,
    payload,
  );
};
