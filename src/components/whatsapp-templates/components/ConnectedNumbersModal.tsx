"use client";

import React from "react";
import Modal from "../../modal/Modal";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import CloseIcon from "../../../assets/icons/CloseIcon";
import Button from "../../ui/Button";
import Checkbox from "../../ui/CheckBox";

interface ConnectedNumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountName: string;
}

const DUMMY_NUMBERS = [
  { id: "1", number: "+44 7700 900077", status: "Active", label: "Primary" },
  { id: "2", number: "+44 7700 900088", status: "Active", label: "Support" },
  { id: "3", number: "+44 7700 900099", status: "Active", label: "Marketing" },
];

export default function ConnectedNumbersModal({
  isOpen,
  onClose,
  accountName,
}: ConnectedNumbersModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="p-[2.4rem] rounded-[1.6rem] w-[50rem] sm:max-w-[95vw]"
    >
      <div className="flex items-center justify-between mb-[2.4rem]">
        <div className="flex flex-col gap-[0.4rem]">
          <Heading className="text-[1.8rem] font-bold">
            Connected Numbers
          </Heading>
          <Text className="text-[1.4rem] text-text-secondary">
            Active numbers for {accountName}
          </Text>
        </div>
        <button
          onClick={onClose}
          className="p-[0.8rem] hover:bg-gray-100 rounded-lg transition-colors"
        >
          <CloseIcon className="w-[2rem] h-[2rem] text-text-secondary" />
        </button>
      </div>

      <div className="flex flex-col gap-[1.2rem] mb-[2.4rem]">
        {DUMMY_NUMBERS.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-[1.6rem] border border-border rounded-[1.2rem] hover:bg-input-filled transition-colors"
          >
            <div className="flex flex-col gap-[0.2rem]">
              <span className="text-[1.4rem] font-medium text-text-primary">
                {item.number}
              </span>
              <span className="text-[1.2rem] text-text-secondary">
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-[0.8rem]">
              <span
                className={`text-[1.2rem] px-[0.8rem] py-[0.2rem] rounded-full ${
                  item.status === "Active"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={onClose}
        className="w-full justify-center py-[1.2rem]"
      >
        Close
      </Button>
    </Modal>
  );
}
