"use client";

import React from "react";
import Modal from "../../modal/Modal";
import Heading from "../../ui/Heading";
import Text from "../../ui/Text";
import CloseIcon from "../../../assets/icons/CloseIcon";
import Button from "../../ui/Button";
import Checkbox from "../../ui/CheckBox";

export interface ConnectedNumber {
  id: string;
  displayName: string;
  type: string;
}

interface ConnectedNumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountName: string;
  numbers?: ConnectedNumber[];
}

export default function ConnectedNumbersModal({
  isOpen,
  onClose,
  accountName,
  numbers = [],
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
        {numbers.length === 0 ? (
          <div className="py-[4rem] text-center">
            <Text className="text-[1.4rem] text-text-secondary">
              No connected numbers found.
            </Text>
          </div>
        ) : (
          numbers.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-[1.6rem] border border-border rounded-[1.2rem] hover:bg-input-filled transition-colors"
            >
              <div className="flex flex-col gap-[0.2rem]">
                <span className="text-[1.4rem] font-medium text-text-primary">
                  {item.displayName}
                </span>
                <span className="text-[1.2rem] text-text-secondary">
                  {item.type}
                </span>
              </div>
            </div>
          ))
        )}
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
