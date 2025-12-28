import { authBaseUrl } from "../../rootUrls";
import {
  AuthResponse,
  AuthError,
  AccountSetupFormData,
  PhoneVerificationResponse,
  PhotoUploadResponse,
  ProfileSetupResponse,
} from ".";
import { createEmptyUser } from "../../../types/userProfileTypes";

export const accountSetupService = {
  async setupProfile(
    data: AccountSetupFormData
  ): Promise<AuthResponse<ProfileSetupResponse>> {
    const response = await fetch(`${authBaseUrl}/setup/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const responseText = await response.text();
    const responseData = this.parseProfileResponse(responseText);

    if (!response.ok) {
      throw new AuthError(
        this.getErrorMessage(responseData),
        response.status
        // responseData
      );
    }

    return this.createAuthResponse(responseData, response);
  },

  async uploadProfilePhoto(
    file: File
  ): Promise<AuthResponse<PhotoUploadResponse>> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${authBaseUrl}/profile/photo`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const responseText = await response.text();
    const responseData = this.parsePhotoResponse(responseText);

    if (!response.ok) {
      throw new AuthError(
        this.getErrorMessage(responseData),
        response.status
        // responseData
      );
    }

    return this.createAuthResponse(responseData, response);
  },

  async initiatePhoneVerification(
    phone: string
  ): Promise<AuthResponse<PhoneVerificationResponse>> {
    const response = await fetch(`${authBaseUrl}/phone/send-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ phone }),
    });

    const responseText = await response.text();
    const responseData = this.parsePhoneResponse(responseText);

    // console.log(responseData)

    if (!response.ok) {
      throw new AuthError(
        this.getErrorMessage(responseData),
        response.status,
        responseData
      );
    }

    return this.createAuthResponse(responseData, response);
  },

  async selectPlan(
    planType: string
  ): Promise<AuthResponse<ProfileSetupResponse>> {
    const response = await fetch(`${authBaseUrl}/setup/plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ planType: planType.toUpperCase() }),
    });

    const responseText = await response.text();
    const responseData = this.parseProfileResponse(responseText);

    if (!response.ok) {
      throw new AuthError(this.getErrorMessage(responseData), response.status);
    }

    return this.createAuthResponse(responseData, response);
  },

  parseProfileResponse(responseText: string): ProfileSetupResponse {
    try {
      const data = JSON.parse(responseText);
      return {
        user: data || createEmptyUser(),
        message: data.message,
      };
    } catch {
      return {
        user: createEmptyUser(),
        message: responseText || "Unknown error occurred",
      };
    }
  },

  parsePhotoResponse(responseText: string): PhotoUploadResponse {
    try {
      const data = JSON.parse(responseText);
      return {
        photoUrl: data.photoUrl || "",
        user: data.user || createEmptyUser(),
        message: data.message,
      };
    } catch {
      return {
        photoUrl: "",
        user: createEmptyUser(),
        message: responseText || "Unknown error occurred",
      };
    }
  },

  parsePhoneResponse(responseText: string): PhoneVerificationResponse {
    try {
      const data = JSON.parse(responseText);
      return {
        verificationId: data.verificationId || "",
        message: data.message || responseText || "Unknown error occurred",
      };
    } catch {
      return {
        verificationId: "",
        message: responseText || "Unknown error occurred",
      };
    }
  },

  getErrorMessage(
    responseData:
      | ProfileSetupResponse
      | PhotoUploadResponse
      | PhoneVerificationResponse
      | { message?: string | { message?: string }; error?: string }
  ): string {
    const data = responseData as {
      message?: string | { message?: string };
      error?: string;
    };

    if (typeof data.message === "object" && data.message?.message) {
      return data.message.message;
    }

    if (typeof data.message === "string") {
      return data.message;
    }

    return data.error || "Request failed";
  },

  createAuthResponse<T>(data: T, response: Response): AuthResponse<T> {
    return {
      data,
      status: response.status,
      ok: response.ok,
    };
  },
};
