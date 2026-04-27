"use client";

import Button from "../../../../../components/ui/Button";
import Heading from "../../../../../components/ui/Heading";
import PreLoader from "../../../../../components/ui/PreLoader";
import Text from "../../../../../components/ui/Text";

interface TelegramQRFlowProps {
  qrUrl: string | null;
  isLoading: boolean;
  onReset: () => void;
}

export default function TelegramQRFlow({
  qrUrl,
  isLoading,
  onReset,
}: TelegramQRFlowProps) {
  return (
    <div className="flex flex-col gap-6 p-6 bg-input-filled border border-input-stroke rounded-[0.8rem]">
      <div className="flex justify-between items-center">
        <Heading size="xs">Scan QR Code</Heading>
        <Button
          variant="ghost"
          className="h-auto p-0 text-sm"
          onClick={onReset}
        >
          Switch Method
        </Button>
      </div>

      <div className="space-y-4 flex flex-col items-center">
        <Text size="sm" className="text-center">
          Open Telegram on your phone, go to Settings &gt; Devices &gt; Link
          Desktop Device, and scan this QR code.
        </Text>

        <div className="bg-primary p-4 rounded-xl w-64 h-64 flex items-center justify-center relative shadow-sm">
          {qrUrl ? (
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=224x224&data=${encodeURIComponent(
                qrUrl,
              )}`}
              alt="Telegram QR Code"
              width={224}
              height={224}
              className="w-full h-full object-contain"
            />
          ) : (
            <PreLoader/>
          )}
          {isLoading && !qrUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-primary/50">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          )}
        </div>

        <Text size="xs" className="text-text-secondary animate-pulse">
          Waiting for scan completion...
        </Text>
      </div>
    </div>
  );
}
