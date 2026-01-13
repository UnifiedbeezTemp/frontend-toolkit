export * from "./types";
export * from "./error";

import { signupService } from "./signupService";
import { emailVerificationService } from "./emailVerificationService";
import { loginService } from "./loginService";
import { passwordService } from "./passwordService";
import { profileService } from "./profileService";
import { accountSetupService } from "./accountSetupService";
import { phoneVerificationService } from "./phoneVerificationService";
import { trialService } from "./trialService";
import { socialAuthService } from "./socialAuthService";
import { twoFactorService } from "./twoFactorService";

export const authService = {
  signup: signupService.signup,
  verifyEmail: emailVerificationService.verifyEmail,
  resendOTP: emailVerificationService.resendOTP,
  verifyPhone: phoneVerificationService.verifyPhone,
  resendPhoneOTP: phoneVerificationService.resendPhoneOTP,
  signIn: loginService.signIn,
  requestPasswordReset: passwordService.requestPasswordReset,
  confirmPasswordReset: passwordService.confirmPasswordReset,
  getProfile: profileService.getProfile,
  setupProfile: accountSetupService.setupProfile,
  uploadProfilePhoto: accountSetupService.uploadProfilePhoto,
  initiatePhoneVerification: accountSetupService.initiatePhoneVerification,
  confirmTrialStart: trialService.confirmTrialStart,
  attachPaymentMethod: trialService.attachPaymentMethod,
  logout: profileService.logout,
  socialSignIn: socialAuthService.signIn,
  socialSignUp: socialAuthService.signUp,
  updateOnboardingMethod: accountSetupService.updateOnboardingMethod,
  verifyTwoFactor: twoFactorService.verify,
  request2FAEmailCode: twoFactorService.requestEmailBackupCode,
  setup2FA: twoFactorService.setup2FA,
  disable2FA: twoFactorService.disable2FA,
  verify2FASetup: twoFactorService.verify2FASetup,
  getTwoFactorStatus: twoFactorService.getTwoFactorStatus,
  regenerateBackupCodes: twoFactorService.regenerateBackupCodes,
};
