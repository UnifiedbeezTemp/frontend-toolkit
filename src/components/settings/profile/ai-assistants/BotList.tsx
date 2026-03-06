import { AIAssistant } from "../../../../types/aiAssistantTypes";
import BotItem from "./BotItem";

interface BotListProps {
  assistants: AIAssistant[];
  isEditing: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function BotList({
  assistants,
  isEditing,
  onDelete,
  onEdit,
}: BotListProps) {
  return (
    <div className="py-[1.6rem] space-y-[1.6rem]">
      {assistants.map((assistant) => (
        <BotItem
          assistant={assistant}
          onDelete={onDelete}
          onEdit={onEdit}
          key={assistant.id}
          isEditing={isEditing}
        />
      ))}
    </div>
  );
}
