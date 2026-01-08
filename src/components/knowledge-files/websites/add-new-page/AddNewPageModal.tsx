import React, { useRef, useState } from "react";
import AddNewPageModalHeader from "./AddNewPageModalHeader";
import UrlInputSection from "./UrlInputSection";
import OptionSelector from "./OptionSelector";
import DropdownOptions from "./DropdownOptions";
import { PageOption } from "../utils/types";
import AddNewPageModalActions from "./AddNewPageModalActions";
import Modal from "../../../modal/Modal";

interface AddNewPageModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  url: string;
  onUrlChange: (url: string) => void;
  selectedOption: PageOption;
  onOptionChange: (option: PageOption) => void;
  onAdd: () => void;
  urlError: string;
  isLoading?: boolean;
  bottomSheet?: boolean;
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
  isLoading = false,
  bottomSheet = false,
}: AddNewPageModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        className="rounded-t-[2.4rem] sm:rounded-[2.4rem] max-w-[37.4rem] w-full sm:max-w-[48.6rem] lg:max-w-[69.5rem]"
        bottomSheet={bottomSheet}
      >
        <AddNewPageModalHeader onClose={handleClose} />

        <div className="pt-[2.7rem] lg:pt-[2rem] sm:pt-[4rem] px-[1.4rem] sm:px-[3rem] pb-[2rem] sm:pb-[4rem] lg:pb-[2.4rem]">
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

          <AddNewPageModalActions
            onClose={handleClose}
            onAdd={onAdd}
            isLoading={isLoading}
          />
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
