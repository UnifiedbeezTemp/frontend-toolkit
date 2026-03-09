interface BusinessDescriptionDisplayProps {
  description: string;
}

export default function BusinessDescriptionDisplay({
  description,
}: BusinessDescriptionDisplayProps) {
  if (!description.trim()) {
    return (
      <div className="border-border border p-[1.6rem] rounded-[1.6rem] focus-within:shadow-[0_0_0_5px_rgba(5,61,39,0.1)] transition-shadow text-left">
        <div className="flex items-center justify-between">
          <span className="text-[1.6rem] font-[700] text-brand-primary">
            Business overview
          </span>
        </div>
        <p className="text-left min-h-[8rem] mt-[1.4rem] text-[1.6rem] text-text-primary"> No business description added</p>
      </div>
    );
  }

  return (
    <div className="border-border border p-[1.6rem] rounded-[1.6rem] focus-within:shadow-[0_0_0_5px_rgba(5,61,39,0.1)] transition-shadow text-left">
      <div className="text-[1.6rem] text-text-primary whitespace-pre-wrap leading-relaxed">
        {description}
      </div>
    </div>
  );
}
