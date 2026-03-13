"use client";

import React from "react";
import ListModalHeader from "./sub-components/ListModalHeader";
import ListModalTable from "./sub-components/ListModalTable";
import { List } from "../../hooks/useContactLists";
import { useContactListModal } from "./hooks/useContactListModal";
import Modal from "../../../../../../../modal/Modal";
import Pagination from "../../../../../../../ui/Pagination";

interface ContactListModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: List | null;
}

export default function ContactListModal({
  isOpen,
  onClose,
  list,
}: ContactListModalProps) {
  const {
    filteredData,
    statusFilter,
    currentPage,
    totalPages,
    handleStatusChange,
    handlePageChange,
  } = useContactListModal(list);

  if (!list) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xxl"
      bottomSheet
      className="overflow-hidden rounded-[1.6rem] p-[2.4rem]"
    >
      <div className="flex flex-col h-full bg-primary overflow-hidden">
        <ListModalHeader
          list={list}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
        />
        <div className="flex-1 overflow-y-auto custom-scrollbar border border-input-stroke rounded-[1.6rem]">
          <ListModalTable data={filteredData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Modal>
  );
}
