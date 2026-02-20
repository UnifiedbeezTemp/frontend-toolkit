import Text from "../../ui/Text";

interface SavingsDisplayProps {
  savings: number;
}

export default function SavingsDisplay({ savings }: SavingsDisplayProps) {
  return (
    <div className="flex items-center justify-between sm:py-[1.2rem] border border-input-stroke p-[1rem] sm:px-[1.7rem] rounded-[0.8rem]">
      <Text size="sm" className="text-text-primary">
        Monthly savings if you remove selected items:
      </Text>
      <Text size="lg" weight="bold" className="text-text-secondary">
        £{savings.toFixed(2)}
      </Text>
    </div>
  );
}
