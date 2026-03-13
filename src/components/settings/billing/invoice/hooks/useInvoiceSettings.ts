export interface Invoice {
  id: string;
  invoiceNumber: string;
  description: string;
  date: string;
  amount: number;
  status: "Paid" | "Declined" | "Approved" | "Pending";
}

export interface PaymentMethodData {
  type: string;
  last4: string;
  expiry: string;
}

export const invoiceStatusConfig: Record<
  Invoice["status"],
  { text: string; bg: string }
> = {
  Paid: {
    text: "var(--crm-status-active-text)",
    bg: "var(--crm-status-active-bg)",
  },
  Approved: {
    text: "var(--crm-status-active-text)",
    bg: "var(--crm-status-active-bg)",
  },
  Declined: {
    text: "var(--destructive)",
    bg: "var(--red-10)",
  },
  Pending: {
    text: "var(--crm-status-unconfirmed-text)",
    bg: "var(--crm-status-unconfirmed-bg)",
  },
};

import { useState, useMemo } from "react";

export const useInvoiceSettings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<string[]>([]);
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);
  const [showDownloadNotice, setShowDownloadNotice] = useState(false);
  const itemsPerPage = 10;

  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      description: "Unifiedbeez Business Plan - February 2025",
      date: "24/02/2024 11:47",
      amount: 219.2,
      status: "Paid",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      description: "Unifiedbeez Business Plan - January 2025",
      date: "24/01/2024 11:47",
      amount: 219.2,
      status: "Paid",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      description: "Unifiedbeez Business Plan - December 2024",
      date: "24/12/2024 11:47",
      amount: 219.2,
      status: "Declined",
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-004",
      description: "Unifiedbeez Business Plan - November 2024",
      date: "24/11/2024 11:47",
      amount: 219.2,
      status: "Declined",
    },
    {
      id: "5",
      invoiceNumber: "INV-2024-005",
      description: "Unifiedbeez Business Plan - October 2024",
      date: "24/10/2024 11:47",
      amount: 219.2,
      status: "Declined",
    },
    {
      id: "6",
      invoiceNumber: "INV-2024-006",
      description: "Unifiedbeez Business Plan - September 2024",
      date: "24/09/2024 11:47",
      amount: 219.2,
      status: "Approved",
    },
    {
      id: "7",
      invoiceNumber: "INV-2024-007",
      description: "Unifiedbeez Business Plan - August 2024",
      date: "24/08/2024 11:47",
      amount: 210.2,
      status: "Approved",
    },
    {
      id: "8",
      invoiceNumber: "INV-2024-008",
      description: "Unifiedbeez Business Plan - July 2024",
      date: "24/07/2024 11:47",
      amount: 219.2,
      status: "Approved",
    },
    {
      id: "9",
      invoiceNumber: "INV-2024-009",
      description: "Unifiedbeez Business Plan - June 2024",
      date: "24/06/2024 11:47",
      amount: 219.2,
      status: "Pending",
    },
    {
      id: "10",
      invoiceNumber: "INV-2024-010",
      description: "Unifiedbeez Business Plan - May 2024",
      date: "24/05/2024 11:47",
      amount: 219.2,
      status: "Paid",
    },
    {
      id: "11",
      invoiceNumber: "INV-2024-011",
      description: "Unifiedbeez Business Plan - April 2024",
      date: "24/04/2024 11:47",
      amount: 219.2,
      status: "Paid",
    },
    {
      id: "12",
      invoiceNumber: "INV-2024-012",
      description: "Unifiedbeez Business Plan - March 2024",
      date: "24/03/2024 11:47",
      amount: 219.2,
      status: "Paid",
    },
    {
      id: "13",
      invoiceNumber: "INV-2024-013",
      description: "Unifiedbeez Business Plan - February 2024",
      date: "24/02/2024 11:47",
      amount: 219.2,
      status: "Paid",
    },
  ];

  const filteredInvoices = useMemo(() => {
    return invoices.filter(
      (inv) =>
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, invoices]);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const currentInvoices = useMemo(() => {
    return filteredInvoices.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [filteredInvoices, currentPage, itemsPerPage]);

  const paymentMethod: PaymentMethodData = {
    type: "Mastercard",
    last4: "4343",
    expiry: "02/2026",
  };

  const toggleInvoiceSelection = (id: string) => {
    setSelectedInvoiceIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleAllSelection = (ids: string[]) => {
    setSelectedInvoiceIds((prev) => (prev.length === ids.length ? [] : ids));
  };

  const handleDownload = (invoice: Invoice) => {
    setShowDownloadNotice(true);
    console.log(`Attempted download for invoice ${invoice.invoiceNumber}`);
  };

  const closeDownloadNotice = () => {
    setShowDownloadNotice(false);
  };

  const openInvoiceDetail = (invoice: Invoice) => {
    setActiveInvoice(invoice);
  };

  const closeInvoiceDetail = () => {
    setActiveInvoice(null);
  };

  const invoiceStats = {
    totalInvoices: invoices.filter((i) => i.status === "Paid").length,
    generatedCount: invoices.length,
    nextInvoiceDate: "Mar 1, 2025",
    estimatedAmount: 219.2,
  };

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    currentInvoices,
    paymentMethod,
    invoiceStats,
    hasInvoices: invoices.length > 0,
    hasFilteredInvoices: filteredInvoices.length > 0,
    selectedInvoiceIds,
    toggleInvoiceSelection,
    toggleAllSelection,
    activeInvoice,
    openInvoiceDetail,
    closeInvoiceDetail,
    handleDownload,
    showDownloadNotice,
    closeDownloadNotice,
  };
};
