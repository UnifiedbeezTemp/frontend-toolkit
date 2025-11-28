"use client";

import { useEffect } from "react";
import { getInitialMembers, getInitialInvitedUsers } from "./utils/data";
import ModalHeaderSection from "./ModalHeaderSection";
import InviteSection from "./InviteSection";
import UsersSections from "./UsersSection";
import ModalActions from "./ModalActions";
import { useSupabaseImages } from "../../lib/supabase/useSupabase";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { setMembers, setInvitedUsers } from "../../store/onboarding/slices/membersSlice";
import Modal from "../modal/Modal";

interface MembersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MembersModal({ isOpen, onClose }: MembersModalProps) {
  const dispatch = useAppDispatch();
  const supabaseImages = useSupabaseImages();

  useEffect(() => {
    const membersData = getInitialMembers(() => supabaseImages.avatar);
    const invitedUsersData = getInitialInvitedUsers(
      () => supabaseImages.avatar
    );

    dispatch(setMembers(membersData));
    dispatch(setInvitedUsers(invitedUsersData));
  }, [dispatch, supabaseImages.avatar]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" className="max-h-[98vh] rounded-[1.6rem]">
      <div className="px-[4rem]">
        <ModalHeaderSection onClose={onClose} />

        <InviteSection />

        <UsersSections />
      </div>

      <ModalActions onClose={onClose} />
    </Modal>
  );
}
