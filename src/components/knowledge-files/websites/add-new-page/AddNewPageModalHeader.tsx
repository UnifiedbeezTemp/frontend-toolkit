import React from "react";
import Heading from "../../../ui/Heading";
import Text from "../../../ui/Text";
import CloseModalButton from "../../../modal/CloseModalButton";

interface AddNewPageModalHeaderProps {
  onClose: () => void;
}

export default function AddNewPageModalHeader({
  onClose,
}: AddNewPageModalHeaderProps) {
  return (
    <div className="px-[2.4rem] pt-[1.6rem] pb-[2rem] lg:border-b border-border flex items-center justify-between relative">
      <div className="flex flex-col lg:items-start mt-[3rem] lg:mt-0 items-center justify-center max-w-[30rem] lg:max-w-full mx-auto lg:mx-0">
        <Heading className="text-center lg:text-left">Add website</Heading>
        <Text size="sm" align="center" className="text-center lg:text-left">
          Enter the URL you would like to add to your AI chatbot's knowledge.
        </Text>
      </div>
      <CloseModalButton
        onClick={onClose}
        className="absolute  lg:relative lg:top-0 lg:right-0 top-[1.6rem] right-[2.4rem]"
      />
    </div>
  );
}
