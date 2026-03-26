import { Invoice } from "../hooks/useInvoiceSettings";
import InvoiceTableRow from "./InvoiceTableRow";
import TableEmptyState from "./TableEmptyState";
import InvoiceDetailModal from "./InvoiceDetailModal";
import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Input from "../../../../forms/Input";
import IconActionModal from "../../../../modal/IconActionModal";
import Checkbox from "../../../../ui/CheckBox";
import PaginationV2 from "../../../../ui/PaginationV2";
import Text from "../../../../ui/Text";
import Heading from "../../../../ui/Heading";

interface InvoiceHistoryProps {
  invoices: Invoice[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasInvoices: boolean;
  hasFilteredInvoices: boolean;
  selectedInvoiceIds: string[];
  toggleInvoiceSelection: (id: string) => void;
  toggleAllSelection: (ids: string[]) => void;
  activeInvoice: Invoice | null;
  openInvoiceDetail: (invoice: Invoice) => void;
  closeInvoiceDetail: () => void;
  onDownload: (invoice: Invoice) => void;
  showDownloadNotice: boolean;
  closeDownloadNotice: () => void;
}

export default function InvoiceHistory({
  invoices,
  searchQuery,
  setSearchQuery,
  currentPage,
  totalPages,
  onPageChange,
  hasInvoices,
  hasFilteredInvoices,
  selectedInvoiceIds,
  toggleInvoiceSelection,
  toggleAllSelection,
  activeInvoice,
  openInvoiceDetail,
  closeInvoiceDetail,
  onDownload,
  showDownloadNotice,
  closeDownloadNotice,
}: InvoiceHistoryProps) {
  const icons = useSupabaseIcons();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const isAllSelected =
    invoices.length > 0 && selectedInvoiceIds.length === invoices.length;

  return (
    <div className="mt-[1.4rem] border border-border rounded-[1.6rem] bg-primary overflow-hidden">
      {/* Header & Search */}
      <div className="p-[1.4rem] border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-[1.6rem]">
        <div>
          <Heading className="text-[1.8rem] font-bold text-text-secondary">
            Invoice History
          </Heading>
          <Text className="text-[1.2rem] text-text-secondary">
            View and download all your invoices
          </Text>
        </div>
        <div className="relative w-full sm:w-[32rem]">
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            leftIcon={
              <ImageComponent
                src={icons.searchIg}
                alt="search"
                width={18}
                height={18}
              />
            }
          />
        </div>
      </div>

      {!hasInvoices ? (
        <TableEmptyState
          title="No Invoices Yet"
          description="Your billing history will appear here once your first invoice is generated."
        />
      ) : !hasFilteredInvoices ? (
        <TableEmptyState
          title="No Matching Invoices"
          description={`We couldn't find any invoices matching "${searchQuery}". Try a different search term.`}
        />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-input-filled border-b border-border">
                <tr>
                  <th className="px-[1.4rem] py-[1.2rem] w-[5rem]">
                    <Checkbox
                      checked={isAllSelected}
                      onChange={() =>
                        toggleAllSelection(invoices.map((i) => i.id))
                      }
                      size="sm"
                    />
                  </th>
                  <th className="px-[1.2rem] py-[1.2rem] text-[1.2rem] font-medium text-text-primary uppercase tracking-wider">
                    Invoice Number
                  </th>
                  <th className="px-[1.2rem] py-[1.2rem] text-[1.2rem] font-medium text-text-primary uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-[1.2rem] py-[1.2rem] text-[1.2rem] font-medium text-text-primary uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-[1.2rem] py-[1.2rem] text-[1.2rem] font-medium text-text-primary uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-[1.2rem] py-[1.2rem] text-[1.2rem] font-medium text-text-primary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-[1.4rem] py-[1.2rem] text-[1.2rem] font-medium text-text-primary uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((invoice) => (
                  <InvoiceTableRow
                    key={invoice.id}
                    invoice={invoice}
                    isSelected={selectedInvoiceIds.includes(invoice.id)}
                    onToggleSelection={toggleInvoiceSelection}
                    onView={openInvoiceDetail}
                    onDownload={onDownload}
                    variant="desktop"
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden">
            {invoices.map((invoice) => (
              <InvoiceTableRow
                key={invoice.id}
                invoice={invoice}
                isSelected={selectedInvoiceIds.includes(invoice.id)}
                onToggleSelection={toggleInvoiceSelection}
                onView={openInvoiceDetail}
                onDownload={onDownload}
                variant="mobile"
              />
            ))}
          </div>
        </>
      )}

      {hasFilteredInvoices && (
        <div className="p-[1.4rem] border-t border-border">
          <PaginationV2
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}

      <InvoiceDetailModal
        isOpen={!!activeInvoice}
        onClose={closeInvoiceDetail}
        invoice={activeInvoice}
      />

      <IconActionModal
        isOpen={showDownloadNotice}
        onClose={closeDownloadNotice}
        title="Download Not Available"
        description="This feature is not yetavalable to you!"
        icon={{
          src: icons.infoGreen,
          alt: "info",
        }}
        primaryAction={{
          label: "Got it",
          onClick: closeDownloadNotice,
        }}
      />
    </div>
  );
}
