import Heading from "../../ui/Heading";
import ToggleSwitch from "../../ui/ToggleSwitch";

interface MasterToggleProps {
  isEditing: boolean;
  masterToggleState: boolean | string;
  onToggleAll: (enable: boolean) => void;
}

export default function MasterToggle({ 
  isEditing, 
  masterToggleState, 
  onToggleAll 
}: MasterToggleProps) {
  const handleMasterToggle = () => {
    if (!isEditing) return;
    
    const newState = masterToggleState === true ? false : true;
    onToggleAll(newState);
  };

  const getToggleState = (): boolean => {
    return masterToggleState === "mixed" ? false : !!masterToggleState;
  };

  return (
    <div className="flex items-center justify-between py-[1.6rem] border-b border-border">
      <div className="flex-1">
        <Heading size="sm" className="text-text-secondary">
          All Notifications
        </Heading>
        <p className="text-[1.6rem] text-text-primary font-[400] mt-[1rem]">
          Enable or disable all notification types at once
        </p>
      </div>
      <ToggleSwitch
        isActive={getToggleState()}
        disabled={!isEditing}
        onToggle={handleMasterToggle}
      />
    </div>
  );
}