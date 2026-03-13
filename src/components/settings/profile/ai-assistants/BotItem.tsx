import { useSupabaseIcons } from "../../../../lib/supabase/useSupabase";
import { AIAssistant } from "../../../../types/aiAssistantTypes";
import ImageComponent from "../../../ui/ImageComponent";

interface Props {
  assistant: AIAssistant;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  isEditing: boolean;
}

export default function BotItem({
  assistant,
  onDelete,
  onEdit,
  isEditing,
}: Props) {

  const icons = useSupabaseIcons();
  return (
    <div
      key={assistant.id}
      className="px-[1.4rem] bg-primary py-[1rem] border border-border flex items-center justify-between rounded-[0.8rem]"
    >
      <div className="flex gap-[.5rem] items-center">
        <div className="border border-border rounded-[0.34rem] p-[0.34rem] flex-shrink-0">
          <ImageComponent
            src={"/images/logo.svg"}
            alt="logo"
            width={25}
            height={25}
          />
        </div>
        <p className="text-[1.6rem] text-text-primary">{assistant.name}</p>
      </div>
      {isEditing && (
        <div className="flex flex-row-reverse sm:flex-row items-center gap-[1rem] sm:gap-[.6rem]">
          <button
            onClick={() => onDelete(assistant.id)}
            className="sm:rounded-[0.8rem] p-[.6rem] rounded-[0.4rem] sm:py-[0.4rem] sm:px-[1.6rem] text-[1.4rem] text-destructive border border-destructive"
          >
            <span className="hidden sm:block">Delete</span> <ImageComponent
            src={icons.trashRed}
            alt="trash"
            width={20}
            height={20}
            className="sm:hidden"
          />
          </button>
          <button
            onClick={() => onEdit(assistant.id)}
            className="sm:rounded-[0.8rem] p-[.6rem] rounded-[0.4rem] sm:py-[0.4rem] sm:px-[1.6rem] text-[1.4rem] text-text-primary border border-border"
          >
            <span className="hidden sm:block">Edit</span> <ImageComponent
            src={icons.edit}
            alt="edit"
            width={20}
            height={20}
            className="sm:hidden"
          />
          </button>
        </div>
      )}
    </div>
  );
}
