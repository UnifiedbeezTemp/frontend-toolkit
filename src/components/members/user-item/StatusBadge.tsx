import { StatusBadgeProps } from "./types";

export default function StatusBadge({
  status,
  getStatusStyles,
}: StatusBadgeProps) {
  return (
    <p
      className={`text-[1.2rem] border-[1.5px] rounded-[0.4rem] py-[0.4rem] font-[700] px-[0.8rem] text-[1.2rem] ${getStatusStyles(
        status
      )}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </p>
  );
}
