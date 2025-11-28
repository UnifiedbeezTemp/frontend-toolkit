"use client";

import { useAppSelector } from "../../store/hooks/useRedux";
import { selectFilteredInvitedUsers, selectTotalInvitedUsers } from "../../store/onboarding/slices/membersSlice";
import Heading from "../ui/Heading";
import SearchAndFilter from "./SearchAndFilter";
import UserList from "./UserList";

export default function InvitedUsersSection() {
  const invitedUsers = useAppSelector(selectFilteredInvitedUsers);
  const totalInvitedUsers = useAppSelector(selectTotalInvitedUsers);

  return (
    <div className="border-border pb-[2.4rem] borde">
      <Heading>
        Invited users
      </Heading>

      <SearchAndFilter section="invited" />

      <div className="space-y-[1.6rem]">
        <UserList users={invitedUsers} type="invited" />
      </div>
    </div>
  );
}