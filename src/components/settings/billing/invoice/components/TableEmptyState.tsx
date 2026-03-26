import { useSupabaseIcons } from "../../../../../lib/supabase/useSupabase";
import Heading from "../../../../ui/Heading";
import ImageComponent from "../../../../ui/ImageComponent";
import Text from "../../../../ui/Text";

interface TableEmptyStateProps {
  title: string;
  description: string;
}

export default function TableEmptyState({
  title,
  description,
}: TableEmptyStateProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex flex-col items-center justify-center p-[6rem] text-center">
      <div className="w-[6.4rem] h-[6.4rem] bg-input-filled rounded-full flex items-center justify-center mb-[2rem]">
        <ImageComponent
          src={icons.searchIg}
          alt="empty"
          width={32}
          height={32}
        />
      </div>
      <Heading className="text-[1.8rem] font-bold text-text-secondary mb-[0.8rem]">
        {title}
      </Heading>
      <Text className="text-[1.4rem] text-text-primary/60 max-w-[32rem] text-center">
        {description}
      </Text>
    </div>
  );
}
