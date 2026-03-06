import React, { useRef, useState } from "react";
import Modal from "@/shared/src/components/modal/Modal";
import AddNewPageModalHeader from "./AddNewPageModalHeader";
import UrlInputSection from "./UrlInputSection";
import OptionSelector from "./OptionSelector";
import DropdownOptions from "./DropdownOptions";
import { PageOption } from "../utils/types";
import AddNewPageModalActions from "./AddNewPageModalActions";

interface AddNewPageModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  url: string;
  onUrlChange: (url: string) => void;
  selectedOption: PageOption;
  onOptionChange: (option: PageOption) => void;
  onAdd: () => void;
  urlError: string;
}

export default function AddNewPageModal({
  isOpen,
  setIsOpen,
  url,
  onUrlChange,
  selectedOption,
  onOptionChange,
  onAdd,
  urlError,
}: AddNewPageModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        className="rounded-[2.4rem]"
        size="xl"
      >
        <AddNewPageModalHeader onClose={handleClose} />

        <div className="pt-[2rem] px-[2.4rem] pb-[2.4rem]">
          <UrlInputSection
            url={url}
            onUrlChange={onUrlChange}
            urlError={urlError}
          />

          <OptionSelector
            selectedOption={selectedOption}
            onDropdownToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            triggerRef={triggerRef}
          />

          <AddNewPageModalActions onClose={handleClose} onAdd={onAdd} />
        </div>
      </Modal>

      <DropdownOptions
        isOpen={isDropdownOpen}
        onClose={() => setIsDropdownOpen(false)}
        triggerRef={triggerRef}
        selectedOption={selectedOption}
        onOptionChange={onOptionChange}
      />
    </>
  );
}
