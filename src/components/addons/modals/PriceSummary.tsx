import { formatPrice } from "@/shared/src/lib/utils";

interface PriceSummaryProps {
  subtotal: number;
  vat: number;
  total: number;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  subtotal,
  vat,
  total,
}) => {
  return (
    <div className="py-[2.4rem] sm:border-t border-border">
      <div className="flex items-center justify-between mb-[2.4rem]">
        <span className="text-[1.6rem] text-text-secondary font-[700]">
          VAT (20%)
        </span>
        <span className="text-[2rem] text-text-primary font-[700]">
          {formatPrice(vat)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[1.6rem] text-text-secondary font-[700]">
          Total
        </span>
        <span className="text-[2rem] text-text-primary font-[700]">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
};
