"use client";

import { useState, useCallback, useMemo } from "react";
import { List } from "../../../hooks/useContactLists";
import { ContactStatus } from "../../../../../../types";

export interface LogEntry {
  id: string;
  dateCreated: string;
  source: string;
  status: ContactStatus;
  ipAddress: string;
}

const MOCK_DATA: LogEntry[] = [
  {
    id: "1",
    dateCreated: "04/04/2024 12:32",
    source: "Via API",
    status: "active",
    ipAddress: "127.0.0.1",
  },
  {
    id: "2",
    dateCreated: "04/04/2024 12:32",
    source: "Via API",
    status: "unconfirmed",
    ipAddress: "10.13.144.1377",
  },
  {
    id: "3",
    dateCreated: "04/04/2024 12:32",
    source: "Via API",
    status: "unsubscribed",
    ipAddress: "127.0.0.1",
  },
  {
    id: "4",
    dateCreated: "04/04/2024 12:32",
    source: "Via API",
    status: "bounced",
    ipAddress: "127.0.0.1",
  },
  {
    id: "5",
    dateCreated: "04/04/2024 12:32",
    source: "Unsubscribed from list",
    status: "active",
    ipAddress: "10.13.144.1377",
  },
  {
    id: "6",
    dateCreated: "04/04/2024 12:32",
    source: "+234 9029220646",
    status: "unconfirmed",
    ipAddress: "10.13.144.1377",
  },
  {
    id: "7",
    dateCreated: "04/04/2024 12:32",
    source: "+234 9029220646",
    status: "unsubscribed",
    ipAddress: "127.0.0.1",
  },
  {
    id: "8",
    dateCreated: "04/04/2024 12:32",
    source: "+234 9029220646",
    status: "bounced",
    ipAddress: "127.0.0.1",
  },
];

export function useContactListModal(list: List | null) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return MOCK_DATA;
    return MOCK_DATA.filter((item) => item.status === statusFilter);
  }, [statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const handleStatusChange = useCallback((status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    filteredData: paginatedData,
    statusFilter,
    currentPage,
    totalPages,
    handleStatusChange,
    handlePageChange,
  };
}
