import Heading from "../../../../ui/Heading";
import Text from "../../../../ui/Text";

interface InvoiceStatsProps {
  stats: {
    totalInvoices: number;
    generatedCount: number;
    nextInvoiceDate: string;
    estimatedAmount: number;
  };
}

export default function InvoiceStats({ stats }: InvoiceStatsProps) {
  return (
    <div className="">
      <Heading>Your Invoice</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2.4rem] mt-[1rem]">
        <div className="grad-btn p-[2.4rem] rounded-[1.6rem] relative overflow-hidden flex flex-col justify-between min-h-[14rem]">
          <div>
            <Text className="text-primary/80 text-[1.4rem] font-medium mb-[0.8rem]">
              Total Invoices
            </Text>
            <Heading className="text-primary text-[3.2rem] font-bold">
              {stats.totalInvoices}
            </Heading>
          </div>
          <Text className="text-primary/80 text-[1.2rem]">
            {stats.generatedCount} generated
          </Text>
        </div>

        {/* Next Invoice Card */}
        <div className="layout-body border border-border p-[2.4rem] rounded-[1.6rem] flex flex-col justify-between min-h-[14rem]">
          <div>
            <Text className="text-text-primary/80 text-[1.4rem] font-medium mb-[0.8rem]">
              Next Invoice
            </Text>
            <Heading className="text-text-secondary text-[2.4rem] font-bold">
              {stats.nextInvoiceDate}
            </Heading>
          </div>
          <Text className="text-text-primary/80 text-[1.2rem]">
            £{stats.estimatedAmount.toFixed(2)} estimated
          </Text>
        </div>
      </div>
    </div>
  );
}
