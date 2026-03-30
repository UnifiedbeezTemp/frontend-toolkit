"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  copyTextToClipboard,
  getHostnameFromUrl,
  normalizeUrl,
} from "../../utils/pageUrlUtils";

interface UsePageUrlDropdownParams {
  url: string;
}

export function usePageUrlDropdown({ url }: UsePageUrlDropdownParams) {
  const [isOpen, setIsOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [copied, setCopied] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const normalizedUrl = useMemo(() => normalizeUrl(url), [url]);
  const hostname = useMemo(
    () => getHostnameFromUrl(normalizedUrl),
    [normalizedUrl],
  );

  useEffect(() => {
    setCanHover(window.matchMedia?.("(hover: hover)").matches ?? false);
  }, []);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    if (!canHover) return;
    cancelClose();
    closeTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 140);
  };

  const openFromHover = () => {
    if (!canHover) return;
    cancelClose();
    setIsOpen(true);
  };

  const open = () => {
    cancelClose();
    setIsOpen(true);
  };

  const toggleOpen = () => {
    cancelClose();
    setIsOpen((prev) => !prev);
  };

  const close = () => setIsOpen(false);

  const visit = () => {
    if (!normalizedUrl) return;
    window.open(normalizedUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleCopy = async () => {
    if (!url) return;
    const ok = await copyTextToClipboard(url);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  };

  const handleTriggerBlur = () => {
    if (canHover) scheduleClose();
  };

  const handleDropdownMouseEnter = () => {
    if (!canHover) return;
    cancelClose();
  };

  return {
    isOpen,
    canHover,
    copied,
    triggerRef,
    normalizedUrl,
    hostname,
    open,
    openFromHover,
    scheduleClose,
    cancelClose,
    toggleOpen,
    close,
    visit,
    handleCopy,
    handleTriggerBlur,
    handleDropdownMouseEnter,
  };
}
