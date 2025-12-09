"use client";

import { MobileRoleBadgeProps } from "./types";
import { useAppSelector } from "../../../store/hooks/useRedux";
import { getRoleName } from "../utils/transformers";

export default function MobileRoleBadge({ role }: MobileRoleBadgeProps) {
  const roles = useAppSelector((state) => state.members.roles);
  const roleName = getRoleName(role, roles);
  
  return (
    <div className="flex justify-start">
      <p className="text-[1.2rem] text-text-primary border border-input-stroke rounded-[0.3rem] px-[0.8rem] py-[0.4rem] mt-[-2rem] bg-border/50">
        {roleName}
      </p>
    </div>
  );
}
