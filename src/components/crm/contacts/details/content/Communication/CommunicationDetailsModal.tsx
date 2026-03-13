"use client";

import React from "react";
import Text from "../../../../../ui/Text";
import ImageComponent from "../../../../../ui/ImageComponent";
import Button from "../../../../../ui/Button";
import Modal from "../../../../../modal/Modal";
import CloseModalButton from "../../../../../modal/CloseModalButton";
import TagIcon from "../../../../../../assets/icons/TagIcon";
import { CommunicationActivity } from "../types";
import { cn } from "../../../../../../lib/utils";
import {
  useSupabaseIcons,
  useSupabaseImages,
} from "../../../../../../lib/supabase/useSupabase";

interface CommunicationDetailsModalProps {
  activity: CommunicationActivity | null;
  onClose: () => void;
}

export default function CommunicationDetailsModal({
  activity,
  onClose,
}: CommunicationDetailsModalProps) {
  const icons = useSupabaseIcons() as Record<string, string>;
  const images = useSupabaseImages() as Record<string, string>;

  if (!activity) return null;

  const isMissed = activity.type === "call" && activity.direction === "missed";

  return (
    <Modal
      isOpen={!!activity}
      onClose={onClose}
      bottomSheet
      className="max-w-[60rem] !rounded-[1.2rem] px-[2.4rem]"
    >
      <div className="flex flex-col h-[80dvh] sm:h-auto sm:max-h-[80vh] overflow-hidden rounded-t-[2.4rem] sm:rounded-[1.2rem] bg-primary">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-input-stroke pb-[1.6rem] w-full shrink-0 pt-[2.4rem] bg-primary">
          <div className="flex items-center gap-[1.2rem]">
            <div
              className={cn(
                "w-[4rem] h-[4rem] rounded-full flex items-center justify-center border",
                isMissed ? "border-destructive/20" : "border-border",
              )}
            >
              <ImageComponent
                src={
                  activity.type === "video"
                    ? icons.tablerVideo2
                    : activity.type === "message"
                      ? icons.messageGray
                      : activity.direction === "outbound"
                        ? icons.phoneOut
                        : activity.direction === "inbound"
                          ? icons.phoneIn
                          : icons.phoneX
                }
                alt={activity.type}
                width={22}
                height={22}
              />
            </div>
            <div className="flex flex-col">
              <Text className="text-[1.8rem] sm:text-[2rem] font-bold text-dark-base-100">
                {activity.title}
              </Text>
              <Text className="text-[1.3rem] text-dark-base-40 font-medium">
                {activity.date} · {activity.time}
              </Text>
            </div>
          </div>
          <CloseModalButton
            onClick={onClose}
            className="hover:bg-black/5 transition-colors"
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-[2.4rem] flex flex-col gap-[2.4rem] no-scrollbar">
          {/* Description */}
          <div className="flex flex-col gap-[0.8rem]">
            <Text className="text-[1.3rem] font-bold text-dark-base-40 uppercase tracking-wider">
              Description
            </Text>
            <Text className="text-[1.5rem] text-dark-base-70 leading-relaxed">
              {activity.description}
            </Text>
          </div>

          {/* Duration */}
          {activity.duration && (
            <div className="flex items-center gap-[1.2rem]">
              <ImageComponent
                src={icons.mingcuteTimeLine}
                alt="Duration"
                width={20}
                height={20}
                className="brightness-0 opacity-40"
              />
              <div className="flex flex-col">
                <Text className="text-[1.1rem] text-dark-base-40 uppercase tracking-wider font-bold">
                  Duration
                </Text>
                <Text className="text-[1.4rem] font-bold text-dark-base-100">
                  {activity.duration}
                </Text>
              </div>
            </div>
          )}

          {/* Participants */}
          {activity.participants && activity.participants.length > 0 && (
            <div className="flex flex-col gap-[1.2rem]">
              <Text className="text-[1.3rem] font-bold text-dark-base-40 uppercase tracking-wider">
                Participants
              </Text>
              <div className="flex flex-col gap-[1rem]">
                {activity.participants.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-[1rem] p-[1rem] rounded-[1rem] bg-input-filled"
                  >
                    <div className="w-[3.2rem] h-[3.2rem] rounded-full bg-gray-200 overflow-hidden border border-input-stroke">
                      <ImageComponent
                        src={(p.avatar && images[p.avatar]) || icons.userGreen}
                        alt={p.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <Text className="text-[1.4rem] font-bold text-dark-base-100">
                      {p.name}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <div className="flex flex-col gap-[1.2rem]">
              <Text className="text-[1.3rem] font-bold text-dark-base-40 uppercase tracking-wider">
                Tags
              </Text>
              <div className="flex flex-wrap gap-[0.8rem]">
                {activity.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-[0.6rem] px-[1rem] py-[0.6rem] rounded-[0.8rem] border border-input-stroke text-[1.3rem] font-bold text-dark-base-100/60"
                  >
                    <TagIcon size={14} />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-[1.6rem] border-t border-input-stroke flex justify-center sticky bottom-0 bg-primary pb-[2.4rem]">
          <Button
            variant="secondary"
            className="min-w-[18rem]"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
