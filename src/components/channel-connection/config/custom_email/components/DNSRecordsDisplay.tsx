import { useState, useEffect } from "react";
import Heading from "../../../../../components/ui/Heading";
import Text from "../../../../../components/ui/Text";
import Button from "../../../../../components/ui/Button";
import { DNSRecordsDisplayProps } from "./shared/types";
import CopyIconAlt from "../../../../../assets/icons/CopyIconAlt";
import CheckIcon from "../../../../../assets/icons/CheckIcon";

interface FlattenedRecord {
  type: string;
  name: string;
  value: string;
  priority?: number;
}

const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    void navigator.clipboard.writeText(value);
    setCopied(true);
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
    >
      {copied ? (
        <CheckIcon className="text-success" />
      ) : (
        <CopyIconAlt className="text-text-secondary" />
      )}
    </button>
  );
};

export default function DNSRecordsDisplay({
  dnsRecords,
  instructions,
  onVerify,
  isVerifying,
  verificationError: initialVerificationError,
}: DNSRecordsDisplayProps) {
  const [displayError, setDisplayError] = useState("");

  useEffect(() => {
    if (initialVerificationError) {
      setDisplayError(initialVerificationError);
      const timer = setTimeout(() => setDisplayError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [initialVerificationError]);

  const flattenedRecords: FlattenedRecord[] = [
    ...(dnsRecords?.mx ?? []).map((r) => ({
      type: "MX",
      name: "@",
      value: r.value,
      priority: r.priority,
    })),
    ...(dnsRecords?.txt ?? []).map((v) => ({
      type: "TXT",
      name: "@",
      value: v,
    })),
    ...(dnsRecords?.cname ?? []).map((r) => ({
      type: "CNAME",
      name: r.name,
      value: r.value,
    })),
  ];

  return (
    <div className="space-y-[1.6rem]">
      <div>
        <Heading size="sm" className="mb-[0.8rem]">
          DNS Records to Add
        </Heading>
        <Text size="sm" className="text-text-secondary mb-[1.6rem]">
          Add these DNS records to your domain provider. Verification may take
          up to 72 hours.
        </Text>
      </div>

      <div className="space-y-[1.2rem]">
        {flattenedRecords?.map((record, index) => (
          <div
            key={index}
            className="bg-input-filled border border-input-stroke rounded-[0.8rem] p-[1.6rem]"
          >
            <div className="grid grid-cols-1 gap-[1.2rem]">
              <div className="flex items-start gap-[1rem]">
                <Text
                  size="sm"
                  className="text-text-secondary font-bold mt-[.4rem]"
                >
                  Type:
                </Text>
                <Text className="font-[600] italic">{record?.type}</Text>
              </div>
              <div className="flex items-start gap-[1rem]">
                <div className="flex items-start gap-[0.4rem] min-w-0">
                  <Text
                    size="sm"
                    className="text-text-secondary font-bold mt-[.4rem]"
                  >
                    Name:
                  </Text>
                  <Text className="font-[600] italic break-all">
                    {record?.name}
                  </Text>
                  <CopyButton value={record?.name} />
                </div>
              </div>
              <div className="flex items-start gap-[1rem]">
                <div className="flex items-start gap-[0.4rem] min-w-0">
                  <Text
                    size="sm"
                    className="text-text-secondary font-bold mt-[.4rem]"
                  >
                    Value:
                  </Text>
                  <Text className="font-[600] italic break-all">
                    {record?.value}
                  </Text>
                  <CopyButton value={record?.value} />
                </div>
              </div>
              {record?.priority !== undefined && (
                <div className="flex items-start gap-[1rem]">
                  <Text
                    size="sm"
                    className="text-text-secondary font-bold mt-[.4rem]"
                  >
                    Priority:
                  </Text>
                  <Text className="font-[600] italic">{record?.priority}</Text>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {instructions && (
        <div className="mt-[2.4rem] p-[1.6rem] bg-brand-primary/5 border border-brand-primary/20 rounded-[0.8rem]">
          <Heading size="sm" className="mb-[1.2rem]">
            Next Steps
          </Heading>
          <ul className="space-y-[0.8rem] mb-[1.2rem]">
            {instructions.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-[0.8rem]">
                <span className="shrink-0 w-[2rem] h-[2rem] bg-brand-primary text-white text-[1.2rem] flex items-center justify-center rounded-full">
                  {idx + 1}
                </span>
                <Text size="sm">{step}</Text>
              </li>
            ))}
          </ul>
          {instructions.note && (
            <div className="pt-[1.2rem] border-t border-brand-primary/10">
              <Text size="sm" className="italic">
                Note: {instructions.note}
              </Text>
            </div>
          )}
        </div>
      )}

      <div className="pt-[1.6rem]">
        {displayError && (
          <Text size="sm" className="text-destructive mb-[0.8rem] animate-in fade-in slide-in-from-top-1">
            {displayError}
          </Text>
        )}
        <Button
          onClick={onVerify}
          loading={isVerifying}
          disabled={isVerifying}
          className="w-full"
        >
          Verify
        </Button>
      </div>
    </div>
  );
}

