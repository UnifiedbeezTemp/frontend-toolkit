import ToggleSwitch from "../../ui/ToggleSwitch";

interface NotificationItemProps {
  notification: {
    name: string;
    description: string;
    key: string;
  };
  isActive: boolean;
  isEditing: boolean;
  onToggle: (key: string) => void;
  showBorder: boolean;
}

export default function NotificationItem({
  notification,
  isActive,
  isEditing,
  onToggle,
  showBorder,
}: NotificationItemProps) {
  return (
    <div
      className={`flex items-center justify-between py-[2.6rem] ${
        showBorder ? "border-b border-border" : ""
      }`}
    >
      <div className="flex-1">
        <p className="font-[700] text-text-secondary text-[1.6rem]">
          {notification.name}
        </p>
        <p className="text-[1.6rem] text-text-primary font-[400] mt-[1rem]">
          {notification.description}
        </p>
      </div>
      <ToggleSwitch
        isActive={isActive}
        disabled={!isEditing}
        onToggle={() => onToggle(notification.key)}
      />
    </div>
  );
}
