interface QuickActionsProps {
  actions: string[];
  onAction: (action: string) => void;
}

export default function QuickActions({ actions, onAction }: QuickActionsProps) {
  return (
    <div className="flex items-center gap-[0.8rem] px-[1.6rem] py-[1.2rem] flex-wrap bg-soft-green">
      {actions.map((action) => (
        <button
          key={action}
          onClick={() => onAction(action)}
          className="px-[1.4rem] py-[0.6rem] border border-border rounded-full text-[1.2rem] text-text-primary font-bold hover:bg-accent hover:border-brand-primary transition-all whitespace-nowrap shadow-sm bg-white"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
