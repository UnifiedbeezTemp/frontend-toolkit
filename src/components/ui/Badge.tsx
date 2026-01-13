interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "urgent" | "info"
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "text-brand-primary",
    urgent: "text-destructive",
    info: "text-primary-blue",
  }

  return (
    <span
      className={`tagpill border border-current items-center px-2 py-1 rounded-md text-md font-normal ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
