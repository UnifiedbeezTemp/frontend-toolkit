"use client";

import Heading from "../../../../../components/ui/Heading";
import Text from "../../../../../components/ui/Text";
import { DNSRecordsDisplayProps } from "./shared/types";

export default function DNSRecordsDisplay({
  dnsRecords,
}: DNSRecordsDisplayProps) {
  return (
    <div className="space-y-[1.6rem]">
      <div>
        <Heading size="sm" className="mb-[0.8rem]">
          DNS Records to Add
        </Heading>
        <Text size="sm" className="text-text-secondary mb-[1.6rem]">
          Add these DNS records to your domain provider. Verification may take up to 72 hours.
        </Text>
      </div>

      <div className="space-y-[1.2rem]">
        {dnsRecords.map((record, index) => (
          <div
            key={index}
            className="bg-input-filled border border-input-stroke rounded-[0.8rem] p-[1.6rem]"
          >
            <div className="grid grid-cols-1 gap-[1.2rem] md:grid-cols-4">
              <div>
                <Text size="sm" className="text-text-secondary mb-[0.4rem]">
                  Type
                </Text>
                <Text className="font-[600]">{record.type}</Text>
              </div>
              <div>
                <Text size="sm" className="text-text-secondary mb-[0.4rem]">
                  Name
                </Text>
                <Text className="font-[600] break-all">{record.name}</Text>
              </div>
              <div>
                <Text size="sm" className="text-text-secondary mb-[0.4rem]">
                  Value
                </Text>
                <Text className="font-[600] break-all">{record.value}</Text>
              </div>
              {record.priority !== undefined && (
                <div>
                  <Text size="sm" className="text-text-secondary mb-[0.4rem]">
                    Priority
                  </Text>
                  <Text className="font-[600]">{record.priority}</Text>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

