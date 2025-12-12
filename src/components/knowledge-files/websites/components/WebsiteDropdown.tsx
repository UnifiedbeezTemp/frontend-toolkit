import { useRef, useState } from "react";
import SmartDropdown from "../../../smart-dropdown/SmartDropdown";
import DotsMenu from "../DotsMenu";
import Button from "../../../ui/Button";

interface WebsiteDropdownProps {
  onDelete: () => void;
  isDeleting?: boolean;
}

export default function WebsiteDropdown({ onDelete, isDeleting = false }: WebsiteDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

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
            variant="danger"
            className="w-full text-[1.4rem] justify-start"
            onClick={() => {
              onDelete();
              setIsOpen(false);
            }}
            disabled={isDeleting}
            loading={isDeleting}
          >
            Delete website
          </Button>
        </div>
      </SmartDropdown>
    </>
  );
}

