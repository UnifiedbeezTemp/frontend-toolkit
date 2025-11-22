import { DeviceInfo } from "../../../../types/deviceInfoTypes";
import { UserProfile } from "../../../../types/userProfileTypes";

export interface AuthResponse<T = unknown> {
  data: T;
  status: number;
  ok: boolean;
}

export interface AuthPayload {
  email: string;
  password: string;
  device_info: DeviceInfo;
}

export interface OTPPayload {
  email: string;
  code: string;
}

export interface ResetPasswordPayload {
  email: string;
}

export interface ConfirmResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface LoginResponseData {
  token: string;
  user: UserProfile | null;
  refreshToken?: string;
}

export interface SignupResponseData {
  message: string;
  user: UserProfile;
}

export interface VerificationResponseData {
  message: string;
  user: UserProfile;
}

export interface PasswordResetResponseData {
  message: string;
}

export interface ErrorResponseData {
  message: string;
  error?: string;
  code?: string;
}

export interface ProfileSetupResponse {
  user: UserProfile;
  message?: string;
}

export interface PhotoUploadResponse {
  photoUrl: string;
  user: UserProfile;
  message?: string;
}

export interface PhoneVerificationResponse {
  verificationId: string;
  message: string;
}

export interface AccountSetupFormData {
  firstName: string;
  lastName: string;
  phone: string;
}
