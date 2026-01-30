"use client";

import { useState } from "react";
import Button from "../../../../../components/ui/Button";
import Input from "../../../../../components/ui/Input";
import Heading from "../../../../../components/ui/Heading";
import Text from "../../../../../components/ui/Text";
import { PhoneSteps } from "../hooks/useTelegramIntegration";

interface TelegramPhoneFlowProps {
  step: PhoneSteps;
  onSendCode: (phone: string) => void;
  onVerifyCode: (code: string) => void;
  onVerify2FA: (password: string) => void;
  isLoading: boolean;
  onReset: () => void;
}

export default function TelegramPhoneFlow({
  step,
  onSendCode,
  onVerifyCode,
  onVerify2FA,
  isLoading,
  onReset,
}: TelegramPhoneFlowProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const handlePhoneSubmit = () => onSendCode(phoneNumber);
  const handleCodeSubmit = () => onVerifyCode(code);
  const handle2FASubmit = () => onVerify2FA(password);

  return (
    <div className="flex flex-col gap-6 p-6 bg-input-filled border border-input-stroke rounded-[0.8rem]">
      <div className="flex justify-between items-center">
        <Heading size="xs">
          {step === "phone" && "Enter Phone Number"}
          {step === "code" && "Verify Code"}
          {step === "2fa" && "Two-Factor Authentication"}
        </Heading>
        <Button
          variant="ghost"
          className="h-auto p-0 text-sm"
          onClick={onReset}
        >
          Switch Method
        </Button>
      </div>

      {step === "phone" && (
        <div className="space-y-4">
          <Text size="sm">
            Enter the phone number associated with your Telegram account.
          </Text>
          <Input
            placeholder="+1 234 567 8900"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handlePhoneSubmit}
            loading={isLoading}
            disabled={!phoneNumber.trim()}
          >
            Send Code
          </Button>
        </div>
      )}

      {step === "code" && (
        <div className="space-y-4">
          <Text size="sm">Enter the code sent to your Telegram app.</Text>
          <Input
            placeholder="12345"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleCodeSubmit}
            loading={isLoading}
            disabled={!code.trim()}
          >
            Verify Code
          </Button>
        </div>
      )}

      {step === "2fa" && (
        <div className="space-y-4">
          <Text size="sm">Enter your two-factor authentication password.</Text>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handle2FASubmit}
            loading={isLoading}
            disabled={!password.trim()}
          >
            Verify Password
          </Button>
        </div>
      )}
    </div>
  );
}
