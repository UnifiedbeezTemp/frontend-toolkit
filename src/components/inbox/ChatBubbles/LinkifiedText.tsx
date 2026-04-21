"use client";

import React, { useState } from "react";
import { cn } from "../../../lib/utils";
import RedirectNoticeModal from "../../channels/management/RedirectNoticeModal";

interface LinkifiedTextProps {
  text: string;
  maxChars?: number;
  className?: string;
  linkClassName?: string;
}

export default function LinkifiedText({
  text,
  maxChars = 200,
  className,
  linkClassName,
}: LinkifiedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  // Regex to detect URLs starting with http://, https://, or www.
  const urlRegex = /((?:https?:\/\/|www\.)[^\s]+)/g;

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    setPendingUrl(url);
    setIsModalOpen(true);
  };

  const handleProceed = () => {
    if (pendingUrl) {
      const fullUrl = pendingUrl.startsWith("www.")
        ? `https://${pendingUrl}`
        : pendingUrl;
      window.open(fullUrl, "_blank", "noopener,noreferrer");
    }
    setIsModalOpen(false);
    setPendingUrl(null);
  };

  const renderText = (content: string) => {
    // When using .split() with a capturing group in the regex,
    // the matches are included in the resulting array.
    const parts = content.split(urlRegex);
    return parts.map((part, index) => {
      // Check if this part is a URL
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part.startsWith("www.") ? `https://${part}` : part}
            onClick={(e) => handleLinkClick(e, part)}
            className={cn(
              "text-brand-primary hover:underline font-medium break-all",
              linkClassName,
            )}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const shouldTruncate = text.length > maxChars;
  const displayText =
    shouldTruncate && !isExpanded ? text.slice(0, maxChars) + "..." : text;

  return (
    <div className={cn("inline", className)}>
      {renderText(displayText)}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2 text-brand-primary hover:underline font-semibold text-sm focus:outline-none transition-colors"
        >
          {isExpanded ? "See less" : "See more"}
        </button>
      )}

      <RedirectNoticeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProceed={handleProceed}
        title="Leaving Beehive"
        description="You are about to be redirected to an external website. For your security, please ensure you trust this link before proceeding."
        infoText="External links may lead to sites not controlled by Beehive. Proceed with caution."
      />
    </div>
  );
}
