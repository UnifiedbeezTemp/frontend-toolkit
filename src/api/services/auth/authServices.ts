export * from "./types";
export * from "./error";

import { signupService } from "./signupService";
import { emailVerificationService } from "./emailVerificationService";
import { loginService } from "./loginService";
import { passwordService } from "./passwordService";
import { profileService } from "./profileService";
import { accountSetupService } from "./accountSetupService";

export const authService = {
  signup: signupService.signup,
  verifyEmail: emailVerificationService.verifyEmail,
  resendOTP: emailVerificationService.resendOTP,
  signIn: loginService.signIn,
  requestPasswordReset: passwordService.requestPasswordReset,
  confirmPasswordReset: passwordService.confirmPasswordReset,
  getProfile: profileService.getProfile,
  setupProfile: accountSetupService.setupProfile,
  uploadProfilePhoto: accountSetupService.uploadProfilePhoto,
  initiatePhoneVerification: accountSetupService.initiatePhoneVerification,
  logout: profileService.logout,
};
