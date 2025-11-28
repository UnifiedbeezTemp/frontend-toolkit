"use client";

import Image from "next/image";

import RoleDropdown from "./RoleDropdown";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { useAppDispatch } from "../../store/hooks/useRedux";
import { TeamMember, updateMemberRole, updateInvitedUserRole, removeMember, cancelInvitation, toggleMemberSelection } from "../../store/onboarding/slices/membersSlice";
import Button from "../ui/Button";

interface UserItemProps {
  user: TeamMember;
  type: "invited" | "members";
}

export default function UserItem({ user, type }: UserItemProps) {
  const dispatch = useAppDispatch();
  const supabaseIcons = useSupabaseIcons();

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return "text-warning border-warning bg-warning/10";
      case "denied":
        return "text-destructive border-destructive bg-destructive/10";
      default:
        return "text-text-primary border-input-stroke bg-border/50";
    }
  };

  const handleRoleChange = (role: string) => {
    if (type === "members") {
      dispatch(updateMemberRole({ id: user.id, role }));
    } else {
      dispatch(updateInvitedUserRole({ id: user.id, role }));
    }
  };

  const handleRemove = () => {
    if (type === "members") {
      dispatch(removeMember(user.id));
    } else {
      dispatch(cancelInvitation(user.id));
    }
  };

  const handleToggle = () => {
    dispatch(toggleMemberSelection(user.id));
  };

  return (
    <div className="border border-input-stroke p-[0.8rem] rounded-[0.8rem]">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col gap-[3.2rem]">
        {/* Top Row: Avatar, Email, Checkbox */}
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
          
          <button
            onClick={handleToggle}
            className={`w-[1.6rem] h-[1.6rem] rounded-[0.3rem] border flex items-center justify-center transition-colors ${
              user.isSelected
                ? "bg-brand-primary border-brand-primary"
                : "border-input-stroke bg-primary"
            }`}
          >
            {user.isSelected && (
              <Image
                alt="checkbox"
                src={supabaseIcons.checkbox}
                width={16}
                height={16}
                className="object-cover"
              />
            )}
          </button>
        </div>

        {/* Middle Row: Role Badge */}
        <div className="flex justify-start">
          <p className="text-[1.2rem] text-text-primary border border-input-stroke rounded-lg px-[0.8rem] py-[0.4rem] mt-[-2rem] bg-border/50">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </p>
        </div>

        {/* Bottom Row: Status and Actions */}
        <div className="flex items-center justify-between">
          {/* Status on the left */}
          {user.status !== "active" && (
            <p
              className={`text-[1.2rem] border rounded-[0.4rem] py-[0.4rem] font-[400] px-[0.8rem] ${getStatusStyles(
                user.status
              )}`}
            >
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </p>
          )}

          {/* Actions on the right */}
          <div className="flex items-center gap-[0.5rem]">
            <RoleDropdown
              currentRole={user.role}
              onRoleChange={handleRoleChange}
              disabled={user.status === "denied"}
            />

            {type === "members" ? (
              <Button
                size="sm"
                variant="ghost"
                className="text-destructive text-[1.2rem]"
                onClick={handleRemove}
              >
                Remove
              </Button>
            ) : user.status === "pending" ? (
              <Button
                variant="ghost"
                className="text-destructive text-[1.2rem]"
                onClick={handleRemove}
              >
                Cancel
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="text-destructive text-[1.2rem]"
                onClick={handleRemove}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center gap-[1rem]">
          <button
            onClick={handleToggle}
            className={`w-[1.6rem] h-[1.6rem] rounded-[0.3rem] border flex items-center justify-center transition-colors ${
              user.isSelected
                ? "bg-brand-primary border-brand-primary"
                : "border-input-stroke bg-primary"
            }`}
          >
            {user.isSelected && (
              <Image
                alt="checkbox"
                src={supabaseIcons.checkbox}
                width={16}
                height={16}
                className="object-cover"
              />
            )}
          </button>

          <div className="flex items-center gap-[0.7rem]">
            <Image
              alt="avatar"
              src={user.avatar}
              width={40}
              height={40}
              className="object-cover"
            />
            <p className="text-[1.5rem] text-text-primary">{user.email}</p>

            {user.status !== "active" && (
              <p
                className={`text-[1.5rem] border rounded-[0.4rem] py-[0.4rem] font-[400] px-[0.8rem] text-[1.2rem] ${getStatusStyles(
                  user.status
                )}`}
              >
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </p>
            )}

            <p className="text-[1.5rem] text-text-primary border border-input-stroke rounded-lg p-[0.5rem] bg-border/50">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[0.5rem]">
          <RoleDropdown
            currentRole={user.role}
            onRoleChange={handleRoleChange}
            disabled={user.status === "denied"}
          />

          {type === "members" ? (
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive"
              onClick={handleRemove}
            >
              Remove
            </Button>
          ) : user.status === "pending" ? (
            <Button
              variant="ghost"
              className="text-destructive"
              onClick={handleRemove}
            >
              Cancel invitation
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="text-destructive"
              onClick={handleRemove}
            >
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}