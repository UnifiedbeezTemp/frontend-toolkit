import Heading from "../ui/Heading";

interface Props {
  title: string;
  isEditing?: boolean;
  handleEditClick?: () => void;
  hideEdit?: boolean;
}

export default function SettingsSectionHeader({
  title,
  isEditing,
  handleEditClick,
  hideEdit = false,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <Heading className="text-[1.8rem] lg:text-[2.4rem]">{title}</Heading>
      {!isEditing && !hideEdit && handleEditClick && (
        <button
          onClick={handleEditClick}
          className="text-brand-primary text-[1.4rem] font-[700]"
        >
          Edit
        </button>
      )}
    </div>
  );
}
