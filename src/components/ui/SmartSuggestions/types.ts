export interface SmartSuggestionsProps {
  title?: string;
  description?: string;
  isActive: boolean;
  onToggle: (value: boolean) => void;
  icon?: React.ReactNode;
  className?: string;
}
