"use client";

import { cn } from "../../../lib/utils";
import { AIAssistant } from "../../../types/aiAssistantTypes";
import GlobeIcon from "../../../assets/icons/GlobeIcon";
import FileIcon from "../../../assets/icons/FileIcon";
import MiBook from "../../../assets/icons/MiBook";
import { getAssistantMeta } from "../utils/assistantMeta";

type Size = "sm" | "xs";

export default function AssistantMetaIndicators({
  assistant,
  size = "sm",
  className,
}: {
  assistant: AIAssistant;
  size?: Size;
  className?: string;
}) {
  const { websitesCount, knowledgeFilesCount, instructionEditedByUser } =
    getAssistantMeta(assistant);

  const showWebsites = websitesCount > 0;
  const showFiles = knowledgeFilesCount > 0;
  const showBook = instructionEditedByUser;

  if (!showWebsites && !showFiles && !showBook) return null;

  const boxClass =
    size === "xs"
      ? "h-[2.4rem] w-[2.4rem] rounded-full"
      : "h-[2.8rem] w-[2.8rem] rounded-full";

  const iconSize = size === "xs" ? 16 : 18;

  return (
    <div className={cn("flex items-center gap-[0.8rem]", className)}>
      {showWebsites && (
        <div
          className={cn(
            "flex items-center justify-center border",
            boxClass,
            "bg-success/10 border-success/20",
          )}
          title={`${websitesCount} website${websitesCount === 1 ? "" : "s"} connected`}
        >
          <GlobeIcon size={iconSize} isActive className="scale-[0.9] text-success" />
        </div>
      )}

      {showFiles && (
        <div
          className={cn(
            "flex items-center justify-center border",
            boxClass,
            "bg-amber-500/10 border-amber-500/20",
          )}
          title={`${knowledgeFilesCount} file${knowledgeFilesCount === 1 ? "" : "s"} uploaded`}
        >
          <FileIcon size={iconSize} className="text-amber-700" />
        </div>
      )}

      {showBook && (
        <div
          className={cn(
            "flex items-center justify-center border",
            boxClass,
            "bg-violet-500/10 border-violet-500/20",
          )}
          title="Instructions edited"
        >
          <MiBook size={iconSize} color="currentColor" className="text-violet-700" />
        </div>
      )}
    </div>
  );
}
