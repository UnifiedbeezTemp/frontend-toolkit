import TagIcon from "../../../../assets/icons/TagIcon";

interface TagsEmptyStateProps {
  message: string;
}

export default function TagsEmptyState({ message }: TagsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-[6rem] px-[2rem] text-center">
      <TagIcon size={48} className="text-muted mb-[1.6rem]" />
      <p className="text-[1.4rem] text-muted font-medium max-w-[32rem]">
        {message}
      </p>
    </div>
  );
}
