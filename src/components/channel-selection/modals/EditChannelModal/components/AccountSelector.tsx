import { useRef } from "react";
import { useAccountSelector } from "../hooks/useAccountSelector";
import SmartDropdown from "../../../../smart-dropdown/SmartDropdown";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../../ui/ImageComponent";
import Text from "../../../../ui/Text";
import Heading from "../../../../ui/Heading";
import { cn } from "../../../../../lib/utils";
import { Channel } from "../../../../../store/onboarding/types/channelTypes";
import { ConnectionDisplayData } from "../../../../channels/connections/types";

interface AccountSelectorProps {
  channel: Channel;
  connections: ConnectionDisplayData[];
}

export default function AccountSelector({
  channel,
  connections,
}: AccountSelectorProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons();
  const {
    isDropdownOpen,
    selectedConnection,
    selectedConnectionId,
    toggleDropdown,
    closeDropdown,
    selectConnection,
  } = useAccountSelector(connections);

  return (
    <div className="relative">
      <Heading>Manage Accounts</Heading>
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        className="flex items-center justify-between gap-[1rem] w-full px-[1.4rem] py-[1rem] border border-input-stroke rounded-[0.8rem] bg-primary hover:bg-input-filled transition-colors mt-[0.8rem]"
      >
        <div className="flex items-center gap-[.5rem]">
          <ImageComponent
            src={channel.icon}
            alt="Account icon"
            width={30}
            height={30}
          />
          <div className="flex flex-col items-start px-3">
            <Text className="text-[1.6rem] font-medium leading-none">
              {selectedConnection?.title || "Select account"}
            </Text>
          </div>
        </div>

        <ImageComponent
          src={icons.chevronDown}
          alt="Chevron"
          width={20}
          height={20}
        />
      </button>

      <SmartDropdown
        isOpen={isDropdownOpen}
        onClose={closeDropdown}
        triggerRef={triggerRef}
      >
        <div className="p-[0.5rem] space-y-[0.2rem]">
          {connections.map((connection) => (
            <button
              key={connection.id}
              onClick={selectConnection.bind(null, connection.id)}
              className={cn(
                "flex flex-col items-start w-full p-[1rem] rounded-[0.6rem] hover:bg-input-filled transition-colors text-left",
                connection.id === selectedConnectionId && "bg-input-filled",
              )}
            >
              <Text className="text-[1.4rem] font-medium">
                {connection.title}
              </Text>
              {connection.subtitle && (
                <Text className="text-[1.2rem] text-text-secondary">
                  {connection.subtitle}
                </Text>
              )}
            </button>
          ))}
          {connections.length === 0 && (
            <div className="p-[1rem] text-center text-text-secondary italic">
              No accounts connected
            </div>
          )}
        </div>
      </SmartDropdown>
    </div>
  );
}
