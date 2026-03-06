"use client";

import React from "react";
import Text from "../../../../../../ui/Text";
import { cn } from "../../../../../../../lib/utils";
import ImageComponent from "../../../../../../ui/ImageComponent";
import Button from "../../../../../../ui/Button";
import {
  useSupabaseIcons,
  useSupabaseImages,
} from "../../../../../../../lib/supabase/useSupabase";
import Modal from "../../../../../../modal/Modal";
import CloseModalButton from "../../../../../../modal/CloseModalButton";
import { TimelineActivity } from "../../types";
import { CATEGORY_STYLES } from "../../constants";
import ActivityDetailsModalContent from "./ActivityDetailsModalContent";
import ActivityDetailsModalParticipants from "./ActivityDetailsModalParticipants";
import ActivityDetailsModalGrid from "./ActivityDetailsModalGrid";

interface ActivityDetailsModalProps {
  activity: TimelineActivity | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function ActivityDetailsModal({
  activity,
  onClose,
  onDelete,
}: ActivityDetailsModalProps) {
  const icons = useSupabaseIcons() as Record<string, string>;
  const images = useSupabaseImages();

  if (!activity) return null;
  const styles = CATEGORY_STYLES[activity.category];

  return (
    <Modal
      isOpen={!!activity}
      onClose={onClose}
      bottomSheet
      className="max-w-[80rem] !rounded-[1.2rem] h-[95dvh] px-[2.4rem]"
    >
      <div className="flex flex-col h-[90dvh] sm:h-auto sm:max-h-[85vh] overflow-hidden rounded-t-[2.4rem] sm:rounded-[1.2rem] bg-primary">
        <div className="flex items-center justify-between border-b border-input-stroke pb-[1.6rem] w-full shrink-0 pt-[2.4rem] bg-primary">
          <div className="flex items-center gap-[1.2rem] sm:gap-[1.6rem]">
            <div
              className={cn(
                "rounded-full flex items-center justify-center shadow-sm shrink-0",
                styles.bgColor,
                "w-[3.6rem] h-[3.6rem] sm:w-[4.4rem] sm:h-[4.4rem]",
              )}
            >
              <ImageComponent
                src={icons[styles.icon] || icons.userGreen}
                alt={activity.category}
                width={20}
                height={20}
                className="sm:w-[2.2rem] sm:h-[2.2rem]"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <Text className="text-[1.8rem] sm:text-[2.2rem] font-bold text-dark-base-100 truncate max-w-[15rem] sm:max-w-none">
              {activity.title}
            </Text>
            <span
              className={cn(
                "text-[1.2rem] sm:text-[1.4rem] px-[0.8rem] sm:px-[1rem] py-[0.2rem] sm:py-[0.4rem] rounded-[0.8rem] border font-medium whitespace-nowrap",
                styles.badgeColor,
              )}
            >
              {activity.status}
            </span>
          </div>
          <CloseModalButton
            onClick={onClose}
            className="hover:bg-black/5 transition-colors"
          />
        </div>

        <div className="flex-1 overflow-y-auto sm:px-[2.4rem] py-[2.4rem] flex flex-col gap-[2.4rem] sm:gap-[3.2rem] no-scrollbar">
          <ActivityDetailsModalContent activity={activity} />
          <ActivityDetailsModalParticipants
            participants={activity.participants || []}
            images={images as Record<string, string>}
          />
          <ActivityDetailsModalGrid
            activity={activity}
            icons={icons}
            onDelete={onDelete}
          />
        </div>

        <div className="px-[2.4rem] pt-[1.6rem] border-gray-100 flex justify-center sticky bottom-0 bg-primary">
          <Button
            variant="secondary"
            className="min-w-[18rem]"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
