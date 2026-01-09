
export interface ExpandableCardProps {
  title: string
  children: React.ReactNode
  summary: React.ReactNode
  summaryClassName?: string
  detailsClassName?: string
  containerClassName?: string
  isExpanded: boolean
  toggleExpanded: () => void
  useDefaultDetailsStyling?: boolean
}