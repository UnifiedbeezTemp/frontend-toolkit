

export default function PlanSummaryContainer({
  className,
  children,
}: {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}) {
  return (
    <div
      className={`w-full rounded-lg border border-input-stroke bg-gradient-yellow-1 p-4 ${className}`}
    >
      {children}
    </div>
  )
}