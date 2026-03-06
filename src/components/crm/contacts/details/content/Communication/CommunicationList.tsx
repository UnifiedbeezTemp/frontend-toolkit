"use client";

import React from "react";
import Text from "../../../../../ui/Text";
import { CommunicationActivity } from "../types";
import CommunicationItem from "./CommunicationItem";
import CommunicationDetailsModal from "./CommunicationDetailsModal";
import { useCommunicationList } from "../hooks/useCommunicationList";

interface CommunicationListProps {
  communications: CommunicationActivity[];
}

export default function CommunicationList({
  communications,
}: CommunicationListProps) {
  const { selectedActivity, handleActivityClick, handleCloseModal } =
    useCommunicationList(communications);

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <Text className="text-[2rem] font-bold text-text-secondary">
        Communication History
      </Text>
      <div className="flex flex-col gap-[1.6rem]">
        {communications.length > 0 ? (
          communications.map((comm) => (
            <CommunicationItem
              key={comm.id}
              activity={comm}
              onClick={handleActivityClick}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-[6rem] bg-primary border border-dashed border-border rounded-[1.2rem]">
            <Text className="text-[1.6rem] text-dark-base-40 font-medium">
              No communication history yet
            </Text>
          </div>
        )}
      </div>

      <CommunicationDetailsModal
        activity={selectedActivity}
        onClose={handleCloseModal}
      />
    </div>
  );
}
