import { useRef, useState } from "react";
import SmartDropdown from "../../../smart-dropdown/SmartDropdown";
import DotsMenu from "../DotsMenu";
import Button from "../../../ui/Button";
import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import ImageComponent from "../../../ui/ImageComponent";

interface WebsiteDropdownProps {
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function WebsiteDropdown({
  onDelete,
  isDeleting = false,
}: WebsiteDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const icons = useSupabaseIcons();

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-[0.3rem]"
        disabled={isDeleting}
      >
        <DotsMenu />
      </button>

      <SmartDropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        placement="bottom-end"
        className="min-w-[15rem]"
      >
        <div className="p-[0.8rem]">
          <Button
            variant="dangerReverse"
            className="w-full text-[1.4rem] justify-start border-0"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            disabled={isDeleting}
            loading={isDeleting}
          >
            <ImageComponent
              src={icons.trashRed}
              alt={"trash"}
              width={20}
              height={20}
            />
            Delete
          </Button>
        </div>
      </SmartDropdown>
    </>
  );
}
