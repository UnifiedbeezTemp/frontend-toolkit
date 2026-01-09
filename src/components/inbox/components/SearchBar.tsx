import SearchIcon from "../../../assets/icons/SearchIcon"
import { cn } from "../../../lib/utils"
import Input, { InputProps } from "../../ui/Input"

export default function InboxSearchBar({
  placeholder,
  className,
  ...rest
}: InputProps) {
  return (
    <div className={cn("relative w-full flex items-center", className)}>
      <SearchIcon className="pointer-events-none absolute z-20 left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-inactive-color" />
      <Input
        className={cn(
          "bg-white border-gray-60 pl-10 relative z-10 placeholder:text-inactive-color text-xs"
        )}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
}
