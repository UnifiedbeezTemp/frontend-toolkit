import ListPlaceholderIcon from "../../../../assets/icons/ListPlaceholderIcon";

interface ListsEmptyStateProps {
  message: string;
}

export default function ListsEmptyState({ message }: ListsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[6rem] gap-[1.6rem]">
      <ListPlaceholderIcon size={64} color="var(--muted)" />
      <p className="text-[1.4rem] text-muted font-medium">{message}</p>
    </div>
  );
}
