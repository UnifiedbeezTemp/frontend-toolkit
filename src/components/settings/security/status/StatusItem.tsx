import React from "react";
import { StatusItemProps } from "./TwoFactorStatus.types";
import Text from "../../../ui/Text";

export default function StatusItem({ label, value, badge }: StatusItemProps) {
  return (
    <div className="p-[1rem] bg-input-filled border border-border rounded-[1.2rem] flex justify-between items-center">
      <div className="flex flex-col gap-[0.4rem]">
        <Text className="text-text-primary text-[1.3rem]">{label}</Text>
        <Text className="font-medium text-[1.2rem]">{value}</Text>
      </div>
      {badge && (
        <div className="px-[0.8rem] py-[0.4rem] bg-warning/10 text-warning text-[1.2rem] rounded-full font-medium">
          {badge}
        </div>
      )}
    </div>
  );
}
