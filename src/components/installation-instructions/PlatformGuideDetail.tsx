"use client";

import ImageComponent from "../ui/ImageComponent";
import Text from "../ui/Text";
import { useSupabaseIcons } from "../../lib/supabase/useSupabase";
import { cn } from "../../lib/utils";
import { PlatformGuideDetailProps } from "./types";

export default function PlatformGuideDetail({
  platform,
  content,
}: PlatformGuideDetailProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="bg-primary rounded-[1rem] border border-input-stroke overflow-hidden shadow-lg p-[1rem]">
      <div className="flex items-center gap-[1.2rem] mb-[2rem] border-b border-input-stroke pb-[1rem]">
        <div className="rounded-[0.6rem]">
          <ImageComponent
            src={
              icons[platform.icon as keyof typeof icons] || icons.defaultIcon
            }
            alt={platform.name}
            width={32}
            height={32}
          />
        </div>
        <Text className="text-[1.8rem] font-bold text-text-primary">
          {platform.name}
        </Text>
      </div>

      <p className="text-[1.3rem] leading-[2rem] mb-[2.4rem] text-text-primary">
        {content.description}
      </p>

      <div className="space-y-[2.4rem]">
        <div>
          <HeadingAndSub text="🔧 What This Does:" />
          <HeadingAndSub
            text="This integration lets you:"
            className="mt-[1.2rem]"
          />

          <ul className="space-y-[1.2rem] mt-[1.2rem]">
            {content.features.map((feature, idx) => (
              <li key={idx} className="flex gap-[0.8rem]">
                <div className="mt-[0.6rem] shrink-0 text-text-primary text-[1.5rem] select-none bg-text-primary rounded-full w-[0.4rem] h-[0.4rem]"></div>
                <Text className="text-[1.3rem] text-text-primary">
                  {feature}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <HeadingAndSub text="🚀 How to Install:" />
          <ol className="space-y-[1.2rem] mt-[1.2rem]">
            {content.steps.map((step, idx) => (
              <li key={idx} className="flex gap-[1.2rem]">
                <span className="text-text-primary font-bold text-[1.3rem]">
                  {idx + 1}.
                </span>
                <Text className="text-[1.3rem] text-text-primary leading-[2rem]">
                  {step}
                </Text>
              </li>
            ))}
          </ol>
        </div>

        <div className="pt-[1.6rem] border-t border-input-stroke">
          <div className="flex items-center gap-[0.8rem] mb-[1.2rem]">
            <Text className="text-[1.4rem] font-bold text-text-primary">
              ✅ Requirements:
            </Text>
          </div>
          <ul className="space-y-[1.2rem]">
            {content.requirements.map((req, idx) => (
              <li key={idx} className="flex gap-[0.8rem]">
                <div className="mt-[0.6rem] shrink-0 text-text-primary text-[1.5rem] select-none bg-text-primary rounded-full w-[0.4rem] h-[0.4rem]"></div>
                <Text className="text-[1.3rem] text-text-primary">{req}</Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function HeadingAndSub({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-[0.5rem]", className)}>
      <Text className="text-[1.4rem] font-bold text-text-primary">{text}</Text>
    </div>
  );
}
