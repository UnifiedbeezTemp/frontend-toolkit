interface SelectedChannelsBadgeProps {
  count: number;
}

export default function SelectedChannelsBadge({
  count,
}: SelectedChannelsBadgeProps) {
  if (count === 0) return null;

  const text =
    count === 1 ? "1 channel selected" : `${count} channels selected`;

  return (
    <div className="w-full lg:hidden border-brand-primary bg-soft-green border text-brand-primary text-[1.4rem] py-[.5rem] mt-[.8rem] px-[1.6rem] rounded-[0.8rem]">
      {text}
    </div>
  );
}
