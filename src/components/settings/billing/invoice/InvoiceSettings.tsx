"use client";

import { useInvoiceSettings } from "./hooks/useInvoiceSettings";
import InvoiceStats from "./components/InvoiceStats";
import InvoiceHistory from "./components/InvoiceHistory";
import PaymentMethod from "./components/PaymentMethod";

export default function InvoiceSettings() {
  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    currentInvoices,
    paymentMethod,
    invoiceStats,
    hasInvoices,
    hasFilteredInvoices,
    selectedInvoiceIds,
    toggleInvoiceSelection,
    toggleAllSelection,
    activeInvoice,
    openInvoiceDetail,
    closeInvoiceDetail,
    handleDownload,
    showDownloadNotice,
    closeDownloadNotice,
  } = useInvoiceSettings();

  return (
    <div className="w-full mt-[2rem] p-[1rem] lg:p-0">
      <InvoiceStats stats={invoiceStats} />
      <InvoiceHistory
        invoices={currentInvoices}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        hasInvoices={hasInvoices}
        hasFilteredInvoices={hasFilteredInvoices}
        selectedInvoiceIds={selectedInvoiceIds}
        toggleInvoiceSelection={toggleInvoiceSelection}
        toggleAllSelection={toggleAllSelection}
        activeInvoice={activeInvoice}
        openInvoiceDetail={openInvoiceDetail}
        closeInvoiceDetail={closeInvoiceDetail}
        onDownload={handleDownload}
        showDownloadNotice={showDownloadNotice}
        closeDownloadNotice={closeDownloadNotice}
      />
      {/* <PaymentMethod paymentMethod={paymentMethod} /> */}
    </div>
  );
}
