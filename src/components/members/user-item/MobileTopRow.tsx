import Image from "next/image";
import { TeamMember } from "../../../store/onboarding/types/memberTypes";
import CheckboxButton from "./CheckboxButton";
import { MobileTopRowProps } from "./types";

export default function MobileTopRow({ user, onToggle, supabaseIcons }: MobileTopRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[0.7rem]">
        <Image
          alt="avatar"
          src={user.avatar}
          width={32}
          height={32}
          className="object-cover"
        />
        <p className="text-[1.4rem] text-text-primary">{user.email}</p>
      </div>

      <CheckboxButton
        isSelected={user.isSelected}
        onToggle={onToggle}
        supabaseIcons={supabaseIcons}
      />
    </div>
  );
}