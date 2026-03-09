"use client";

import React from "react";
import Text from "../../../../../../ui/Text";
import ImageComponent from "../../../../../../ui/ImageComponent";
import TagIcon from "../../../../../../../assets/icons/TagIcon";
import { cn } from "../../../../../../../lib/utils";
import { TimelineActivity } from "../../types";

export interface ActivityDetailsModalGridProps {
  activity: TimelineActivity;
  icons: Record<string, string>;
  onDelete: (id: string) => void;
}

export default function ActivityDetailsModalGrid({
  activity,
  icons,
  onDelete,
}: ActivityDetailsModalGridProps) {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(
    null,
  );

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  const renderSection = (
    id: string,
    title: string,
    content: React.ReactNode,
    className?: string,
  ) => {
    const isExpanded = expandedSection === id;

    return (
      <div
        className={cn(
          "bg-input-filled border border-input-stroke rounded-[.8rem] flex flex-col transition-all duration-300",
          className,
        )}
      >
        <button
          onClick={() => toggleSection(id)}
          className="sm:hidden flex items-center justify-between p-[1.6rem] w-full text-left hover:bg-black/5"
        >
          <Text className="text-[1.4rem] font-bold text-dark-base-100">
            {title}
          </Text>
          <ImageComponent
            src={icons.chevronRightGreen}
            alt="Expand"
            width={20}
            height={20}
            className={cn(
              "transition-transform duration-300 brightness-0",
              isExpanded && "rotate-90",
            )}
          />
        </button>
        <div
          className={cn(
            "sm:flex flex-col gap-[1.6rem] p-[1.6rem] sm:block",
            !isExpanded && "hidden sm:flex",
          )}
        >
          <Text className="hidden sm:block text-[1.4rem] font-bold text-dark-base-100 mb-[1.6rem]">
            {title}
          </Text>
          {content}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.6rem]">
      {renderSection(
        "details",
        "Details",
        <div className="flex flex-col gap-[1.2rem]">
          <div className="flex items-start gap-[1.2rem]">
            <ImageComponent
              src={icons.mingcuteTimeLine}
              alt="Date"
              width={22}
              height={22}
              className="mt-[0.2rem] brightness-0 opacity-40"
            />
            <div className="flex flex-col">
              <Text className="text-[1.1rem] sm:text-[1.2rem] text-dark-base-40 uppercase tracking-wider font-bold">
                Date and Time
              </Text>
              <Text className="text-[1.3rem] font-bold text-dark-base-100">
                {activity.date} {activity.time}
              </Text>
            </div>
          </div>
          <div className="flex items-start gap-[1.2rem]">
            <ImageComponent
              src={icons.userGreen}
              alt="Creator"
              width={22}
              height={22}
              className="mt-[0.2rem] brightness-0 opacity-40"
            />
            <div className="flex flex-col">
              <Text className="text-[1.1rem] sm:text-[1.2rem] text-dark-base-40 uppercase tracking-wider font-bold">
                Created by
              </Text>
              <Text className="text-[1.3rem] font-bold text-dark-base-100">
                {activity.createdBy}
              </Text>
            </div>
          </div>
          {activity.contactPhone && (
            <div className="flex items-start gap-[1.2rem]">
              <ImageComponent
                src={icons.outlinePhone}
                alt="Phone"
                width={22}
                height={22}
                className="mt-[0.2rem] brightness-0 opacity-40"
              />
              <div className="flex flex-col">
                <Text className="text-[1.1rem] sm:text-[1.2rem] text-dark-base-40 uppercase tracking-wider font-bold">
                  Phone number
                </Text>
                <Text className="text-[1.3rem] font-bold text-dark-base-100">
                  {activity.contactPhone}
                </Text>
              </div>
            </div>
          )}
        </div>,
      )}

      {renderSection(
        "tags",
        "Tags",
        <div className="flex flex-col gap-[0.8rem]">
          {activity.tags?.map((tag, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-[0.8rem] px-[1rem] py-[0.8rem] rounded-[0.8rem] border text-[1.2rem] sm:text-[1.4rem] font-bold w-fit min-w-[12rem] sm:min-w-[14rem]",
                idx === 0
                  ? "bg-transparent text-dark-base-100/60 border-input-stroke"
                  : idx === 1
                    ? "bg-danger-5 text-orange-100 border-orange-100/30"
                    : "bg-primary-blue-50/5 text-primary-blue border-primary-blue/30",
              )}
            >
              <TagIcon size={14} />
              {tag}
            </div>
          ))}
        </div>,
      )}

      {renderSection(
        "actions",
        "Actions",
        <div className="flex flex-col gap-[0.2rem] sm:gap-[0.4rem]">
          {[
            {
              icon: icons.tablerEdit,
              label: "Edit activity",
              className: "opacity-40 group-hover:opacity-100 brightness-0",
            },
            {
              icon: icons.tablerCopy,
              label: "Duplicate activity",
              className: "opacity-40 brightness-0",
            },
            {
              icon: icons.send,
              label: "Share activity",
              className: "opacity-40 brightness-0",
            },
            {
              icon: icons.trashRed,
              label: "Delete activity",
              color: "text-red-500",
              hoverBg: "hover:bg-red-50",
            },
          ].map((action, i) => (
            <button
              key={i}
              onClick={
                action.label === "Delete activity"
                  ? () => onDelete(activity.id)
                  : undefined
              }
              className={cn(
                "flex items-center gap-[1rem] p-[0.6rem] sm:p-[0.8rem] rounded-[0.8rem] hover:bg-primary transition-all group",
                action.hoverBg,
              )}
            >
              <ImageComponent
                src={action.icon}
                alt={action.label}
                width={16}
                height={16}
                className={action.className}
              />
              <Text
                className={cn(
                  "text-[1.2rem] sm:text-[1.3rem] font-medium text-dark-base-100/60 group-hover:text-dark-base-100",
                  action.color,
                )}
              >
                {action.label}
              </Text>
            </button>
          ))}
        </div>,
      )}
    </div>
  );
}
