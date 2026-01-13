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

export interface PhoneOTPPayload {
  phone: string;
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
  message: string;
  requiresTwoFactor?: boolean;
  tempToken?: string;
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

export interface StartTrialPayload {
  planType?: string;
}

export interface TrialResponseData {
  message: string;
  trialEndsAt: string;
  clientSecret: string;
  customerId: string;
}

export interface AttachPaymentMethodPayload {
  payment_method_id: string;
}

export interface AttachPaymentMethodResponse {
  success: boolean;
  message: string;
}
export interface TrialPayload {
  planType?: string;
  paymentMethod: {
    cardHolderName: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
}

export interface TrialResponseData {
  message: string;
}

export interface AuthResponseData {
  session_id?: string;
  remember_me?: boolean;
  user: UserProfile;
  timestamp: string;
  verified: boolean;
  requiresTwoFactor?: boolean;
  tempToken?: string;
}

export interface TwoFactorVerifyPayload {
  tempToken: string;
  token: string;
  type: "totp" | "email" | "backup";
  remember_me: boolean;
  deviceInfo: DeviceInfo;
}

export interface TwoFactorEmailRequestPayload {
  tempToken: string;
}

export interface TwoFactorVerifyResponse {
  session_id: string;
  user: UserProfile;
  verified: boolean;
  message?: string;
}

export interface SocialAuthPayload {
  provider: "google" | "apple" | "microsoft";
  auth_code: string;
  device_info: DeviceInfo;
  remember_me?: boolean;
  code_verifier?: string;
}

export interface UpdateOnboardingMethodPayload {
  method: "copilot" | "manual";
}

export interface UpdateOnboardingMethodResponse {
  message: string;
  user: UserProfile;
}
