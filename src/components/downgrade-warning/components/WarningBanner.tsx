import Text from "../../ui/Text";

interface WarningBannerProps {
  message: string;
}

export default function WarningBanner({ message }: WarningBannerProps) {
  return (
    <div className="flex items-start gap-[0.8rem] bg-secondary-10 border border-secondary-20 rounded-[0.6rem] p-[1rem] my-[0.8rem]">
      <span className="text-[1.4rem] shrink-0">⚠️</span>
      <Text size="xs" weight="bold" className="text-secondary-100">
        {message}
      </Text>
    </div>
  );
}
