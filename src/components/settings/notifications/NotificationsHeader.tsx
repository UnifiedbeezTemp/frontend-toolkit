import Button from "@/shared/src/components/ui/Button";
import ImageComponent from "@/shared/src/components/ui/ImageComponent";
import Heading from "@/shared/src/components/ui/Heading";
import { useSupabaseIcons } from "@/shared/src/lib/supabase/useSupabase";

interface NotificationHeaderProps {
  isEditing: boolean;
  onEditClick: () => void;
}

export default function NotificationHeader({ 
  isEditing, 
  onEditClick 
}: NotificationHeaderProps) {
  const icons = useSupabaseIcons();

  return (
    <div className="flex items-center justify-between">
      <Heading size="lg">Notifications</Heading>
      {!isEditing && (
        <Button
          variant="secondary"
          onClick={onEditClick}
          className="px-[1.6rem] text-[1.5rem] flex gap-[.5rem] py-[0.8rem] rounded-[0.8rem]"
        >
          <ImageComponent src={icons.edit} alt="Edit" width={20} height={20} />
          Edit
        </Button>
      )}
    </div>
  );
}