"use client";

import Input from "../../../../../forms/Input";
import { AreaCodeInputProps } from "../../types";

export default function AreaCodeInput({
  areaCode,
  onAreaCodeChange,
}: AreaCodeInputProps) {
  return (
    <div>
      <label className="block text-[1.4rem] lg:text-[1.6rem] text-text-secondary font-[700] mb-[0.8rem]">
        Area Code{" "}
        <span className="text-text-primary text-[1.2rem] font-[400]">
          (Optional)
        </span>
      </label>
      <Input
        type="text"
        value={areaCode}
        onChange={(e) => onAreaCodeChange(e.target.value)}
        placeholder="Enter code"
      />
    </div>
  );
}
