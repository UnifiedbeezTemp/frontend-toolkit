"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../lib/supabase/useSupabase";
import { ChannelConnection } from "../../../types/channelConnectionTypes";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";

interface ChannelConnectionsListProps {
  connections: ChannelConnection[];
  onEdit: (connection: ChannelConnection) => void;
  onDelete: (connectionId: string) => void;
}

export default function ChannelConnectionsList({
  connections,
  onEdit,
  onDelete,
}: ChannelConnectionsListProps) {
  const icons = useSupabaseIcons();

  if (connections.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-border p-[1.6rem] space-y-3">
      <Heading size="sm" className="mb-3">
        Connected Configurations ({connections.length})
      </Heading>
      
      {connections.map((connection) => (
        <div
          key={connection.id}
          className="border border-border rounded-[0.8rem] p-[1.2rem] flex items-center justify-between"
        >
          <div className="flex-1">
            <Text size="sm" className="font-[600] mb-1">
              {connection.configuration?.displayName || connection.name}
            </Text>
            <Text size="sm" className="text-text-secondary">
              {connection.configuration?.phoneNumber || connection.configuration?.internalName || ""} • {connection.isActive ? "Active" : "Inactive"}
            </Text>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(connection)}
              className="text-[1.2rem]"
            >
              Edit
            </Button>
            <button
              onClick={() => onDelete(connection.id)}
              className="p-2 hover:bg-destructive/10 rounded"
            >
              <ImageComponent
                src={icons.trashRed || ""}
                alt="Delete"
                width={16}
                height={16}
                className="text-destructive"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

