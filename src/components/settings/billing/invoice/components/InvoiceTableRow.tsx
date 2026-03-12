import ImageComponent from "next/image";
import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Checkbox from "../../../../ui/CheckBox";
import Text from "../../../../ui/Text";
import { Invoice, invoiceStatusConfig } from "../hooks/useInvoiceSettings";

interface InvoiceTableRowProps {
  invoice: Invoice;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onView: (invoice: Invoice) => void;
  onDownload: (invoice: Invoice) => void;
  variant?: "desktop" | "mobile";
}

export default function InvoiceTableRow({
  invoice,
  isSelected,
  onToggleSelection,
  onView,
  onDownload,
  variant,
}: InvoiceTableRowProps) {
  const icons = useSupabaseIcons();
  const status = invoiceStatusConfig[invoice.status];

  if (variant === "desktop") {
    return (
      <tr className="group hidden md:table-row hover:bg-input-filled transition-colors">
        <td className="px-[1.4rem] py-[1.6rem]">
          <Checkbox
            checked={isSelected}
            onChange={() => onToggleSelection(invoice.id)}
            size="sm"
          />
        </td>
        <td className="px-[1.2rem] py-[1.6rem] text-[1.4rem] font-medium text-text-secondary">
          {invoice.invoiceNumber}
        </td>
        <td className="px-[1.2rem] py-[1.6rem] text-[1.4rem] text-text-secondary">
          {invoice.description}
        </td>
        <td className="px-[1.2rem] py-[1.6rem] text-[1.4rem] text-text-primary/60">
          {invoice.date}
        </td>
        <td className="px-[1.2rem] py-[1.6rem] text-[1.4rem] text-text-secondary font-medium">
          £{invoice.amount.toFixed(2)}
        </td>
        <td className="px-[1.2rem] py-[1.6rem]">
          <div
            className="inline-flex items-center gap-[0.6rem] px-[0.8rem] py-[0.2rem] rounded-[1.6rem] text-[1.2rem] font-medium"
            style={{ backgroundColor: status.bg, color: status.text }}
          >
            <span
              className="w-[0.6rem] h-[0.6rem] rounded-full"
              style={{ backgroundColor: status.text }}
            />
            {invoice.status}
          </div>
        </td>
        <td className="px-[1.4rem] py-[1.6rem]">
          <div className="flex items-center justify-end gap-[1.6rem]">
            <button
              className="hover:opacity-60 transition-opacity"
              onClick={() => onView(invoice)}
            >
              <ImageComponent
                src={icons.eyeOn}
                alt="view"
                width={20}
                height={20}
                className="brightness-0"
              />
            </button>
            <button
              className="hover:opacity-60 transition-opacity"
              onClick={() => onDownload(invoice)}
            >
              <ImageComponent
                src={icons.download}
                alt="download"
                width={20}
                height={20}
                className="brightness-0"
              />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="md:hidden p-[1.6rem] border-b border-border flex flex-col gap-[1.2rem] hover:bg-input-filled transition-colors">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[1.2rem]">
          <Checkbox
            checked={isSelected}
            onChange={() => onToggleSelection(invoice.id)}
            size="sm"
          />
          <Text className="text-[1.4rem] font-medium text-text-secondary">
            {invoice.invoiceNumber}
          </Text>
        </div>
        <div
          className="inline-flex items-center gap-[0.6rem] px-[0.8rem] py-[0.2rem] rounded-[1.6rem] text-[1.2rem] font-medium"
          style={{ backgroundColor: status.bg, color: status.text }}
        >
          <span
            className="w-[0.8rem] h-[0.8rem] rounded-full"
            style={{ backgroundColor: status.text }}
          />
          {invoice.status}
        </div>
      </div>
      <Text className="text-[1.4rem] text-text-secondary line-clamp-1">
        {invoice.description}
      </Text>
      <div className="flex justify-between items-center text-text-primary/60 text-[1.2rem]">
        <span>{invoice.date}</span>
        <span className="font-medium text-text-secondary">
          £{invoice.amount.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center gap-[1.6rem] mt-[0.4rem]">
        <button
          className="flex items-center gap-[0.6rem] text-[1.2rem] text-text-secondary hover:text-brand-primary transition-colors"
          onClick={() => onView(invoice)}
        >
          <ImageComponent
            src={icons.eyeOn}
            alt="view"
            width={16}
            height={16}
            className="brightness-0"
          />
          View
        </button>
        <button
          className="flex items-center gap-[0.6rem] text-[1.2rem] text-text-secondary hover:text-brand-primary transition-colors"
          onClick={() => onDownload(invoice)}
        >
          <ImageComponent
            src={icons.download}
            alt="download"
            width={16}
            height={16}
            className="brightness-0"
          />
          Download
        </button>
      </div>
    </div>
  );
}
