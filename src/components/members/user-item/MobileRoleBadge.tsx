import { MobileRoleBadgeProps } from "./types";

export default function MobileRoleBadge({ role }: MobileRoleBadgeProps) {
  return (
    <div className="flex justify-start">
      <p className="text-[1.2rem] text-text-primary border border-input-stroke rounded-lg px-[0.8rem] py-[0.4rem] mt-[-2rem] bg-border/50">
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </p>
    </div>
  );
}
