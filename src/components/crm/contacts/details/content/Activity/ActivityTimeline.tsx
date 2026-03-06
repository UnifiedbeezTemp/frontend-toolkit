"use client";

import React, { useState } from "react";
import ActivityTimelineItem from "./ActivityTimelineItem";
import ActivityDetailsModal from "./ActivityDetailsModal/ActivityDetailsModal";
import { TimelineActivity } from "../types";
import Text from "../../../../../ui/Text";

interface ActivityTimelineProps {
  activities: TimelineActivity[];
  contactName: string;
  contactAvatar?: string;
  onSelectActivity: (id: string) => void;
}

export default function ActivityTimeline({
  activities: initialActivities,
  contactName,
  contactAvatar,
  onSelectActivity,
}: ActivityTimelineProps) {
  const [activities, setActivities] =
    useState<TimelineActivity[]>(initialActivities);
  const [selectedActivity, setSelectedActivity] =
    useState<TimelineActivity | null>(null);

  const handleSelectActivity = (id: string) => {
    const activity = activities.find((a) => a.id === id) || null;
    setSelectedActivity(activity);
    onSelectActivity(id);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
    setSelectedActivity(null);
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <div className="flex items-center justify-between px-[0.4rem]">
        <Text className="text-[2rem] font-bold text-text-secondary">
          Activity Timeline
        </Text>
      </div>

      <div className="flex flex-col">
        {activities.map((activity, index) => (
          <ActivityTimelineItem
            key={activity.id}
            activity={activity}
            isLast={index === activities.length - 1}
            contactName={contactName}
            contactAvatar={contactAvatar}
            onSelectActivity={handleSelectActivity}
          />
        ))}
      </div>

      <ActivityDetailsModal
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onDelete={handleDeleteActivity}
      />
    </div>
  );
}
