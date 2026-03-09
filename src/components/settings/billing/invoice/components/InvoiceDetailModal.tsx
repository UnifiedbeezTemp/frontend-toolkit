"use client";

import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Modal from "../../../../modal/Modal";
import Button from "../../../../ui/Button";
import Text from "../../../../ui/Text";
import { Invoice, invoiceStatusConfig } from "../hooks/useInvoiceSettings";
import Heading from "../../../../ui/Heading";

interface InvoiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export default function InvoiceDetailModal({
  isOpen,
  onClose,
  invoice,
}: InvoiceDetailModalProps) {
  const icons = useSupabaseIcons();

  if (!invoice) return null;

  const status = invoiceStatusConfig[invoice.status];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title="Invoice Details">
      <div className="p-[2.4rem] md:p-[3.2rem]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-[2.4rem] border-b border-border pb-[3.2rem]">
          <div className="flex flex-col gap-[0.8rem]">
            <div className="w-[4.8rem] h-[4.8rem] bg-input-filled rounded-[1.2rem] flex items-center justify-center mb-[0.8rem]">
              <ImageComponent
                src={icons.infoGreen}
                alt="invoice"
                width={24}
                height={24}
              />
            </div>
            <Heading className="text-[2.4rem] font-bold text-text-secondary">
              {invoice.invoiceNumber}
            </Heading>
            <Text className="text-[1.4rem] text-text-primary/60">
              Issued on {invoice.date}
            </Text>
          </div>
          <div
            className="inline-flex items-center gap-[0.6rem] px-[1.2rem] py-[0.4rem] rounded-[1.6rem] text-[1.4rem] font-medium"
            style={{ backgroundColor: status.bg, color: status.text }}
          >
            <span
              className="w-[0.8rem] h-[0.8rem] rounded-full"
              style={{ backgroundColor: status.text }}
            />
            {invoice.status}
          </div>
        </div>

        {/* Billing Info */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-[3.2rem] py-[3.2rem] border-b border-border">
          <div>
            <Text className="text-[1.2rem] font-bold text-text-primary uppercase tracking-wider mb-[1.2rem]">
              Billed To
            </Text>
            <Heading className="text-[1.6rem] font-bold text-text-secondary mb-[0.4rem]">
              Unifiedbeez Team
            </Heading>
            <Text className="text-[1.4rem] text-text-primary/60 leading-relaxed">
              123 Business Street,
              <br />
              London, UK,
              <br />
              E1 6AN
            </Text>
          </div>
          <div>
            <Text className="text-[1.2rem] font-bold text-text-primary uppercase tracking-wider mb-[1.2rem]">
              From
            </Text>
            <Heading className="text-[1.6rem] font-bold text-text-secondary mb-[0.4rem]">
              Unifiedbeez Ltd
            </Heading>
            <Text className="text-[1.4rem] text-text-primary/60 leading-relaxed">
              456 Corporate Ave,
              <br />
              New York, NY,
              <br />
              10001, USA
            </Text>
          </div>
        </div> */}

        {/* Description Table */}
        <div className="py-[3.2rem]">
          <Text className="text-[1.2rem] font-bold text-text-primary uppercase tracking-wider mb-[1.6rem]">
            Invoice Summary
          </Text>
          <div className="bg-input-filled rounded-[1.2rem] overflow-hidden">
            <table className="w-full text-left">
              <thead className="border-b border-border text-[1.2rem] font-medium text-text-primary/60">
                <tr>
                  <th className="px-[2.4rem] py-[1.2rem]">Description</th>
                  <th className="px-[2.4rem] py-[1.2rem] text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-[1.4rem] text-text-secondary">
                <tr className="border-b border-border/50">
                  <td className="px-[2.4rem] py-[1.6rem]">
                    {invoice.description}
                  </td>
                  <td className="px-[2.4rem] py-[1.6rem] text-right font-medium">
                    £{invoice.amount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals Section */}
        {/* <div className="flex justify-end pt-[2.4rem]">
          <div className="w-full md:w-[32rem] flex flex-col gap-[1.2rem]">
            <div className="flex justify-between items-center text-[1.4rem] text-text-primary/60">
              <span>Subtotal</span>
              <span className="text-text-secondary">
                £{(invoice.amount * 0.8).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-[1.4rem] text-text-primary/60">
              <span>Tax (20%)</span>
              <span className="text-text-secondary">
                £{(invoice.amount * 0.2).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-[1.2rem] border-t border-border">
              <Heading className="text-[1.8rem] font-bold text-text-secondary">
                Total Amount
              </Heading>
              <Heading className="text-[2.4rem] font-bold text-text-secondary">
                £{invoice.amount.toFixed(2)}
              </Heading>
            </div>
          </div>
        </div> */}

        {/* Actions */}
        <div className="flex flex-col md:flex-row items-center gap-[1.2rem] mt-[4.8rem]">
          <Button
            variant="secondary"
            className="w-full md:w-auto"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
