"use client";

import SmartDropdown from "../../../smart-dropdown/SmartDropdown";
import ImageComponent from "../../../ui/ImageComponent";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { cn } from "../../../../lib/utils";
import DocumentDuplicateIcon from "../../../../assets/icons/DocumentDuplicateIcon";
import { usePageUrlDropdown } from "./hooks/usePageUrlDropdown";

interface PageUrlDropdownProps {
  url: string;
  className?: string;
}

export default function PageUrlDropdown({ url, className }: PageUrlDropdownProps) {
  const icons = useSupabaseIcons();
  const {
    isOpen,
    copied,
    triggerRef,
    normalizedUrl,
    hostname,
    open,
    openFromHover,
    scheduleClose,
    toggleOpen,
    close,
    visit,
    handleCopy,
    handleTriggerBlur,
    handleDropdownMouseEnter,
  } = usePageUrlDropdown({ url });

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={openFromHover}
        onMouseLeave={scheduleClose}
        onFocus={open}
        onBlur={handleTriggerBlur}
        onClick={toggleOpen}
        className={cn(
          "group inline-flex w-full min-w-0 items-center gap-[0.6rem] rounded-[0.6rem] px-[0.4rem] py-[0.2rem] text-left",
          "hover:bg-muted/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30",
          className,
        )}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        title={url}
      >
        <span className="min-w-0 flex-1 truncate">
          <span className="truncate text-text-primary group-hover:text-brand-primary transition-colors">
            {url}
          </span>
        </span>
      </button>

      <SmartDropdown
        isOpen={isOpen}
        onClose={close}
        triggerRef={triggerRef}
        placement="top-start"
        offset={10}
        maxHeight="none"
        className="min-w-[25rem] sm:min-w-[40rem]"
        closeOnOutsideClick
        closeOnClick={false}
      >
        <div
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={scheduleClose}
          className="p-[1.2rem]"
        >
          <div className="flex items-start justify-between gap-[1rem]">
            <div className="">
              <div className="flex items-center gap-[0.6rem]">
                <div className="h-[2.2rem] w-[2.2rem] rounded-[0.6rem] border border-brand-primary/15 flex items-center justify-center">
                  <ImageComponent
                    src={icons.net}
                    alt=""
                    width={16}
                    height={16}
                    className="brightness-0 opacity-80"
                  />
                </div>
                <p className="text-[1.4rem] font-[700] text-text-primary truncate">
                  Page link
                </p>
              </div>
              <p className="text-[1.2rem] text-text-primary/70 mt-[0.2rem] truncate">
                {hostname ? hostname : "Full URL preview and actions"}
              </p>
            </div>

            <button
              type="button"
              onClick={close}
              className="shrink-0 rounded-[0.6rem] p-[0.6rem] hover:bg-muted/10 transition-colors"
              aria-label="Close"
            >
              <span className="text-[1.6rem] leading-none text-text-primary/70">
                ×
              </span>
            </button>
          </div>

          <div className="mt-[1rem] rounded-[0.8rem] border border-border bg-input-filled p-[1rem]">
            <p className="text-[1.1rem] text-text-primary/60 mb-[0.6rem]">
              Full URL
            </p>
            <p className="text-[1.25rem] text-text-primary break-all leading-snug whitespace-nowrap truncate">
              {url}
            </p>
          </div>

          <div className="mt-[1.2rem] grid grid-cols-2 gap-[0.8rem]">
            <button
              type="button"
              onClick={visit}
              disabled={!normalizedUrl}
              className={cn(
                "h-[4.2rem] rounded-[0.9rem] px-[1rem] border border-brand-primary bg-brand-primary text-white",
                "flex items-center justify-center gap-[0.8rem] text-[1.3rem] font-[700] transition-all",
                "not-disabled:hover:shadow-md not-disabled:active:scale-[0.98]",
                !normalizedUrl && "opacity-50 cursor-not-allowed",
              )}
            >
              <ImageComponent
                src={icons.linkExternal}
                alt=""
                width={18}
                height={18}
                className="invert grayscale"
              />
              Visit
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "h-[4.2rem] rounded-[0.9rem] px-[1rem] border border-border bg-primary text-text-primary",
                "flex items-center justify-center gap-[0.8rem] text-[1.3rem] font-[700] transition-all",
                "hover:shadow-md active:scale-[0.98]",
              )}
            >
              {/* <ImageComponent
                src={copied ? icons.check : icons.dupl}
                alt=""
                width={18}
                height={18}
              /> */}
              {copied ? "Copied!" : <DocumentDuplicateIcon />}
            </button>
          </div>
        </div>
      </SmartDropdown>
    </>
  );
}
