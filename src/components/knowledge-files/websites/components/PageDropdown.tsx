import { useRef, useState } from "react";
import SmartDropdown from "../../../smart-dropdown/SmartDropdown";
import DotsMenu from "../DotsMenu";
import Button from "../../../ui/Button";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";
import { WebsitePage } from "../utils/types";
import { usePageDropdown } from "../hooks/usePageDropdown";

interface PageDropdownProps {
  page: WebsitePage;
}

export default function PageDropdown({ page }: PageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons();

  const { handleOpenTab, handleViewContent, handleSync } = usePageDropdown({
    page,
    onClose: () => setIsOpen(false),
  });

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[0.3rem] hover:bg-muted/10 p-2 rounded-full transition-colors"
      >
        <DotsMenu />
      </button>

      <SmartDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        placement="bottom-end"
        className="min-w-[30rem] p-[0.8rem]"
      >
        <div className="flex flex-col gap-2">
          {/* <Button
            variant="ghost"
            className="w-full text-[1.4rem] justify-start border-0 text-text-primary h-[4.5rem] px-[1.2rem] hover:bg-muted/10"
            onClick={handleSync}
            disabled
          >
            <ImageComponent
              src={icons.arrowClockwise}
              alt="sync"
              width={22}
              height={22}
            />
            <span className="ml-[1.2rem]">Sync</span>
          </Button> */}

          <Button
            variant="ghost"
            className="w-full text-[1.6rem] justify-start border-0 text-text-primary h-[4.5rem] px-[1.2rem] hover:bg-muted/10 font-[400]"
            onClick={handleViewContent}
          >
            <ImageComponent
              src={icons.linkExternal}
              alt="view"
              width={22}
              height={22}
              className="brightness-0"
            />
            <span className="ml-[1.2rem]">View content</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full text-[1.6rem] justify-start border-0 text-text-primary h-[4.5rem] px-[1.2rem] hover:bg-muted/10 font-[400]"
            onClick={handleOpenTab}
          >
            <ImageComponent
              src={icons.linkExternal}
              alt="open"
              width={22}
              height={22}
              className="brightness-0"
            />
            <span className="ml-[1.2rem]">Open page in new tab</span>
          </Button>
        </div>
      </SmartDropdown>
    </>
  );
}
