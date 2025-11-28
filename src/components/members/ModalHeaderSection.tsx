"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import ModalHeader from "../modal/ModalHeader";
import Button from "../ui/Button";
import CloseModalButton from "../modal/CloseModalButton";

interface ModalHeaderSectionProps {
  onClose: () => void;
}

export default function ModalHeaderSection({
  onClose,
}: ModalHeaderSectionProps) {
  const supabaseIcons = useSupabaseIcons();

  return (
    <ModalHeader
      text="Add team members to your company"
      description="Your new project has been created. Invite colleagues to collaborate on this project."
      className="pt-[2.4rem] pb-[4rem]"
      action={
        <CloseModalButton onClick={onClose}/> 
      }
      leftContent={
        <Button className="text-secondary" variant="secondary">
          <Image
            alt="users"
            src={supabaseIcons.usersPlus}
            width={25}
            height={25}
          />
        </Button>
      }
    />
  );
}
